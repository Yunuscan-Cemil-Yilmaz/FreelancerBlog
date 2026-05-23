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
  template: `
    <div class="form-header">
      <h2>{{ isEditMode ? 'Edit Blog' : 'Create Blog' }}</h2>
      <button mat-icon-button routerLink="/dashboard/blogs">
        <mat-icon>close</mat-icon>
      </button>
    </div>

    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="blog-form">
      <!-- General Info -->
      <mat-card class="section-card">
        <mat-card-content class="grid-2">
          <mat-form-field appearance="outline">
            <mat-label>Title (EN)</mat-label>
            <input matInput formControlName="title_en" (keyup)="onTitleChange('en')">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Title (TR)</mat-label>
            <input matInput formControlName="title_tr" (keyup)="onTitleChange('tr')">
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Slug (EN)</mat-label>
            <input matInput formControlName="slug_en">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Slug (TR)</mat-label>
            <input matInput formControlName="slug_tr">
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Author</mat-label>
            <input matInput formControlName="author">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Read Time (minutes)</mat-label>
            <input matInput type="number" formControlName="read_time">
          </mat-form-field>
          <mat-form-field appearance="outline" *ngIf="isEditMode">
            <mat-label>View Count</mat-label>
            <input matInput type="number" formControlName="view_count" readonly>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Category</mat-label>
            <mat-select formControlName="category_id" (selectionChange)="onCategoryChange()">
              <mat-option *ngFor="let cat of categories" [value]="cat.id">
                {{ cat.name_en }} ({{ cat.name_tr }})
              </mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Sub Category</mat-label>
            <mat-select formControlName="sub_category_id">
              <mat-option [value]="null">-- None --</mat-option>
              <mat-option *ngFor="let sub of filteredSubCategories" [value]="sub.id">
                {{ sub.name_en }} ({{ sub.name_tr }})
              </mat-option>
            </mat-select>
          </mat-form-field>
          
          <div class="full-width">
            <mat-label style="display:block; margin-bottom:8px;">Main Image (Max 2MB)</mat-label>
            <input type="file" (change)="onMainImageSelected($event)" accept="image/*" #mainImageInput style="display: none">
            <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 10px;">
              <button mat-stroked-button type="button" (click)="mainImageInput.click()">Select Main Image</button>
              <button mat-icon-button color="warn" type="button" *ngIf="mainImageFile || existingMainImage" (click)="removeMainImage()">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
            <div *ngIf="mainImagePreview" style="margin-top: 10px;">
              <img [src]="mainImagePreview" alt="Main Image Preview" style="max-height: 150px; border-radius: 4px; border: 1px solid #ddd;">
            </div>
          </div>

          <div class="full-width">
            <mat-label style="display:block; margin-bottom:8px; margin-top: 20px;">Gallery Images (Max 2MB each)</mat-label>
            <input type="file" (change)="onGalleryImagesSelected($event)" accept="image/*" multiple #galleryImagesInput style="display: none">
            <button mat-stroked-button type="button" (click)="galleryImagesInput.click()">Add Gallery Images</button>
            
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;">
              <!-- Existing Gallery Images -->
              <div *ngFor="let url of existingGalleryImages; let i = index" style="position: relative;">
                <img [src]="url" alt="Gallery Image" style="height: 100px; border-radius: 4px; border: 1px solid #ddd;">
                <button mat-icon-button color="warn" type="button" (click)="removeExistingGalleryImage(i)" style="position: absolute; top: 0; right: 0; background: rgba(255,255,255,0.7); width: 24px; height: 24px; line-height: 24px;">
                  <mat-icon style="font-size: 16px;">close</mat-icon>
                </button>
              </div>
              
              <!-- New Gallery Images Previews -->
              <div *ngFor="let preview of galleryImagePreviews; let i = index" style="position: relative;">
                <img [src]="preview" alt="New Gallery Image" style="height: 100px; border-radius: 4px; border: 1px solid #ddd;">
                <button mat-icon-button color="warn" type="button" (click)="removeNewGalleryImage(i)" style="position: absolute; top: 0; right: 0; background: rgba(255,255,255,0.7); width: 24px; height: 24px; line-height: 24px;">
                  <mat-icon style="font-size: 16px;">close</mat-icon>
                </button>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Content Editor -->
      <mat-card class="section-card markdown-section">
        <mat-tab-group>
          <!-- English Content -->
          <mat-tab label="Content (EN)">
             <div class="md-editor-container">
               <div class="md-input-col">
                 <mat-form-field appearance="outline" class="full-width editor-field">
                   <mat-label>Write Markdown here</mat-label>
                   <textarea matInput formControlName="content_en" rows="15" (keyup)="updatePreview('en')"></textarea>
                 </mat-form-field>
               </div>
               <div class="md-preview-col">
                 <div class="preview-header">Live Preview</div>
                 <div class="preview-content" [innerHTML]="previewEn"></div>
               </div>
             </div>
          </mat-tab>

          <!-- Turkish Content -->
          <mat-tab label="Content (TR)">
             <div class="md-editor-container">
               <div class="md-input-col">
                 <mat-form-field appearance="outline" class="full-width editor-field">
                   <mat-label>Write Markdown here</mat-label>
                   <textarea matInput formControlName="content_tr" rows="15" (keyup)="updatePreview('tr')"></textarea>
                 </mat-form-field>
               </div>
               <div class="md-preview-col">
                 <div class="preview-header">Live Preview</div>
                 <div class="preview-content" [innerHTML]="previewTr"></div>
               </div>
             </div>
          </mat-tab>
        </mat-tab-group>
      </mat-card>

      <!-- Excerpt -->
      <mat-card class="section-card">
        <mat-card-content class="grid-2">
          <mat-form-field appearance="outline">
            <mat-label>Excerpt (EN)</mat-label>
            <textarea matInput formControlName="excerpt_en" rows="3"></textarea>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Excerpt (TR)</mat-label>
            <textarea matInput formControlName="excerpt_tr" rows="3"></textarea>
          </mat-form-field>
        </mat-card-content>
      </mat-card>

      <div class="actions">
        <button mat-button type="button" routerLink="/dashboard/blogs">Cancel</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
          {{ isEditMode ? 'Update' : 'Create' }}
        </button>
      </div>
    </form>
  `,
  styles: [`
    .form-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .section-card { margin-bottom: 20px; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .full-width { grid-column: 1 / -1; width: 100%; }
    
    .md-editor-container {
      display: flex;
      flex-direction: row;
      gap: 16px;
      margin-top: 16px;
    }
    .md-input-col, .md-preview-col {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    
    /* Fixed equal height and independent scroll for both sides */
    .editor-field textarea { 
      height: 500px !important; 
      resize: none; 
      font-family: monospace; 
      line-height: 1.5;
      overflow-y: auto;
    }
    
    .preview-header { font-weight: bold; margin-bottom: 8px; color: #555; height: 20px; }
    .preview-content {
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 16px;
      background: #fdfdfd;
      height: 500px;
      overflow-y: auto;
      font-family: sans-serif;
      line-height: 1.6;
    }
    
    /* Markdown Styles for Preview (using ::ng-deep because HTML is injected dynamically) */
    .preview-content ::ng-deep h1 { font-size: 2em; font-weight: bold; margin-top: 0.67em; margin-bottom: 0.67em; border-bottom: 1px solid #eee; padding-bottom: 0.3em; }
    .preview-content ::ng-deep h2 { font-size: 1.5em; font-weight: bold; margin-top: 0.83em; margin-bottom: 0.83em; border-bottom: 1px solid #eee; padding-bottom: 0.3em; }
    .preview-content ::ng-deep h3 { font-size: 1.17em; font-weight: bold; margin-top: 1em; margin-bottom: 1em; }
    .preview-content ::ng-deep h4 { font-size: 1em; font-weight: bold; margin-top: 1.33em; margin-bottom: 1.33em; }
    .preview-content ::ng-deep h5 { font-size: 0.83em; font-weight: bold; margin-top: 1.67em; margin-bottom: 1.67em; }
    .preview-content ::ng-deep h6 { font-size: 0.67em; font-weight: bold; margin-top: 2.33em; margin-bottom: 2.33em; }
    .preview-content ::ng-deep p { margin-top: 1em; margin-bottom: 1em; }
    .preview-content ::ng-deep strong { font-weight: bold; }
    .preview-content ::ng-deep em { font-style: italic; }
    .preview-content ::ng-deep ul { list-style-type: disc; padding-left: 40px; margin-top: 1em; margin-bottom: 1em; }
    .preview-content ::ng-deep ol { list-style-type: decimal; padding-left: 40px; margin-top: 1em; margin-bottom: 1em; }
    .preview-content ::ng-deep li { margin-bottom: 0.5em; }
    .preview-content ::ng-deep blockquote { border-left: 4px solid #ccc; margin: 1.5em 10px; padding: 0.5em 10px; color: #666; background: #f9f9f9; }
    .preview-content ::ng-deep pre { background: #f4f4f4; border: 1px solid #ddd; border-left: 3px solid #f36d33; color: #666; page-break-inside: avoid; font-family: monospace; font-size: 15px; line-height: 1.6; margin-bottom: 1.6em; max-width: 100%; overflow: auto; padding: 1em 1.5em; display: block; word-wrap: break-word; }
    .preview-content ::ng-deep code { font-family: monospace; background: #f4f4f4; padding: 2px 4px; border-radius: 4px; font-size: 0.9em; color: #d63384; }
    .preview-content ::ng-deep pre code { padding: 0; color: inherit; background: transparent; border-radius: 0; }
    .preview-content ::ng-deep hr { border: 0; border-top: 2px solid #eee; margin: 2em 0; }
    .preview-content ::ng-deep a { color: #3f51b5; text-decoration: none; }
    .preview-content ::ng-deep a:hover { text-decoration: underline; }
    .preview-content ::ng-deep img { max-width: 100%; height: auto; }
    
    @media (max-width: 768px) {
      .md-editor-container { flex-direction: column; }
      .grid-2 { grid-template-columns: 1fr; }
    }

    .actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
  `]
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
