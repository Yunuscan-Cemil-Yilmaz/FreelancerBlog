import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';

export interface Domain {
  id: number;
  domain: string;
  admin_domain: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  private apiUrl = 'http://localhost:8000/api/admin/domains';

  constructor(private http: HttpClient) {}

  getDomains(page: number, pageSize: number): Observable<any> {
    const headers = new HttpHeaders({
      'page': page.toString(),
      'pageSize': pageSize.toString()
    });
    return this.http.get<any>(this.apiUrl, { headers }).pipe(timeout(10000));
  }

  createDomain(domainData: { domain: string, admin_domain: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, domainData).pipe(timeout(10000));
  }

  updateDomain(domainData: { id: number, domain: string, admin_domain: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update`, domainData).pipe(timeout(10000));
  }

  cascadeUpdateDomain(domainData: { id: number, domain: string, admin_domain: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cascade-update`, domainData).pipe(timeout(10000));
  }

  deleteDomain(id: number): Observable<any> {
    // Placeholder for now, backend just has an empty endpoint
    return this.http.post<any>(`${this.apiUrl}/delete`, { id }).pipe(timeout(10000));
  }
}
