import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
    {path: '', component: LoginComponent, data: {title: 'Login'}},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: {title: 'Home'}},
    {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
