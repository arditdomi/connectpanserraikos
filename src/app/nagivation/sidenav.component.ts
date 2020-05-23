import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: [ 'sidenav.component.scss']
})
export class SidenavComponent {

  mobileQuery: MediaQueryList;
  isAdmin = false;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private router: Router,
              private authService: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.isAdmin = this.authService.isAdmin;
  }

  logout() {
    this.authService.logout();
  }

  navigateToTeams() {
    this.router.navigate(['/teams']);
  }

  navigateToManage() {
    this.router.navigate(['/manage']);
  }

  navigateToHistory() {
    this.router.navigate(['/history']);
  }

  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }

}
