import { AuthService } from './../services/auth.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  show = false;
  constructor(public authService: AuthService) { }

  ngOnInit() {

  }

}
