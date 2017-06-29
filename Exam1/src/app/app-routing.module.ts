import { ListComponent } from 'app/+list/list.component';
import { RandomComponent } from 'app/+random/random.component';
import { SigninComponent } from 'app/+signin/signin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  { path: 'list', component: ListComponent },
  { path: 'random/:floor', component: RandomComponent },
  { path: 'signin', component: SigninComponent },
  { path: '**', redirectTo: 'list' },
  {
    path: '',
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
