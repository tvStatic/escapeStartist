import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClueComponent } from './clue/clue.component';

@NgModule({
  declarations: [ClueComponent],
  imports: [
    CommonModule
  ],
  exports: [ClueComponent]
})
export class CoreModule { }
