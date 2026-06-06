<?php

$models = [
    ['name' => 'InteractionRequest', 'kebab' => 'interaction-requests', 'apiPrefix' => 'interaction-requests', 'hasId' => false, 'idName' => ''],
    ['name' => 'BlogInteractionRequest', 'kebab' => 'blog-interaction-requests', 'apiPrefix' => 'blog-interaction-requests', 'hasId' => true, 'idName' => 'blog_id'],
    ['name' => 'RepoInteractionRequest', 'kebab' => 'repo-interaction-requests', 'apiPrefix' => 'repo-interaction-requests', 'hasId' => true, 'idName' => 'repo_id'],
];

$baseDir = __DIR__ . '/src/app/features/';

foreach ($models as $model) {
    $featureDir = $baseDir . $model['kebab'];
    $serviceFile = $featureDir . '/services/' . $model['kebab'] . '.ts';
    $listTsFile = $featureDir . '/pages/list/list.ts';
    $listHtmlFile = $featureDir . '/pages/list/list.html';
    $detailTsFile = $featureDir . '/pages/detail/detail.ts';
    $detailHtmlFile = $featureDir . '/pages/detail/detail.html';

    @mkdir($featureDir . '/services', 0777, true);
    @mkdir($featureDir . '/pages/list', 0777, true);
    @mkdir($featureDir . '/pages/detail', 0777, true);

    // SERVICE
    $serviceContent = <<<EOT
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class {$model['name']}Service {
  private http = inject(HttpClient);
  private apiUrl = `\${environment.apiUrl}/moderator/{$model['apiPrefix']}`;

  getList(params: any): Observable<any> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
        httpParams = httpParams.set(key, params[key]);
      }
    });
    return this.http.get<any>(this.apiUrl, { params: httpParams });
  }

  getDetail(id: number): Observable<any> {
    return this.http.get<any>(`\${this.apiUrl}/\${id}`);
  }

  updateReadStatus(id: number, is_readed: boolean): Observable<any> {
    return this.http.patch<any>(`\${this.apiUrl}/\${id}/read`, { is_readed });
  }

  updateHandledStatus(id: number, is_handled: boolean): Observable<any> {
    return this.http.patch<any>(`\${this.apiUrl}/\${id}/handled`, { is_handled });
  }

  updateCompletedStatus(id: number, is_completed: boolean): Observable<any> {
    return this.http.patch<any>(`\${this.apiUrl}/\${id}/completed`, { is_completed });
  }

  updateAdminNote(id: number, admin_note: string): Observable<any> {
    return this.http.patch<any>(`\${this.apiUrl}/\${id}/admin-note`, { admin_note });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`\${this.apiUrl}/\${id}`);
  }

  addDetail(data: any): Observable<any> {
    return this.http.post<any>(`\${this.apiUrl}/details`, data);
  }

  updateDetail(id: number, data: any): Observable<any> {
    return this.http.patch<any>(`\${this.apiUrl}/details/\${id}`, data);
  }

  deleteDetail(id: number): Observable<any> {
    return this.http.delete<any>(`\${this.apiUrl}/details/\${id}`);
  }
}
EOT;
    file_put_contents($serviceFile, $serviceContent);

    // LIST TS
    $listTsContent = <<<EOT
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { {$model['name']}Service } from '../../services/{$model['kebab']}';

@Component({
  selector: 'app-{$model['kebab']}-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatTableModule, MatPaginatorModule, MatTabsModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule],
  templateUrl: './list.html',
  styleUrls: ['./list.css']
})
export class List implements OnInit {
  service = inject({$model['name']}Service);

  displayedColumns: string[] = ['id', 'name', 'email', 'interaction_type', 'is_readed', 'is_handled', 'is_completed', 'created_at', 'actions'];
  
  currentTabIndex = 0;
  
  data: any[] = [];
  totalItems = 0;
  
  filters: any = {
    page: 1,
    perPage: 10,
    name: '',
    email: '',
    phone: '',
    interaction_type: '',
    title: '',
    is_readed: null,
    is_handled: null,
    is_completed: null
  };

  ngOnInit() {
    this.loadData();
  }

  onTabChange(index: number) {
    this.currentTabIndex = index;
    this.filters.is_readed = null;
    this.filters.is_handled = null;
    this.filters.page = 1;

    if (index === 1) this.filters.is_readed = false;
    else if (index === 2) this.filters.is_handled = true;
    else if (index === 3) this.filters.is_handled = false;

    this.loadData();
  }

  onPageChange(event: PageEvent) {
    this.filters.page = event.pageIndex + 1;
    this.filters.perPage = event.pageSize;
    this.loadData();
  }

  applyFilters() {
    this.filters.page = 1;
    this.loadData();
  }

  clearFilters() {
    this.filters.name = '';
    this.filters.email = '';
    this.filters.phone = '';
    this.filters.interaction_type = '';
    this.filters.title = '';
    this.applyFilters();
  }

  loadData() {
    const params: any = { ...this.filters };
    this.service.getList(params).subscribe(res => {
      this.data = res.data;
      this.totalItems = res.total;
    });
  }
}
EOT;
    file_put_contents($listTsFile, $listTsContent);

    // LIST HTML
    $listHtmlContent = <<<EOT
<div class="p-6">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-bold text-gray-800 dark:text-white">{$model['name']} Management</h1>
  </div>

  <mat-tab-group (selectedIndexChange)="onTabChange(\$event)" class="mb-6">
    <mat-tab label="All Requests"></mat-tab>
    <mat-tab label="Unread"></mat-tab>
    <mat-tab label="Handled"></mat-tab>
    <mat-tab label="Unhandled"></mat-tab>
  </mat-tab-group>

  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
    <h3 class="text-lg font-medium mb-4 dark:text-white">Filters</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <mat-form-field appearance="outline">
        <mat-label>Name</mat-label>
        <input matInput [(ngModel)]="filters.name" (keyup.enter)="applyFilters()">
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Email</mat-label>
        <input matInput [(ngModel)]="filters.email" (keyup.enter)="applyFilters()">
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Phone</mat-label>
        <input matInput [(ngModel)]="filters.phone" (keyup.enter)="applyFilters()">
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Type</mat-label>
        <input matInput [(ngModel)]="filters.interaction_type" (keyup.enter)="applyFilters()">
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Title</mat-label>
        <input matInput [(ngModel)]="filters.title" (keyup.enter)="applyFilters()">
      </mat-form-field>
    </div>
    <div class="flex justify-end gap-2 mt-4">
      <button mat-button (click)="clearFilters()">Clear</button>
      <button mat-flat-button color="primary" (click)="applyFilters()">Search</button>
    </div>
  </div>

  <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
    <table mat-table [dataSource]="data" class="w-full">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> ID </th>
        <td mat-cell *matCellDef="let element"> {{element.id}} </td>
      </ng-container>

      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef> Name </th>
        <td mat-cell *matCellDef="let element"> {{element.name}} </td>
      </ng-container>

      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef> Email </th>
        <td mat-cell *matCellDef="let element"> {{element.email}} </td>
      </ng-container>

      <ng-container matColumnDef="interaction_type">
        <th mat-header-cell *matHeaderCellDef> Type </th>
        <td mat-cell *matCellDef="let element"> {{element.interaction_type}} </td>
      </ng-container>

      <ng-container matColumnDef="is_readed">
        <th mat-header-cell *matHeaderCellDef> Read </th>
        <td mat-cell *matCellDef="let element">
          <mat-icon [color]="element.is_readed ? 'primary' : 'warn'">
            {{element.is_readed ? 'check_circle' : 'cancel'}}
          </mat-icon>
        </td>
      </ng-container>

      <ng-container matColumnDef="is_handled">
        <th mat-header-cell *matHeaderCellDef> Handled </th>
        <td mat-cell *matCellDef="let element">
          <mat-icon [color]="element.is_handled ? 'primary' : 'warn'">
            {{element.is_handled ? 'check_circle' : 'cancel'}}
          </mat-icon>
        </td>
      </ng-container>

      <ng-container matColumnDef="is_completed">
        <th mat-header-cell *matHeaderCellDef> Completed </th>
        <td mat-cell *matCellDef="let element">
          <mat-icon [color]="element.is_completed ? 'primary' : 'warn'">
            {{element.is_completed ? 'check_circle' : 'cancel'}}
          </mat-icon>
        </td>
      </ng-container>

      <ng-container matColumnDef="created_at">
        <th mat-header-cell *matHeaderCellDef> Date </th>
        <td mat-cell *matCellDef="let element"> {{element.created_at | date:'short'}} </td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef> Actions </th>
        <td mat-cell *matCellDef="let element">
          <a mat-icon-button color="primary" [routerLink]="['/{$model['kebab']}', element.id]">
            <mat-icon>visibility</mat-icon>
          </a>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>

    <mat-paginator [length]="totalItems"
                   [pageSize]="filters.perPage"
                   [pageSizeOptions]="[5, 10, 25, 100]"
                   (page)="onPageChange(\$event)"
                   showFirstLastButtons>
    </mat-paginator>
  </div>
</div>
EOT;
    file_put_contents($listHtmlFile, $listHtmlContent);

    // DETAIL TS
    $fkKey = $model['hasId'] ? $model['idName'] : 'interaction_id';
    $actualFk = $model['name'] === 'BlogInteractionRequest' ? 'blog_interaction_id' : ($model['name'] === 'RepoInteractionRequest' ? 'repo_interaction_id' : 'interaction_id');
    
    $detailTsContent = <<<EOT
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { {$model['name']}Service } from '../../services/{$model['kebab']}';

@Component({
  selector: 'app-{$model['kebab']}-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule, MatSlideToggleModule, MatInputModule, MatTableModule],
  templateUrl: './detail.html',
  styleUrls: ['./detail.css']
})
export class Detail implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  service = inject({$model['name']}Service);
  snackBar = inject(MatSnackBar);

  id!: number;
  data: any;

  detailColumns: string[] = ['id', 'interaction_note', 'contact_result', 'actions'];
  
  newDetail: any = {
    interaction_note: '',
    contact_result: 1
  };

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadData();
  }

  loadData() {
    this.service.getDetail(this.id).subscribe({
      next: (res) => this.data = res,
      error: () => {
        this.snackBar.open('Not found', 'Close', { duration: 3000 });
        this.router.navigate(['/{$model['kebab']}']);
      }
    });
  }

  updateRead(event: any) {
    this.service.updateReadStatus(this.id, event.checked).subscribe(() => this.snackBar.open('Updated', 'Close', { duration: 2000 }));
  }

  updateHandled(event: any) {
    this.service.updateHandledStatus(this.id, event.checked).subscribe(() => this.snackBar.open('Updated', 'Close', { duration: 2000 }));
  }

  updateCompleted(event: any) {
    this.service.updateCompletedStatus(this.id, event.checked).subscribe(() => this.snackBar.open('Updated', 'Close', { duration: 2000 }));
  }

  saveAdminNote() {
    this.service.updateAdminNote(this.id, this.data.admin_note).subscribe(() => this.snackBar.open('Admin note saved', 'Close', { duration: 2000 }));
  }

  deleteInteraction() {
    if(confirm('Are you sure you want to delete this interaction and all its details?')) {
      this.service.delete(this.id).subscribe(() => {
        this.snackBar.open('Deleted successfully', 'Close', { duration: 2000 });
        this.router.navigate(['/{$model['kebab']}']);
      });
    }
  }

  addDetail() {
    if(!this.newDetail.interaction_note) return;
    const payload = { ...this.newDetail };
    payload['{$actualFk}'] = this.id;
    
    this.service.addDetail(payload).subscribe(() => {
      this.snackBar.open('Detail added', 'Close', { duration: 2000 });
      this.newDetail.interaction_note = '';
      this.loadData();
    });
  }

  deleteDetail(detailId: number) {
    if(confirm('Delete this detail?')) {
      this.service.deleteDetail(detailId).subscribe(() => {
        this.snackBar.open('Detail deleted', 'Close', { duration: 2000 });
        this.loadData();
      });
    }
  }
}
EOT;
    file_put_contents($detailTsFile, $detailTsContent);

    // DETAIL HTML
    $detailHtmlContent = <<<EOT
<div class="p-6" *ngIf="data">
  <div class="flex justify-between items-center mb-6">
    <div class="flex items-center gap-4">
      <a mat-icon-button routerLink="/{$model['kebab']}">
        <mat-icon>arrow_back</mat-icon>
      </a>
      <h1 class="text-2xl font-bold text-gray-800 dark:text-white">{$model['name']} #{{data.id}}</h1>
    </div>
    <button mat-flat-button color="warn" (click)="deleteInteraction()">Delete Request</button>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Main Info -->
    <div class="lg:col-span-2 space-y-6">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Request Info</mat-card-title>
        </mat-card-header>
        <mat-card-content class="pt-4">
          <div class="grid grid-cols-2 gap-4">
            <div><strong class="text-gray-500">Name:</strong> <div>{{data.name}}</div></div>
            <div><strong class="text-gray-500">Email:</strong> <div>{{data.email || '-'}}</div></div>
            <div><strong class="text-gray-500">Phone:</strong> <div>{{data.phone || '-'}}</div></div>
            <div><strong class="text-gray-500">Type:</strong> <div>{{data.interaction_type}}</div></div>
            <div><strong class="text-gray-500">Title:</strong> <div>{{data.title}}</div></div>
            <div><strong class="text-gray-500">Time:</strong> <div>{{data.preferred_contact_time || '-'}}</div></div>
          </div>
          
          <div class="mt-6">
            <strong class="text-gray-500">Message:</strong>
            <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg mt-2 whitespace-pre-wrap">{{data.message}}</div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Details List -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Interaction Details</mat-card-title>
        </mat-card-header>
        <mat-card-content class="pt-4">
          <table mat-table [dataSource]="data.details || []" class="w-full mb-6">
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>ID</th>
              <td mat-cell *matCellDef="let element">{{element.id}}</td>
            </ng-container>
            <ng-container matColumnDef="interaction_note">
              <th mat-header-cell *matHeaderCellDef>Note</th>
              <td mat-cell *matCellDef="let element">{{element.interaction_note}}</td>
            </ng-container>
            <ng-container matColumnDef="contact_result">
              <th mat-header-cell *matHeaderCellDef>Result Code</th>
              <td mat-cell *matCellDef="let element">{{element.contact_result}}</td>
            </ng-container>
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let element">
                <button mat-icon-button color="warn" (click)="deleteDetail(element.id)"><mat-icon>delete</mat-icon></button>
              </td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="detailColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: detailColumns;"></tr>
          </table>

          <h4 class="font-medium mb-2">Add New Detail</h4>
          <div class="flex gap-4 items-start">
            <mat-form-field appearance="outline" class="flex-1">
              <mat-label>Note</mat-label>
              <textarea matInput [(ngModel)]="newDetail.interaction_note" rows="2"></textarea>
            </mat-form-field>
            <mat-form-field appearance="outline" class="w-32">
              <mat-label>Result Code</mat-label>
              <input matInput type="number" [(ngModel)]="newDetail.contact_result">
            </mat-form-field>
            <button mat-flat-button color="primary" class="mt-2" (click)="addDetail()">Add</button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>

    <!-- Status & Admin Note -->
    <div class="space-y-6">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Status Control</mat-card-title>
        </mat-card-header>
        <mat-card-content class="pt-4 flex flex-col gap-4">
          <mat-slide-toggle [(ngModel)]="data.is_readed" (change)="updateRead(\$event)">Read</mat-slide-toggle>
          <mat-slide-toggle [(ngModel)]="data.is_handled" (change)="updateHandled(\$event)">Handled</mat-slide-toggle>
          <mat-slide-toggle [(ngModel)]="data.is_completed" (change)="updateCompleted(\$event)">Completed</mat-slide-toggle>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Admin Note</mat-card-title>
        </mat-card-header>
        <mat-card-content class="pt-4">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Internal Note</mat-label>
            <textarea matInput [(ngModel)]="data.admin_note" rows="6"></textarea>
          </mat-form-field>
          <button mat-flat-button color="primary" class="w-full" (click)="saveAdminNote()">Save Note</button>
        </mat-card-content>
      </mat-card>
    </div>
  </div>
</div>
EOT;
    file_put_contents($detailHtmlFile, $detailHtmlContent);
}
echo "Moderator Pages Scaffolded.\n";
