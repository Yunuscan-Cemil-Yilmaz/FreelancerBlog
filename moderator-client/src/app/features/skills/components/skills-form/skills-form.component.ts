import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SkillService } from '../../services/skills.service';
import { Skill } from '../../domain/skills';

@Component({
  selector: 'app-skills-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <h2 mat-dialog-title>{{ isEdit ? 'Edit' : 'Add' }} Skill</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="form-container">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>category_en</mat-label>
          <input matInput formControlName="category_en">
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>category_tr</mat-label>
          <input matInput formControlName="category_tr">
        </mat-form-field>
        
        <div class="items-header">
          <h3>Items</h3>
          <button mat-button type="button" color="primary" (click)="addItem()">+ Add Item</button>
        </div>
        
        <div formArrayName="items">
          <div *ngFor="let item of items.controls; let i=index" [formGroupName]="i" class="item-row">
            <mat-form-field appearance="outline" class="flex-item">
              <mat-label>Name</mat-label>
              <input matInput formControlName="name" placeholder="e.g. React">
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="flex-item">
              <mat-label>Level</mat-label>
              <mat-select formControlName="level">
                <mat-option value="core">Core</mat-option>
                <mat-option value="strong">Strong</mat-option>
                <mat-option value="familiar">Familiar</mat-option>
              </mat-select>
            </mat-form-field>
            
            <button mat-icon-button color="warn" type="button" (click)="removeItem(i)">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="primary" [disabled]="form.invalid || loading" (click)="save()">
        {{ loading ? 'Saving...' : 'Save' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .form-container { display: flex; flex-direction: column; padding-top: 10px; }
    .full-width { width: 100%; }
    .items-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
    .items-header h3 { margin: 0; }
    .item-row { display: flex; gap: 10px; align-items: center; margin-bottom: 5px; }
    .flex-item { flex: 1; }
  `]
})
export class SkillFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: SkillService,
    private dialogRef: MatDialogRef<SkillFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Skill | null,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      category_en: ['', [Validators.required]],
      category_tr: ['', [Validators.required]],
      items: this.fb.array([], [Validators.required])
    });
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  createItem(name = '', level = ''): FormGroup {
    return this.fb.group({
      name: [name, Validators.required],
      level: [level, Validators.required]
    });
  }

  addItem() {
    this.items.push(this.createItem());
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  ngOnInit() {
    if (this.data) {
      this.isEdit = true;
      this.form.patchValue({
        category_en: this.data.category_en,
        category_tr: this.data.category_tr,
      });

      // Populate FormArray with data
      if (this.data.items && Array.isArray(this.data.items)) {
        this.data.items.forEach((item: any) => {
          this.items.push(this.createItem(item.name, item.level));
        });
      }
    }
  }

  save() {
    if (this.form.valid) {
      this.loading = true;
      const payload = { ...this.form.value };

      if (this.isEdit && this.data) {
        payload.id = this.data.id;
        this.service.update(payload).subscribe({
          next: () => {
            this.snackBar.open('Updated successfully', 'Close', {duration: 3000});
            this.dialogRef.close(true);
          },
          error: (err) => {
            this.snackBar.open(err.error?.message || 'Error updating', 'Close', {duration: 3000});
            this.loading = false;
          }
        });
      } else {
        this.service.create(payload).subscribe({
          next: () => {
            this.snackBar.open('Created successfully', 'Close', {duration: 3000});
            this.dialogRef.close(true);
          },
          error: (err) => {
            this.snackBar.open(err.error?.message || 'Error creating', 'Close', {duration: 3000});
            this.loading = false;
          }
        });
      }
    }
  }
}
