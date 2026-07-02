import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
import { environment } from '@env/environment';

export interface Moderator {
  id: number;
  username: string;
  full_name: string;
  domain_id: number;
  is_active: boolean;
  domain?: {
    id: number;
    domain: string;
    admin_domain: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ModeratorService {
  private apiUrl = `${environment.apiBaseUrl}/admin/moderators`;
  private detailUrl = `${environment.apiBaseUrl}/admin/moderator-details`;

  constructor(private http: HttpClient) {}

  getModerators(page: number, pageSize: number, domain?: string): Observable<any> {
    let headers = new HttpHeaders({
      'page': page.toString(),
      'page-size': pageSize.toString()
    });
    if (domain) {
      headers = headers.set('domain', domain);
    }
    return this.http.get<any>(this.apiUrl, { headers }).pipe(timeout(10000));
  }

  getModeratorDetails(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'id': id.toString()
    });
    return this.http.get<any>(this.detailUrl, { headers }).pipe(timeout(10000));
  }

  createModerator(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data).pipe(timeout(10000));
  }

  deleteModerator(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'id': id.toString()
    });
    return this.http.delete<any>(this.apiUrl, { headers }).pipe(timeout(10000));
  }

  setActiveStatus(id: number, isActive: boolean): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/status`, { id, is_active: isActive }).pipe(timeout(10000));
  }

  updateModeratorDomain(id: number, domainId: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/domain`, { id, domain_id: domainId }).pipe(timeout(10000));
  }

  resetPassword(id: number, newPassword: string): Observable<any> {
    const headers = new HttpHeaders({
      'id': id.toString()
    });
    // Note: The controller was edited to use $request->body('new-password') 
    // which corresponds to a request body.
    return this.http.post<any>(`${this.apiUrl}/reset-password`, { 'new-password': newPassword }, { headers }).pipe(timeout(10000));
  }
}
