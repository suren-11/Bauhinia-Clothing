import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  data = localStorage.getItem("logger");
  name="";
  role="";

  constructor(private router:Router){}

  ngOnInit(): void {
      this.setLoggerDetails();
  }

  logout(){
    this.router.navigateByUrl("/staffLogin");
  }

  setLoggerDetails(){
    if(this.data!=null){
      var logger = JSON.parse(this.data);
      this.name = logger.firstName+" "+logger.lastName;
      this.role = logger.role;
    }
    
  }

}
