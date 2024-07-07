import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SampleService {

  baseURL= "http://localhost:3000/"

  constructor(private http:HttpClient) {

   }

  getPanelData() : Observable<any>{
    return this.http.get<any>(this.baseURL+"panel")
  }

  signIn(data:any):Observable<any>{

    let queryParams= new HttpParams();

    Object.keys(data).forEach((key)=>{
      queryParams = queryParams.set(key,data[key])
    })

    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });
    return this.http.get<any>(this.baseURL+"login",{params: queryParams})
    }

}
