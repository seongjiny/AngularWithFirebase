import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  message:string = 'Most apps have a sign in page. This is a placeholder for a sign in page.';
  constructor() { }

  ngOnInit() {
  }

}
