import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BlogInteractionRequestService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/moderator/blog-interaction-requests';

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
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateReadStatus(id: number, is_readed: boolean): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/read`, { is_readed });
  }

  updateHandledStatus(id: number, is_handled: boolean): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/handled`, { is_handled });
  }

  updateCompletedStatus(id: number, is_completed: boolean): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/completed`, { is_completed });
  }

  updateAdminNote(id: number, admin_note: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/admin-note`, { admin_note });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  addDetail(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/details`, data);
  }

  updateDetail(id: number, data: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/details/${id}`, data);
  }

  deleteDetail(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/details/${id}`);
  }
}