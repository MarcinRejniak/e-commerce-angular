import {Component, DOCUMENT, effect, inject} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login-status',
  imports: [],
  templateUrl: './login-status.html',
  styleUrl: './login-status.css',
})
export class LoginStatus {

  private readonly auth = inject(AuthService);
  private readonly doc = inject(DOCUMENT);
  private readonly storage: Storage = sessionStorage;

  protected readonly isAuthenticated = toSignal(this.auth.isAuthenticated$, { initialValue: false });
  protected readonly user = toSignal(this.auth.user$);

  constructor() {
    effect(() => {

      const userEmail = this.user()?.email;

      if (userEmail) {
        this.storage.setItem('userEmail', userEmail);
        console.log('User is authenticated: ', userEmail)
      } else {
        this.storage.removeItem('userEmail');
        console.log('User ID: ', userEmail)
      }
    });
  }

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({
      logoutParams: { returnTo: this.doc.location.origin }
    });
  }
}
