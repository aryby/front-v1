import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bricoleur } from 'app/classes/bricoleur';
import { Observable } from 'rxjs';


const baseUrl = 'http://localhost:8080/Bricoleur';

@Injectable({
  providedIn: 'root'
})
export class BricoleurService {

  constructor(private http: HttpClient) { }
  getAll() :Observable<Bricoleur[]>{
    return this.http.get<Bricoleur[]>(`${baseUrl}`);
  }
  get(id) {
    return this.http.get<Bricoleur>(`${baseUrl}/${id}`);
  }
  create(data: Bricoleur) {
    console.log("data create ");
    console.log(data);

    return this.http.post<Bricoleur>(baseUrl, data);
  }
  update(id, data: Bricoleur) {

    return this.http.put<Bricoleur>(`${baseUrl}/${id}`, data);
  }
  delete(id) {
    console.log("`${baseUrl}/${id}`");
    console.log(`${baseUrl}/${id}`);
    
    
    return this.http.delete(`${baseUrl}/${id}`);
  }
  
  deleteAll() {
    return this.http.delete(baseUrl);
  }
  getBricoleurByLogin(data){
    return this.http.post<Bricoleur>(`${baseUrl}/login`, data);
  }

}
