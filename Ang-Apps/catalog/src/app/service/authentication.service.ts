import { Injectable } from '@angular/core';
import {AppUser} from "../model/user.model";
import {UUID} from "angular2-uuid";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  users: AppUser[] = []
  authenticatedUser:AppUser|undefined
  constructor() {
    this.users.push({userId: UUID.UUID(), userName: "user1", password: "1234", roles: ["USER"]},
      {userId: UUID.UUID(), userName: "user2", password: "12345", roles: ["USER"]},
      {userId: UUID.UUID(), userName: "admin", password: "admin", roles: ["USER", "ADMIN"]},
    )
  }

  public login(username: string, password: string): Observable<AppUser> {
    let user = this.users.find(u => u.userName == username);
    if (!user) return throwError(() => new Error("user not found"));
    if (user.password != password) return throwError(() => new Error("MDP incorrect"));
    return of(user);
  }
  public authenticated(appUser:AppUser):Observable<boolean>{
    this.authenticatedUser=appUser;
    localStorage.setItem("AuthUser",JSON.stringify({username:appUser.userName,roles:appUser.roles,jwt:"JWT_TOKEN"}))
    return of(true);
  }
  public hasRole(role:string):boolean{
    return this.authenticatedUser!.roles.includes(role);
  }
  public isAuthenticated(){
    return this.authenticatedUser!=undefined;
  }
  public logout():Observable<boolean>{
    this.authenticatedUser=undefined;
    localStorage.removeItem("AuthUser");
    return of(true);
  }

}
