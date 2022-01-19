import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../../../services/data.service';
import { INote } from './note.interface';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
/**
 * Класс для компонента заметки.
 */
export class NoteComponent implements OnInit {
  /*получаем Id секции и Id заметки чтобы при инициализации получить
    конкретную заметку из конкретной секции*/
  @Input() sectionId: number;
  @Input() noteId: number;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  note: INote;
  noteForm: FormGroup;
  isEdit = false;
  constructor(private service: DataService, private formBuilder: FormBuilder) { }
  deleteNote(): void {
    this.service.deleteNote(this.note.sectionId, this.note.id);
  }
  editNote(): void {
    this.note.noteHeader = this.noteForm.value.noteHeader;
    this.note.noteContent = this.noteForm.value.noteContent;
    this.note.noteCreationDate = new Date(this.noteForm.value.noteCreationDate);
    this.service.editNote(this.note);
    this.isEdit = false;
  }
  ngOnInit(): void {
    this.note = this.service.getNote(this.sectionId, this.noteId);
    // преобразуем время в формат ISO строки, чтобы потом заполнить поле поумолчанию в форме редактирования заметки
    let str: string = this.note.noteCreationDate.toISOString();
    /*тк при преобразовании к iso строке время становится utc+0 то нам нужно убрать последние 13 симоволов
    чтобы заменить их на время локального часового пояса.*/
    str = str.substring(0, str.length - 13);
    // замена на локальное время
    str = str + this.note.noteCreationDate.toLocaleString('ru', { hour: 'numeric', minute: 'numeric' });
    this.noteForm = this.formBuilder.group({
      noteHeader: [this.note.noteHeader, [Validators.required]],
      noteContent: [this.note.noteContent],
      noteCreationDate: [str],
    });
  }
}

