import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { AngularFireModule } from 'angularfire2';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { HomeComponent } from './home/home.component';
import { todoReducer } from './reducers/todos';
import { FirebaseDataService } from './firebase-data.service';
import { MainEffects } from './effects/main-effects';
import { firebaseConfig } from '../assets/firebase-config'; //excluded from Github


@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule.forRoot(),
    MaterialModule.forRoot(),
    StoreModule.provideStore({ todos: todoReducer }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'todo', component: TodoComponent }
    ]),
    AngularFireModule.initializeApp(firebaseConfig),
    EffectsModule.run(MainEffects)
  ],
  providers: [FirebaseDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
