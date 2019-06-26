import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetricsCalculatorService {

  constructor(private http: HttpClient) { }

  public getMetrics(): Observable<any>{
    return this.http.get<any>("http://127.0.0.1:5000/api/getMetrics");
  }

  public postProjectDetails(data): Observable<any>{
    return this.http.post("http://127.0.0.1:5000/api/addProjectDetails",data);
  }
}
