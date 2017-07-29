import { SigninComponent } from './+signin/signin.component';
import { MainComponent } from './+main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { PhotoDetailComponent } from "./+photo-detail/photo-detail.component";
const routes: Routes = [
   { path: '', pathMatch: 'full', component: MainComponent, canActivate:[AuthGuard] },
    { path: 'signin', component: SigninComponent },
    { path: 'photo/:photoKey', component: PhotoDetailComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo:'' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
