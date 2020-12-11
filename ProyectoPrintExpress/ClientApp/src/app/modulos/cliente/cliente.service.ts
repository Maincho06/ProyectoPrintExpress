import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private myUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.myUrl = baseUrl + 'api/Cliente/';
  }

  getAllCliente() {
    const url = this.myUrl;
    return this.http.get(url).toPromise();
  }
}
