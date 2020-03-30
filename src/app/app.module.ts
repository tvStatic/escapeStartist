import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EscapeModule } from './escape/escape.module';
import { EditModule } from './edit/edit.module';
import { ClueComponent } from './core/clue/clue.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    EscapeModule,
    EditModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
