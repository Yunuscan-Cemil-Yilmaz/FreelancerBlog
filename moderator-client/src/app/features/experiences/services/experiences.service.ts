import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experience } from '../domain/experiences';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private API_URL = 'http://localhost:8000/api/moderator';

  constructor(private http: HttpClient) {}

  getAll(): Observable<{ data: Experience[] }> {
    return this.http.get<{ data: Experience[] }>(`${this.API_URL}/experiences`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/experiences/create`, data);
  }

  update(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/experiences/update`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/experiences/delete`, {}, {
      headers: { id: id.toString() }
    });
  }
  updateOrder(orders: { id: number; order: number }[]): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/experiences/update-order`, { orders });
  }
}
