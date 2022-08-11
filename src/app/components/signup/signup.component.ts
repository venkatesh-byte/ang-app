import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { CognitoService } from '../../services/cognito.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user: User | undefined;
  isConfirm: boolean = false;
  alertMessage: string = '';
  showAlert: boolean = false;

  constructor(private router: Router, private cognito: CognitoService) {
    this.user = {} as User;
    this.isConfirm = false;
  }

  public signUp() {
    if (this.user && this.user.email && this.user.password) {
      this.cognito.signUp(this.user).then(
        () => {
          this.isConfirm = true;
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
  public confirm() {
    if (this.user) {
      this.cognito.confirm(this.user).then(
        () => { this.router.navigate(["/sign-in"]); }).
        catch((err: any) => {
          this.displayError(err.message);
        }
        );
    } else {
      this.displayError("Missing User information");
    }
  }
  ngOnInit(): void {
  }

  private displayError(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
  }


}
