import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import moment = require("moment/moment");

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }
  ngOnInit() {
    if(!this.authService.hayToken()){
      this.router.navigate(['login']);
    }
  }
  }
