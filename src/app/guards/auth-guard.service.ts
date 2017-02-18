import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFire, AngularFireAuth } from 'angularfire2';

@Injectable ()
export class AuthGuard implements CanActivate {
    constructor (private auth: AngularFireAuth, private router: Router) {
    }
    canActivate() {
        return this.auth.take(1)
            .map((authState) => !!authState)
            .do(authenticated => {
                if(!authenticated) {
                    this.router.navigate(['/home']);
                }
            });
    }
}