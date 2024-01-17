import { Component, OnInit } from '@angular/core';
import { Staff } from '../../customer-registration/model/staff.model';
import { StaffService } from '../../service/staff.service';
import { Router } from '@angular/router';
import { Roles } from '../../customer-registration/model/role.enum';
import { log } from 'console';
import { Location } from '@angular/common';

@Component({
  selector: 'app-staff-registration',
  templateUrl: './staff-registration.component.html',
  styleUrl: './staff-registration.component.css'
})
export class StaffRegistrationComponent implements OnInit {
  staffs: Staff[] = [];
  selectedStaff: Staff;
  roles = ["Staff", "Cheif Accountant", "Inventery Officer", "Production Manager", "Admin"];
  click = false;
  buttonName = "Save";

  staff: Staff = {
    id: 0,
    firstName: "",
    lastName: "",
    address: "",
    role: "",
    phone: "",
    email: "",
    password: ""
  }

  updatingStaff: Staff = {
    id: 0,
    firstName: "",
    lastName: "",
    address: "",
    role: "",
    phone: "",
    email: "",
    password: ""
  }

  constructor(private staffService: StaffService, private router: Router) { }

  ngOnInit(): void {
    this.getStaffLists();
  }

  registerStaff() {

    if (this.buttonName == "Save") {
      this.staffService.addStaff(this.staff).subscribe(() => {
        alert("successfully register");
      }, error => {
        alert("Try again");
      })
    }

    if (this.buttonName == "Update") {
      this.staffService.updateStaff(this.staff.id, this.staff).subscribe(() => {
        alert("Staff Updated");
        location.reload();
      });
    }
  }

  /** staff list get method */
  private getStaffLists() {
    this.staffService.getStaffList().subscribe(data => {
      this.staffs = data;
    })
  }

  getstaff(staff: Staff) {
    this.staff = staff
    this.buttonName = "Update"
  }

  removeStaff(id:number){
    this.staffService.removeStaff(id).subscribe(()=>{
      alert("Staff Deleted");
      location.reload();
    });  
  }

}
