import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClueSheetComponent } from './clue-sheet/clue-sheet.component';
import { EditComponent } from './edit/edit.component';
import { StageListComponent } from './stage-list/stage-list.component';
import { EditStageComponent } from './edit-stage/edit-stage.component';
import { FormsModule } from '@angular/forms';
import { ClueListComponent } from './clue-list/clue-list.component';
import { EditClueComponent } from './edit-clue/edit-clue.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [ClueSheetComponent, EditComponent, StageListComponent, EditStageComponent, ClueListComponent, EditClueComponent],
  imports: [
    CoreModule,
    CommonModule,
    FormsModule
  ]
})
export class EditModule { }
