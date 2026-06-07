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
import { RepoInteractionRequestService } from '../../services/repo-interaction-requests';

@Component({
  selector: 'app-repo-interaction-requests-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatTableModule, MatPaginatorModule, MatTabsModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule],
  templateUrl: './list.html',
  styleUrls: ['./list.css']
})
export class List implements OnInit {
  service = inject(RepoInteractionRequestService);

  displayedColumns: string[] = ['id', 'title', 'name', 'email', 'interaction_type', 'is_readed', 'is_handled', 'is_completed', 'created_at', 'actions'];
  
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
    this.filters.is_readed = null;
    this.filters.is_handled = null;
    this.filters.is_completed = null;
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