import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from '../../services/cognito.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private cognito: CognitoService) { }

  ngOnInit(): void {
    this.getUserInfo();
  }
  getUserInfo(): void {
    this.cognito.getUser().then(
      (user) => { console.log(user)}
    ).catch(
    () => this.router.navigate(["/sign-in"])
    );
  }
  signOutCognito(): void {
    this.cognito.signOut().then(
      () => this.router.navigate(["/sign-in"])
    );
  }

}
