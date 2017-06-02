import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';

interface MovieQuote {
  movie: string;
  quote: string;
  $key?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly quotesPath = 'quotes';

  movieQuotesStream: FirebaseListObservable<MovieQuote[]>;
  constructor(db: AngularFireDatabase) {
    this.movieQuotesStream = db.list(this.quotesPath);
  }

  formMovieQuote: MovieQuote = {
    'quote': '',
    'movie': ''
  }
/*  // local only
  movieQuotes: MovieQuote[] = [
    { "movie": "Rocky", "quote": "Yo Adrian" },
    { "movie": "Terminator", "quote": "I'll be back" },
    { "movie": "Titanic", "quote": "I'm the king of the world!" },
    { "movie": "The Princess Bride", "quote": "Hello. My name is Inigo Montoya. You killed my father. Prepare to die." }];
*/
  onSubmit(): void {
    /*local only*/
/*    this.movieQuotes.unshift(this.formMovieQuote);*/
    try {
      this.movieQuotesStream.push(this.formMovieQuote);
      this.formMovieQuote = {
        'quote': '',
        'movie': ''
      }
    } catch (e) {
      console.log("Form error:",e);
    }
  }

}
