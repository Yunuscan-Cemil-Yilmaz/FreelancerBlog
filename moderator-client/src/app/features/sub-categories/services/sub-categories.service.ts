import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubCategory } from '../domain/sub-categories';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  private API_URL = `${environment.apiBaseUrl}/moderator`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<{ data: SubCategory[] }> {
    return this.http.get<{ data: SubCategory[] }>(`${this.API_URL}/sub-categories`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/sub-categories/create`, data);
  }

  update(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/sub-categories/update`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/sub-categories/delete`, {}, {
      headers: { id: id.toString() }
    });
  }
}
