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

  getPanelData( userName: String) : Observable<any>{

    let queryParams = new HttpParams();

    let value: any = userName
    let token: any = sessionStorage.getItem("Panel Token")

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

    return this.http.get<any>(this.baseURL+"login",{params: queryParams})
    }

  register(data:any):Observable<any>{

    const headers = new HttpHeaders({
      'content-Type': 'application/json'
    })

    return this.http.post<any>(this.baseURL+"register",data, {headers: headers})
  }

  getAllSlots(startDate:Date, endDate:Date):Observable<any>{

    const startDateInString = startDate.toString()
    const endDateInString = endDate.toString()

    let params = new HttpParams();

    params = params.set("startDate",startDateInString)
    params = params.set("endDate",endDateInString)
    
    return this.http.get<any>(this.baseURL+"getslots",{params: params})
  }

  updateSlots(data:any){
    return this.http.post<any>(this.baseURL+"updateslots",data)
  }

  addSlot(data:any){
    return this.http.post<any>(this.baseURL+"addslot",data)
  }

  getSlotsByPanel(startDate:Date, userName: String){
    const startDateInString = startDate.toString()
    let userNameInString = "";
    if(userName){
      userNameInString = userName.toString()
    }

    let params = new HttpParams();

    params = params.set("startDate",startDateInString)
    params = params.set("userName", userNameInString)

    return this.http.get<any>(this.baseURL+"getslotsbypanel",{params: params})
  }

  getSlotsByPanelandDates(startDate:Date, endDate:Date, userName:String){
    const startDateInString = startDate.toString()
    const endDateInString = endDate.toString()
    let userNameInString = "";
    if(userName){
      userNameInString = userName.toString()
    }
    let params = new HttpParams();

    params = params.set("startDate",startDateInString)
    params = params.set("endDate",endDateInString)
    params = params.set("userName", userNameInString)

    return this.http.get<any>(this.baseURL+"getslotsbypanelanddates",{params: params})
  }


  deleteSlot(id:string){
    return this.http.delete<any>(this.baseURL+"slot/"+id)
  }

  getAllPanels(){
    return this.http.get<any>(this.baseURL+"allpanels")
  }

  filterPanels(data:any){

    let params = new HttpParams()

    for (let item in data){
      params = params.set(item,data[item])
    }
    return this.http.get<any>(this.baseURL+"filterpanel",{params: params})
  }

  uploadFile(file: any){
    const formData = new FormData();
    formData.append("file",file)
    return this.http.post<any>(this.baseURL+"uploadFile",formData)
  }

}
