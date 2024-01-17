import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Staff } from '../customer-registration/model/staff.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private url = 'http://localhost:8080/api/staff';

  constructor(private http: HttpClient) { }

  login(email:string,password:string):Observable<Staff>{
    return this.http.get<Staff>(`${this.url}/staff/staffLogin/${email},${password}`);
  }

  addStaff(staff: Staff):Observable<void>{
    console.log(staff);
    return this.http.post<void>(`${this.url}/staffRegister`,staff, {responseType:"json"});
   }

  getStaffList():Observable<Staff[]>{
    return this.http.get<Staff[]>(`${this.url}/staff`)
  }

  updateStaff(id:number,staff:Staff){
    return this.http.put(`${this.url}/update/${id}`,staff)
  }

  removeStaff(id:number){
    return this.http.delete(`${this.url}/delete/${id}`);
  }
}
