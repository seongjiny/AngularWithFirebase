import { BouncedComponent } from './+bounced/bounced.component';
import { NotFoundComponent } from './+not-found/not-found.component';
import { MathComponent } from './+math/math.component';
import { MathGuard } from './services/math.guard';
import { MainComponent } from './+main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: MainComponent },
  { path: 'math/:number/:number2', component: MathComponent, canActivate: [MathGuard] },
  { path: 'math/:number', component: MathComponent, canActivate: [MathGuard] },
  { path: 'bounced', pathMatch: 'full', component: BouncedComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
