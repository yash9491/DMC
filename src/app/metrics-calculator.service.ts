import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetricsCalculatorService {

  constructor(private http: HttpClient) { }

  public getMetrics(): Observable<any> {
    return this.http.get<any>("http://127.0.0.1:5000/api/getMetrics");
  }

  public postProjectDetails(data): Observable<any> {
    return this.http.post("http://127.0.0.1:5000/api/addProjectDetails", data, { responseType: 'text' });
  }

  public getMetricValues(UUID): Observable<any> {
    return this.http.get<any>("http://127.0.0.1:5000/api/getMetricValues", {
      params: {
        projectUUID: UUID
      },
    });
  }

  public updateMetricValues(data, UUID): Observable<any> {
    return this.http.post("http://127.0.0.1:5000/api/updateMetricValues", data, {
      responseType: 'text',
      params: {
        projectUUID: UUID
      },
    });
  }

  public getCalculatedProjects(): Observable<any> {
    return this.http.get<any>("http://127.0.0.1:5000/api/getCalculatedProjects");
  }

  public deleteProject(UUID):Observable<any>{
    return this.http.delete("http://127.0.0.1:5000/api/deleteProject",{
      params:{
        projectUUID: UUID
      }
    })
  }
}
