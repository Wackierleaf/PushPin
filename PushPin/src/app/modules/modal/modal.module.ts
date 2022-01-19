import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSectionComponent } from './modal-section/modal-section.component';
import { ModalNoteComponent } from './modal-note/modal-note.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [ModalSectionComponent, ModalNoteComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ru'
    })
  ],
  exports: [
    ModalSectionComponent,
    ModalNoteComponent
  ]
})
export class ModalModule { }
