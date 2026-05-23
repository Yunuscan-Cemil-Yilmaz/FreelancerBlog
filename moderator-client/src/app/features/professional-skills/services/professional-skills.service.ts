import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfessionalSkill } from '../domain/professional-skills';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalSkillService {
  private API_URL = 'http://localhost:8000/api/moderator';

  constructor(private http: HttpClient) {}

  getAll(): Observable<{ data: ProfessionalSkill[] }> {
    return this.http.get<{ data: ProfessionalSkill[] }>(`${this.API_URL}/professional-skills`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/professional-skills/create`, data);
  }

  update(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/professional-skills/update`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/professional-skills/delete`, {}, {
      headers: { id: id.toString() }
    });
  }
  updateOrder(orders: { id: number; order: number }[]): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/professional-skills/update-order`, { orders });
  }
}
