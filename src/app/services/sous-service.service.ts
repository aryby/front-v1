import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SousService } from 'app/classes/sous-service';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/SousService';
// const baseUrl = 'http://localhost:8080/SousService/service';

@Injectable({
  providedIn: 'root'
})
export class SousServiceService {

  
 
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<SousService[]>(`${baseUrl}`);
  }

  
  getByServiceId(id_service) : Observable<SousService[]>{
   return this.http.get<SousService[]>(`${baseUrl}/${id_service}`);
  }
  
  get(id) { 

    console.log("id");
    console.log(`${baseUrl}/${id}`);
    
    return this.http.get<SousService[]>(`${baseUrl}/${id}`);
  }

  getFromService(id){
    return this.http.get<SousService[]>(`${baseUrl}/service/${id}`);
  }


  create(data: SousService) {
    
    return this.http.post<SousService>(baseUrl, data);
  }
  update(id, data: SousService) {
    return this.http.put<SousService>(`${baseUrl}/${id}`, data);
  }
  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll() {
    return this.http.delete(baseUrl);
  }
}
