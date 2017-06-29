import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';

interface Acronym {
  abbr: string;
  name: string;
  $key?: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  readonly acronymPath = 'acronym';
  formAcronym: Acronym = {
    'abbr':'',
    'name':'',
  }
  acronymStream:FirebaseListObservable<Acronym[]>;
  constructor(db: AngularFireDatabase) { 
    this.acronymStream = db.list(this.acronymPath);
  }

  ngOnInit() {

  }

  onSubmit(): void {
      
    this.acronymStream.push(this.formAcronym);
    this.formAcronym = {
      'abbr': '',
      'name': ''
    }
  }
    delete(key: string): void {
    this.acronymStream.remove(key);
  }
}
