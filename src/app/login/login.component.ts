import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  needsLogin: boolean = true;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().then((authenticated) => {
      this.needsLogin = !authenticated;
    });
  }
  
}
