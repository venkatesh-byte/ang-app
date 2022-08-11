import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { CognitoService } from '../../services/cognito.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  user: User | undefined;
  forgotPassword: boolean = false;
  showAlert: boolean = false;
  alertMessage: string = '';
  new_password: string = '';

  constructor(private router: Router, private cognito: CognitoService) {
    this.user = {} as User;
    this.forgotPassword = false;
  }

  public signIn() {
    if (this.user && this.user.email && this.user.password) {
      this.cognito.signIn(this.user).then(
        () => {
          this.router.navigate(["/"]);
        }
      ).catch(
        (err:any) => {
          this.displayError(err.message);
        }
      );

    } else {
      this.displayError("Missing email and password");
    }
  }
  public forgotPasswordClicked() {
    if (this.user && this.user.email) {
      this.cognito.forgotPassword(this.user).then(
        () => {
          this.forgotPassword = true;
        }
      ).catch(
        (err: any) => {
          this.displayError(err.message);
        }
      );

    } else {
      this.displayError("Missing email and password");
    }
  }
  public submitNew() {
    if (this.user && this.user.code && this.new_password.length>0 ) {
      this.cognito.forgotPassword(this.user).then(
        () => {
          this.displayAlert("Password Updated");
          this.forgotPassword = false;
        }
      ).catch(
        (err: any) => {
          this.displayError(err.message);
        }
      );

    } else {
      this.displayError("Invalid input");
    }
  }
  ngOnInit(): void {
  }

  private displayError(message:string) {
    this.alertMessage = message;
    this.showAlert = true;
  }
  private displayAlert(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
  }
}
