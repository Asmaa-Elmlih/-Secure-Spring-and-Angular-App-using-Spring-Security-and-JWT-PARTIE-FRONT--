import { Injectable } from '@angular/core';
import { InterfaceCustomers } from '../list-customers/list-customers.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private baseUrl = "http://localhost:8080/"

  constructor(private http:HttpClient) { }


 getAll(){
    return this.http.get<InterfaceCustomers[]>(`${this.baseUrl}`+'customers');
  }
 
  getById(id:any){
    return this.http.get<InterfaceCustomers>(`${this.baseUrl}`+'customers/'+`${id}`)
  }
  add(customers:InterfaceCustomers){
    
    return this.http.post<InterfaceCustomers>(`${this.baseUrl}`+'customers',customers);
  }
  update(id:any,customers:InterfaceCustomers){
    return this.http.put<InterfaceCustomers>(`${this.baseUrl}`+'customers/'+`${id}`,customers)
  }
  delete(id:any){
    return this.http.delete<InterfaceCustomers>(`${this.baseUrl}`+'customers/'+`${id}`)
  }
}