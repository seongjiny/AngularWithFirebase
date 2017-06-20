import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-moench',
  templateUrl: './moench.component.html',
  styleUrls: ['./moench.component.scss']
})
export class MoenchComponent implements OnInit, OnDestroy {
  message: string = "Welcome to Moench";
  imageUrl = '../assets/images/moench100.png';
  constructor(private route: ActivatedRoute) { 

  }

  ngOnInit() {
    document.getElementById('moench-btn').classList.add("active");
    this.route.params.subscribe( (routeParams: Params) => {
      const floor = routeParams["floor"];
      this.message = `Moench ${floor}`;
      this.imageUrl = `../assets/images/moench${floor}.png`;
     });
     
  }
  ngOnDestroy () {
    document.getElementById('moench-btn').classList.remove("active");
  }

}
