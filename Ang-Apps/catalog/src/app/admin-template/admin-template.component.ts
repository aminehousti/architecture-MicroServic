import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit {

  constructor(public authServ:AuthenticationService,private route:Router) { }

  ngOnInit(): void {
  }

  handleLogout() {
    this.authServ.logout().subscribe(
      {
        next:(data)=>{
          this.route.navigateByUrl("/login");
        }
      }
    )
  }
}
