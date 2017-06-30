import { trigger, state, style, transition, animate } from '@angular/animations';
import { Password } from 'app/modules/password.module';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-password-display-card',
  templateUrl: './password-display-card.component.html',
  styleUrls: ['../shared/common.scss','./password-display-card.component.scss'],
  animations: [
    trigger('showPassword', [
      state('collapsed', style({
        height:0,
      })),
      state('expanded', style({})),
      // transition('collapsed <=> expanded', animate('.3s'))
      transition('* => *', animate('.3s'))
    ]),
  ],
})
export class PasswordDisplayCardComponent implements OnInit {
  @Input() password: Password;
  isExpanded = false;

  get showPasswordState(): string {
    return this.isExpanded ? 'expanded' : 'collapsed';
  }

  constructor() { }

  ngOnInit() {
  }

}
