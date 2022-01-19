import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalNoteComponent } from './modules/modal/modal-note/modal-note.component';
import { ModalSectionComponent } from './modules/modal/modal-section/modal-section.component';
const routes: Routes = [
  { path: 'modal-note', component: ModalNoteComponent },
  { path: 'modal-section', component: ModalSectionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
