import { Password } from 'app/modules/password.module';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-password-display-card',
  templateUrl: './password-display-card.component.html',
  styleUrls: ['../shared/common.scss','./password-display-card.component.scss']
})
export class PasswordDisplayCardComponent implements OnInit {
  @Input() password: Password;
  isExpanded = false;
  
  constructor() { }

  ngOnInit() {
  }

}
