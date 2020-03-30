import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EscapeStageComponent } from './escape-stage/escape-stage.component';
import { EscapeComponent } from './escape/escape.component';
import { IntroComponent } from './intro/intro.component';

@NgModule({
  declarations: [EscapeStageComponent, EscapeComponent, IntroComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class EscapeModule { }
