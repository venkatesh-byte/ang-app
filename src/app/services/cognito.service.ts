import { Injectable } from '@angular/core';
import Amplify, { Auth } from 'aws-amplify';
import { environment } from '../../environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  constructor() {
    Amplify.configure({
      Auth: environment.cognito
    })
  }

  public signUp(user: User): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
      attributes: {
        email: user.email,
        given_name: user.firstName,
        family_name: user.lastName
      }
    })
  }

  public confirm(user: User): Promise<any> {
    return Auth.confirmSignUp(user.email,user.code)
  }

  public signIn(user: User): Promise<any> {
    return Auth.signIn(user.email, user.password);
  }
  public signOut(): Promise<any> {
    return Auth.signOut();
  }
  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }
  public forgotPassword(user: User): Promise<any> {
    return Auth.forgotPassword(user.email);
  }

  public forgotPasswordSubmit(user: User, new_password:string): Promise<any> {
    return Auth.forgotPasswordSubmit(user.email, user.code, new_password);
  }
}
