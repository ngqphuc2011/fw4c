import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditConsumerService {

  public apiUrl = "http://192.168.35.108:8001/consumers";
  public header = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }
  
  public updateData(id, body) {
    return this.http.put(this.apiUrl + '/' + id, body, this.header);
  }
}
