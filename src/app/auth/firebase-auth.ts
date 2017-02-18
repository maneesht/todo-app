import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2';
@Injectable()
export class FirebaseAuthService {
    constructor(private auth: AngularFireAuth) {

    }
    getAuth() {
        return this.auth.take(1);
    }
}