import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  email: string;
  password: string;
  displayName: string;
  errorMsg: string;

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  signUp() {
    let email = this.email;
    let password = this.password;
    let displayName = this.displayName;
    this.auth.signUp(email, password, displayName)
    .then(resolve => this.router.navigate(['chat']))
    .catch(error => this.errorMsg = error.message)
  }

}
