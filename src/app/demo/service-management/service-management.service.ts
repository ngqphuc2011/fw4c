import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceRequest, ServiceResponse } from './service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceManagementService {

  public totalRecords: number = 0;
  public item = [];
  public apiUrl = 'http://192.168.110.112:8001/services'
  public header = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) {

  }

  public getData(request: ServiceRequest): Observable<ServiceResponse> {
    return this.http.get(this.apiUrl).pipe(map((res: any) => {
      var response = ({
        status: true,
        totalRecords: res.data.length,
        items: res.data
      });
      return response;
    }));
  }

  public deleteData(id) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  public updateData(id, body) {
    return this.http.put(this.apiUrl + '/' + id, body, )
  }
}
