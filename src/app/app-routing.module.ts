import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EscapeComponent } from './escape/escape/escape.component';
import { ClueSheetComponent } from './edit/clue-sheet/clue-sheet.component';
import { EditComponent } from './edit/edit/edit.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  { path: 'escape', component: EscapeComponent },
  { path: 'clues', component: ClueSheetComponent },
  { path: 'edit', component: EditComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/about', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
