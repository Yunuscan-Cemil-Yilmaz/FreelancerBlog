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
  templateUrl: './skills-form.component.html',
  styleUrl: './skills-form.component.css'
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
