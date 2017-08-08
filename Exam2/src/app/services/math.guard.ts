import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MathGuard implements CanActivate {
  isNumber: boolean;
  isInt: boolean;
  top: number;
  bot: number;

  constructor(
    private router: Router
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot

  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.parseString(state.url));
    if (this.isNumber) {
      if (this.isInt) {
        console.log("math!");
      } else {
        // bounced
        console.log("bounced");
        this.router.navigate(['/bounced']);
      }
    } else {
      this.router.navigate(['/not-found']);
      // not-found
    }
    return true;
  }

  parseString(url) {
    var str = url + "";
    str = str.substring(6, str.length);
    if (str.lastIndexOf('/') == -1) {
      this.isInt = false;
      this.isNumber = false;
      return;
    }
    this.top = +str.substring(0, str.indexOf('/'));
    this.bot = +str.substring(str.indexOf('/') + 1, str.length);
    console.log("top:", this.top);
    console.log("bot:", this.bot);
    this.isInt = false;
    if ((this.top || this.top == 0) && this.bot) {
      this.isNumber = true;
      if ((this.top / this.bot) % 1 == 0) {
        this.isInt = true;
      }
    } else {
      this.isNumber = false;
    }
  }
}
