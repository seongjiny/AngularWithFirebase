import { Component } from '@angular/core';

interface MovieQuote {
  movie: string;
  quote: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  movieQuote: any = {
    'quote': '',
    'movie': ''
  }
  
  moviequotes: MovieQuote[] = [
    { "movie": "Rocky", "quote": "Yo Adrian" },
    { "movie": "Terminator", "quote": "I'll be back" },
    { "movie": "Titanic", "quote": "I'm the king of the world!" },
    { "movie": "The Princess Bride", "quote": "Hello. My name is Inigo Montoya. You killed my father. Prepare to die." }];
  
  onSubmit(): void {
    console.log("clicked, ",this.movieQuote);
  }
}
