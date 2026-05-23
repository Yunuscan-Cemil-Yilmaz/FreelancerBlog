import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reference } from '../domain/references';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {
  private API_URL = 'http://localhost:8000/api/moderator';

  constructor(private http: HttpClient) {}

  getAll(): Observable<{ data: Reference[] }> {
    return this.http.get<{ data: Reference[] }>(`${this.API_URL}/references`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/references/create`, data);
  }

  update(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/references/update`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/references/delete`, {}, {
      headers: { id: id.toString() }
    });
  }
  updateOrder(orders: { id: number; order: number }[]): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/references/update-order`, { orders });
  }
}
