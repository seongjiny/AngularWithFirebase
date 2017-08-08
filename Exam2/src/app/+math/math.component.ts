import { MathGuard } from './../services/math.guard';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-math',
  templateUrl: './math.component.html',
  styleUrls: ['./math.component.scss']
})
export class MathComponent implements OnInit {
  top: number;
  bot: number;
  result:number;
  constructor(
    math: MathGuard
  ) {
    this.top = math.top;
    this.bot = math.bot;
    this.result = this.top/this.bot;

  }

  ngOnInit() {

  }


}
