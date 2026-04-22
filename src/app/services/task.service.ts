import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8002/api/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/');
  }

  // 添加 CORS 支持
  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/`);
  }

  createTask(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/', data);
  }

  updateTask(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/`, data);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}/`);
  }

  getStats(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/stats/');
  }

  filterTasks(status?: string, priority?: string): Observable<any[]> {
    let url = this.apiUrl + '/filter/';
    if (status) url += `?status=${status}`;
    if (priority) url += `${status ? '&' : '?'}priority=${priority}`;
    return this.http.get<any[]>(url);
  }
}
