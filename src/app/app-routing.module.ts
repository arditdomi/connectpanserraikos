import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavComponent } from './nagivation/sidenav.component';
import { ProfileComponent } from './app/profile.component';
import { AppAuthGuard } from './app.authguard';

const routes: Routes = [
  {
    path: '', component: SidenavComponent, children:
      [
        {
          path: 'profile',
          component: ProfileComponent,
          canActivate: [AppAuthGuard]
        },
        {
          path: 'message',
          component: ProfileComponent,
          canActivate: [AppAuthGuard]
        },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule { }
