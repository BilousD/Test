import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { TaskComponent } from './task.component';
import { StopwatchComponent } from './stopwatch.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TaskComponent,
    StopwatchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
