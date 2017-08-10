import { QuoteDetailPage } from './../quote-detail/quote-detail';
import { MovieQuote } from './../../models/movie-quote';
import { FirebaseListObservable } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  public movieQuoteStream: FirebaseListObservable<MovieQuote[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase,
    private alertCtrl: AlertController
  ) {
    this.movieQuoteStream = this.db.list("/quotes");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  removeQuote(keyToDelete: string):void {
    this.movieQuoteStream.remove(keyToDelete)
  }

  pushDetailView(movieQuote:MovieQuote): void {
    this.navCtrl.push(QuoteDetailPage, {key:movieQuote.$key});
  }

  showAddQuoteDialog() {
    const prompt = this.alertCtrl.create({
      title: 'Add Quote',
      inputs: [
        {
          name: 'quote',
          placeholder: 'Quote that you like'
        },
        {
          name: 'movie',
          placeholder: 'From movie'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (data) => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add Quote',
          handler: (data) => {
            console.log('Saved clicked');
            if (data.quote && data.movie) {
              this.movieQuoteStream.push(data);
            } else {
              console.log("Not a valid MovieQuote");
              return false;
            }
          }
        }
      ]
    });
    prompt.present();
  }
}
