import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { EffectsModule } from '@ngrx/effects';
import { Md2Module }  from 'md2';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { HomeComponent } from './home/home.component';
import { todoReducer } from './reducers/todos';
import { FirebaseDataService } from './firebase-data.service';
import { MainEffects } from './effects/main-effects';
import { firebaseConfig } from '../assets/firebase-config'; //excluded from Github
import { CalendarComponent, AddTodoDialogComponent } from './calendar/calendar.component';
import { AuthGuard } from './guards/auth-guard.service';
import { reducer } from './reducers';
import { calendarReducer } from './reducers/calendar';
import { FirebaseAuthService } from './auth/firebase-auth';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { AddTodoComponent } from './todo/add-todo/add-todo.component';
import { CalendarDayComponent } from './calendar/calendar-day/calendar-day.component';

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
}

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    HomeComponent,
    CalendarComponent,
    AddTodoDialogComponent,
    TodoListComponent,
    AddTodoComponent,
    CalendarDayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule.forRoot(),
    MaterialModule.forRoot(),
    Md2Module.forRoot(),
    StoreModule.provideStore(reducer),
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent},
      { path: 'todo', component: TodoListComponent, canActivate: [AuthGuard] },
      { path: 'calendar', component: CalendarComponent , canActivate: [AuthGuard]},
    ]),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    EffectsModule.run(MainEffects),
  ],
  providers: [FirebaseDataService, AuthGuard, FirebaseAuthService],
  bootstrap: [AppComponent],
  entryComponents: [AddTodoDialogComponent]
})
export class AppModule { }
