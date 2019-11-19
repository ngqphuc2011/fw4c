import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConsumerResponse, ConsumerRequest } from './consumer.model';

@Injectable({
  providedIn: 'root'
})
export class ConsumerManagementService {
  public totalRecords: number = 0;
  public item = [];
  public apiUrl = 'http://192.168.35.108:8001/consumers'
  public header = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) {
  }

  public readData(request: ConsumerRequest): Observable<ConsumerResponse> {
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
}
