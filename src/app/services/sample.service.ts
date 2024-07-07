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

    let queryParams = new HttpParams();

    // console.log(sessionStorage.getItem("User Name"))

    let value: any = sessionStorage.getItem("User Name")
    let token: any = sessionStorage.getItem("Panel Token")

    // console.log(value,token)

    queryParams = queryParams.set("userName",value)
    queryParams = queryParams.set("token",token)

    // console.log(queryParams)

    return this.http.get<any>(this.baseURL+"panel",{params:queryParams})
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
