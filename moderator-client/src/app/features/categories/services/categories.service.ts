import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../domain/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API_URL = 'http://localhost:8000/api/moderator';

  constructor(private http: HttpClient) {}

  getAll(): Observable<{ data: Category[] }> {
    return this.http.get<{ data: Category[] }>(`${this.API_URL}/categories`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/categories/create`, data);
  }

  update(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/categories/update`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/categories/delete`, {}, {
      headers: { id: id.toString() }
    });
  }
}
