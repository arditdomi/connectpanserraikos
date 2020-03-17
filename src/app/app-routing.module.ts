import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component'
import { SidenavComponent } from './nagivation/sidenav.component';
import { ProfileComponent } from './app/components/profile/profile.component';
import { ResetPasswordComponent } from './auth/login/reset-password.component';
import { PostComponent } from './app/posts/post.component';
import { TeamsComponent } from './app/components/teams/teams.component';
import { ManageComponent } from './app/components/manage/manage.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', redirectTo: 'login'},
  { path: 'reset-account', component: ResetPasswordComponent },
  { path: '', component: SidenavComponent, canActivate: [] , children:  [
        { path: 'profile', component: ProfileComponent },
        { path: 'message', component: PostComponent },
        { path: 'teams', component: TeamsComponent },
        { path: 'manage', component: ManageComponent },
    ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
