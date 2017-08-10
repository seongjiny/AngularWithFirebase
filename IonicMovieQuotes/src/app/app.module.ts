import { AngularFireModule } from 'angularfire2';
import { ListPageModule } from './../pages/list/list.module';
import { QuoteDetailPageModule } from './../pages/quote-detail/quote-detail.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
export const firebaseConfig = {
  apiKey: "AIzaSyBDZiq39W1iH8zl1bH2I1ORXVT8Ns2EIPw",
  authDomain: "yoons1-movie-quotes.firebaseapp.com",
  databaseURL: "https://yoons1-movie-quotes.firebaseio.com",
  projectId: "yoons1-movie-quotes",
  storageBucket: "yoons1-movie-quotes.appspot.com",
  messagingSenderId: "305202011600"
}


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    QuoteDetailPageModule,
    ListPageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
