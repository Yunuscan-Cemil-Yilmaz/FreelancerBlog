import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Repo, PaginatedRepos } from '../domain/repos';

@Injectable({
  providedIn: 'root'
})
export class RepoService {
  private API_URL = 'http://localhost:8000/api/moderator/repos';

  constructor(private http: HttpClient) {}

  getAll(page: number = 1, perPage: number = 10): Observable<PaginatedRepos> {
    let params = new HttpParams().set('page', page.toString()).set('per_page', perPage.toString());
    return this.http.get<PaginatedRepos>(this.API_URL, { params });
  }

  getDetails(id: number): Observable<{ data: Repo }> {
    return this.http.get<{ data: Repo }>(`${this.API_URL}/${id}`);
  }

  create(data: any): Observable<any> {
    const formData = this.toFormData(data);
    return this.http.post<any>(`${this.API_URL}/create`, formData);
  }

  update(data: any): Observable<any> {
    const formData = this.toFormData(data);
    return this.http.post<any>(`${this.API_URL}/update`, formData);
  }

  delete(id: number): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/delete`, {}, {
      headers: { id: id.toString() }
    });
  }

  private toFormData(data: any): FormData {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== null && data[key] !== undefined) {
        if (key === 'gallery_images') {
          for (const file of data[key]) {
            formData.append('gallery_images[]', file);
          }
        } else if (key === 'tech_stack' || key === 'existing_gallery_images') {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      }
    }
    return formData;
  }
}
