import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component'
import { SidenavComponent } from './nagivation/sidenav.component';
import { ProfileComponent } from './app/components/profile/profile.component';
import { ResetPasswordComponent } from './auth/login/reset-password.component';
import { TeamsComponent } from './app/components/teams/teams.component';
import { ManageComponent } from './app/components/manage/manage.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { HistoryComponent } from './app/components/history/history.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', redirectTo: 'login'},
  { path: 'reset-account', component: ResetPasswordComponent },
  { path: '', component: SidenavComponent, canActivate: [AuthGuard] , children:  [
        { path: 'profile', component: ProfileComponent },
        { path: 'teams', component: TeamsComponent },
        { path: 'manage', component: ManageComponent },
        { path: 'history', component: HistoryComponent },
    ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
