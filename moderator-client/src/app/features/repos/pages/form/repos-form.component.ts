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
import { RepoService } from '../../services/repos.service';
import { CategoryService } from '../../../categories/services/categories.service';
import { SubCategoryService } from '../../../sub-categories/services/sub-categories.service';
import { Category } from '../../../categories/domain/categories';
import { SubCategory } from '../../../sub-categories/domain/sub-categories';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

@Component({
  selector: 'app-repos-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, 
    MatButtonModule, MatIconModule, MatSelectModule, MatCardModule, 
    MatSnackBarModule, RouterModule, MatTabsModule
  ],
  templateUrl: './repos-form.component.html',
  styleUrl: './repos-form.component.css'
})
export class ReposFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  repoId?: number;
  
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
    private service: RepoService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      slug: ['', Validators.required],
      description_en: ['', Validators.required],
      description_tr: ['', Validators.required],
      project_url: [''],
      repo_url: [''],
      is_public: [true, Validators.required],
      view_count: [0],
      tech_stack: ['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.repoId = +params['id'];
        this.loadData();
      }
    });
  }

  loadData() {
    if (!this.repoId) return;
    this.service.getDetails(this.repoId).subscribe({
      next: (res) => {
        const formData: any = { ...res.data };
        if (formData.tech_stack && Array.isArray(formData.tech_stack)) {
          formData.tech_stack = formData.tech_stack.join(', ');
        }
        this.form.patchValue(formData);
        this.updatePreview('en');
        this.updatePreview('tr');
        if (res.data.image_url) {
          this.existingMainImage = res.data.image_url;
          this.mainImagePreview = res.data.image_url;
        }
        if (res.data.images && res.data.images.length > 0) {
          this.existingGalleryImages = res.data.images;
        }
      },
      error: () => this.snackBar.open('Error loading repo details', 'Close', { duration: 3000 })
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

  onTitleChange() {
    if (!this.isEditMode) {
      const title = this.form.get('title')?.value || '';
      const slug = title.toLowerCase()
        .replace(/[^a-z0-9\u011f\u011e\u0131\u0130\u00f6\u00d6\u00fc\u00dc\u015f\u015e\u00e7\u00c7]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      this.form.get('slug')?.setValue(slug);
    }
  }

  async updatePreview(lang: 'en'|'tr') {
    const content = this.form.get(`description_${lang}`)?.value || '';
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
    
    if (data.tech_stack) {
      data.tech_stack = data.tech_stack.split(',').map((t: string) => t.trim()).filter((t: string) => t);
    } else {
      data.tech_stack = [];
    }

    if (this.isEditMode) {
      data.id = this.repoId;
      data.delete_main_image = this.deleteMainImage;
      data.existing_gallery_images = this.existingGalleryImages;
    }
    
    if (this.mainImageFile) {
      data.main_image = this.mainImageFile;
    }
    if (this.galleryImageFiles.length > 0) {
      data.gallery_images = this.galleryImageFiles;
    }

    const request = this.isEditMode ? this.service.update(data) : this.service.create(data);

    request.subscribe({
      next: () => {
        this.snackBar.open(`Repo ${this.isEditMode ? 'updated' : 'created'} successfully`, 'Close', { duration: 3000 });
        this.router.navigate(['/dashboard/repos']);
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Error saving repo', 'Close', { duration: 3000 });
      }
    });
  }
}
