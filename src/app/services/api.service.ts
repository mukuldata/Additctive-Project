import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpEvent,HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl:string="http://localhost:3000/";
  private otherUrl:string="http://localhost:3000";
  private headers=new HttpHeaders().set('Content-Type','application/json')
 constructor(private http :HttpClient) { }
 postUser(data:any){
//   return this.http.post<any>("http://localhost:3000/users",data)
//   .pipe(map((res:any)=>{
//        return res;
//   }))
  return this.http.post<any>(this.baseUrl,data,{headers:this.headers})
 }

 getUser(){
//   return this.http.get<any>("http://localhost:3000/users")
//   .pipe(map((res:any)=>{
//        return res;
//   }))
   return this.http.get<any>(this.baseUrl,{headers:this.headers})
 }

  deleteUser(id:any){
//      return this.http.delete<any>("http://localhost:3000/users/"+id)
//      .pipe(map((res:any)=>{
//           return res;
//      }))
//     }
    return this.http.delete<any>(this.baseUrl+id,{headers:this.headers})
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.otherUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.otherUrl}/files`);
  }

  download(id:any): Observable<any> {
    return this.http.get(`${this.otherUrl}/files/`+id);
  }

}
