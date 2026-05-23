import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill } from '../domain/skills';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private API_URL = 'http://localhost:8000/api/moderator';

  constructor(private http: HttpClient) {}

  getAll(): Observable<{ data: Skill[] }> {
    return this.http.get<{ data: Skill[] }>(`${this.API_URL}/skills`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/skills/create`, data);
  }

  update(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/skills/update`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/skills/delete`, {}, {
      headers: { id: id.toString() }
    });
  }
  updateOrder(orders: { id: number; order: number }[]): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/skills/update-order`, { orders });
  }
}
