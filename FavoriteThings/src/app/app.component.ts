import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Favorite Things!';
  favoriteColor = 'pink';

  setColor(selectedColor: string): void {
    this.favoriteColor = selectedColor
    console.log('You selected the color ' + selectedColor);
  }

  updateColor(): void {
    console.log('You selected update');
  }
}
