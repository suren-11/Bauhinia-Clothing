import { Component } from '@angular/core';

import { Staff } from '../../customer-registration/model/staff.model';
import { StaffService } from '../../service/staff.service';
import { Router } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrl: './staff-login.component.css'
})
export class StaffLoginComponent {
  email = "";
  password = "";

  staff:Staff;
  errors:boolean = false;

  constructor(private staffService: StaffService, private router: Router){}

  onSubmit(){
    this.staffService.login(this.email,this.password).subscribe(data=>{
      this.staff = data; 
      localStorage.setItem("logger", JSON.stringify(data) )
      this.router.navigateByUrl("/staffDashboard");
    },error =>{
      alert("Wrong Credentials");
    });
  }

}
