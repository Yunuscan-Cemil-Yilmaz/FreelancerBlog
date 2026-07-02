import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Education } from '../domain/educations';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private API_URL = `${environment.apiBaseUrl}/moderator`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<{ data: Education[] }> {
    return this.http.get<{ data: Education[] }>(`${this.API_URL}/educations`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/educations/create`, data);
  }

  update(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/educations/update`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/educations/delete`, {}, {
      headers: { id: id.toString() }
    });
  }
  updateOrder(orders: { id: number; order: number }[]): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/educations/update-order`, { orders });
  }
}
