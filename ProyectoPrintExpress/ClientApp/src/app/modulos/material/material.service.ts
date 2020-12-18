import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {


  private myUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.myUrl = baseUrl + 'api/Material';
  }

  getAllMaterial() {
    const url = this.myUrl;
    return this.http.get(url).toPromise();
  }

}
