import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component'
import { SidenavComponent } from './nagivation/sidenav.component';
import { AppComponent } from './app.component';
import { ProfileComponent } from './app/profile.component';
// import { SidenavComponent } from './sidenav/sidenav.component';


// children: [
//   {path: '', component: LoginUserComponent},
//   {path: 'login', component: LoginUserComponent},
//   {path: 'forgot', component: ResetPasswordComponent}
// ]


const routes: Routes = [
  { path: '', component: SidenavComponent, children:  [
        { path: 'login', component: LoginComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'message', component: LoginComponent },
        { path: 'logout', component: LoginComponent },
    ] }

    // {
  //   path: '**',
  //   redirectTo: 'home'
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
