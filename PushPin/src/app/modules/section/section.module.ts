import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './section/section.component';
import { NoteComponent } from './note/note.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [SectionComponent, NoteComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    DragDropModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ru'
    })
  ],
  exports: [
    SectionComponent,
    NoteComponent,
  ]
})
export class SectionModule { }
