import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule, MatFormFieldModule,
  MatGridListModule, MatIcon,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule, MatNavList,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule, MatSidenavContainer, MatSidenavContent,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule, MatSortModule,
  MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule,
} from '@angular/material';
import { A11yModule } from '@angular/cdk/a11y';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { LoginComponent } from './auth/login/login.component';
import { SidenavComponent } from './nagivation/sidenav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './app/components/profile/profile.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { ResetPasswordComponent } from './auth/login/reset-password.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database-deprecated';
import { environment } from '../environments/environment';
import * as firebase from 'firebase';
import { AuthGuard } from './auth/guards/auth.guard';
import { PostComponent } from './app/posts/post.component';
import { TeamsComponent } from './app/components/teams/teams.component';
import { ManageComponent } from './app/components/manage/manage.component';
import { PlayerDialogComponent } from './app/components/manage/player-dialog/player-dialog.component';
import { TeamDialogComponent } from './app/components/manage/team-dialog/team-dialog.component';
import { DeleteTeamDialogComponent } from './app/components/manage/delete-team-dialog/delete-team-dialog.component';
import { DeletePlayerDialogComponent } from './app/components/manage/delete-player-dialog/delete-player-dialog.component';
import { ConfirmationDialogComponent } from './app/components/confirmation-dialog/confirmation-dialog.component';

const MATERIAL_MODULES = [
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatIconModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatStepperModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  PortalModule,
  ScrollingModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  FormsModule,
  MatFormFieldModule,
  ReactiveFormsModule
];

firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  imports: [
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MATERIAL_MODULES,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgxAuthFirebaseUIModule.forRoot(environment.firebaseConfig,
      null, environment.config)
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    ProfileComponent,
    ResetPasswordComponent,
    PostComponent,
    TeamsComponent,
    ProfileComponent,
    ManageComponent,
    PlayerDialogComponent,
    TeamDialogComponent,
    DeleteTeamDialogComponent,
    DeletePlayerDialogComponent,
    ConfirmationDialogComponent
  ],
  providers: [
    AngularFireAuth,
    AuthGuard
  ],
  entryComponents: [
    PlayerDialogComponent,
    TeamDialogComponent,
    DeleteTeamDialogComponent,
    DeletePlayerDialogComponent,
    ConfirmationDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
