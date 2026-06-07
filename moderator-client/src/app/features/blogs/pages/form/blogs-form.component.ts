import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogService } from '../../services/blogs.service';
import { CategoryService } from '../../../categories/services/categories.service';
import { SubCategoryService } from '../../../sub-categories/services/sub-categories.service';
import { Category } from '../../../categories/domain/categories';
import { SubCategory } from '../../../sub-categories/domain/sub-categories';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

@Component({
  selector: 'app-blogs-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, 
    MatButtonModule, MatIconModule, MatSelectModule, MatCardModule, 
    MatSnackBarModule, RouterModule, MatTabsModule
  ],
  templateUrl: './blogs-form.component.html',
  styleUrl: './blogs-form.component.css'
})
export class BlogsFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  blogId?: number;
  
  previewEn: string = '';
  previewTr: string = '';

  mainImageFile: File | null = null;
  mainImagePreview: string | ArrayBuffer | null = null;
  existingMainImage: string | null = null;
  deleteMainImage: boolean = false;

  galleryImageFiles: File[] = [];
  galleryImagePreviews: string[] = [];
  existingGalleryImages: string[] = [];

  categories: Category[] = [];
  allSubCategories: SubCategory[] = [];
  filteredSubCategories: SubCategory[] = [];

  constructor(
    private fb: FormBuilder,
    private service: BlogService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      title_en: ['', Validators.required],
      title_tr: ['', Validators.required],
      slug_en: ['', Validators.required],
      slug_tr: ['', Validators.required],
      content_en: ['', Validators.required],
      content_tr: ['', Validators.required],
      excerpt_en: [''],
      excerpt_tr: [''],
      author: ['', Validators.required],
      read_time: [5, [Validators.required, Validators.min(1)]],
      view_count: [0],
      category_id: ['', Validators.required],
      sub_category_id: [''],
      tags: [[]]
    });
  }

  ngOnInit() {
    this.loadCategories();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.blogId = +params['id'];
        this.loadData();
      }
    });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (res) => this.categories = res.data,
      error: () => this.snackBar.open('Error loading categories', 'Close', { duration: 3000 })
    });
    this.subCategoryService.getAll().subscribe({
      next: (res) => {
        this.allSubCategories = res.data;
        this.filterSubCategories();
      },
      error: () => this.snackBar.open('Error loading sub-categories', 'Close', { duration: 3000 })
    });
  }

  onCategoryChange() {
    this.form.get('sub_category_id')?.setValue(null);
    this.filterSubCategories();
  }

  filterSubCategories() {
    const categoryId = this.form.get('category_id')?.value;
    if (categoryId) {
      this.filteredSubCategories = this.allSubCategories.filter(s => s.category_id === categoryId);
    } else {
      this.filteredSubCategories = [];
    }
  }

  loadData() {
    if (!this.blogId) return;
    this.service.getDetails(this.blogId).subscribe({
      next: (res) => {
        this.form.patchValue(res.data);
        this.updatePreview('en');
        this.updatePreview('tr');
        this.filterSubCategories();
        if (res.data.image_url) {
          this.existingMainImage = res.data.image_url;
          this.mainImagePreview = res.data.image_url;
        }
        if (res.data.images && res.data.images.length > 0) {
          this.existingGalleryImages = res.data.images;
        }
      },
      error: () => this.snackBar.open('Error loading blog details', 'Close', { duration: 3000 })
    });
  }

  onMainImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        this.snackBar.open('Main image must be less than 2MB', 'Close', { duration: 3000 });
        return;
      }
      this.mainImageFile = file;
      this.deleteMainImage = false;
      const reader = new FileReader();
      reader.onload = () => {
        this.mainImagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeMainImage() {
    this.mainImageFile = null;
    this.mainImagePreview = null;
    if (this.existingMainImage) {
      this.deleteMainImage = true;
    }
  }

  onGalleryImagesSelected(event: Event) {
    const files = Array.from((event.target as HTMLInputElement).files || []);
    for (const file of files) {
      if (file.size > 2 * 1024 * 1024) {
        this.snackBar.open(`File ${file.name} is larger than 2MB and was skipped`, 'Close', { duration: 3000 });
        continue;
      }
      this.galleryImageFiles.push(file);
      const reader = new FileReader();
      reader.onload = () => {
        this.galleryImagePreviews.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  removeNewGalleryImage(index: number) {
    this.galleryImageFiles.splice(index, 1);
    this.galleryImagePreviews.splice(index, 1);
  }

  removeExistingGalleryImage(index: number) {
    this.existingGalleryImages.splice(index, 1);
  }

  onTitleChange(lang: 'en'|'tr') {
    if (!this.isEditMode) {
      const title = this.form.get(`title_${lang}`)?.value || '';
      const slug = title.toLowerCase()
        .replace(/[^a-z0-9\u011f\u011e\u0131\u0130\u00f6\u00d6\u00fc\u00dc\u015f\u015e\u00e7\u00c7]+/g, '-') // Support TR chars in URL roughly
        .replace(/(^-|-$)+/g, '');
      this.form.get(`slug_${lang}`)?.setValue(slug);
    }
  }

  async updatePreview(lang: 'en'|'tr') {
    const content = this.form.get(`content_${lang}`)?.value || '';
    const rawHtml = await marked.parse(content);
    const safeHtml = DOMPurify.sanitize(rawHtml);
    if (lang === 'en') {
      this.previewEn = safeHtml;
    } else {
      this.previewTr = safeHtml;
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const data: any = { ...this.form.value };
    if (this.isEditMode) {
      data.id = this.blogId;
      data.delete_main_image = this.deleteMainImage;
      data.existing_gallery_images = this.existingGalleryImages;
    }
    
    if (this.mainImageFile) {
      data.main_image = this.mainImageFile;
    }
    if (this.galleryImageFiles.length > 0) {
      data.gallery_images = this.galleryImageFiles;
    }
    
    if (!data.sub_category_id) data.sub_category_id = null;

    const request = this.isEditMode ? this.service.update(data) : this.service.create(data);

    request.subscribe({
      next: () => {
        this.snackBar.open(`Blog ${this.isEditMode ? 'updated' : 'created'} successfully`, 'Close', { duration: 3000 });
        this.router.navigate(['/dashboard/blogs']);
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Error saving blog', 'Close', { duration: 3000 });
      }
    });
  }
}
