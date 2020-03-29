// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "AIzaSyCf3TIuXdFasdf4fHqkSolmzFv9zzU0tPw",
    authDomain: "connect-panserraikos.firebaseapp.com",
    databaseURL: "https://connect-panserraikos.firebaseio.com",
    projectId: "connect-panserraikos",
    storageBucket: "connect-panserraikos.appspot.com",
    messagingSenderId: "640393862882",
    appId: "1:640393862882:web:0954b6f3208ffe3f5e48bb",
    measurementId: "G-M1XYZC3JP7"
  },
  config: {
  enableFirestoreSync: true, // enable/disable autosync users with firestore
    toastMessageOnAuthSuccess: false, // whether to open/show a snackbar message on auth success - default : true
  toastMessageOnAuthError: false, // whether to open/show a snackbar message on auth error - default : true
  authGuardFallbackURL: '/', // url for unauthenticated users - to use in combination with canActivate feature on a route
  authGuardLoggedInURL: '/loggedin', // url for authenticated users - to use in combination with canActivate feature on a route
  passwordMaxLength: 60, // `min/max` input parameters in components should be within this range.
  passwordMinLength: 8, // Password length min/max in forms independently of each componenet min/max.
  // Same as password but for the name
  nameMaxLength: 50,
  nameMinLength: 2,
  // If set, sign-in/up form is not available until email has been verified.
  // Plus protected routes are still protected even though user is connected.
  guardProtectedRoutesUntilEmailIsVerified: true,
  enableEmailVerification: true, // default: true
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
