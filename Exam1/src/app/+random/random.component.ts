import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss']
})
export class RandomComponent implements OnInit {
  value: number = 0;
  message: string = `Your random value is ${this.value}.`
  constructor(private route: ActivatedRoute) { }
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
  ngOnInit() {
    document.getElementById('random-btn').classList.add("active");
    this.route.params.subscribe( (routeParams: Params) => {
      const floor = routeParams["floor"];
      this.value = this.getRandomInt(0, floor);
      if(floor == 2) {
        if(this.value) {
          this.message = 'True';
        } else {
          this.message = 'False';
        }
      } else {
        this.message = `Your random value is ${this.value}.`
      }
     });
  }

}
