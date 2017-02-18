import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseAuthState } from 'angularfire2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private af: AngularFire, private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.af.auth.login().then((auth: FirebaseAuthState) => {
      this.router.navigate(['calendar']);
    })
  }
  logout() {
    this.af.auth.logout();
  }

}
