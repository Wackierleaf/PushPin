import { Component, OnInit, OnDestroy } from '@angular/core';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { INote } from '../../../modules/section/note/note.interface';
@Component({
  selector: 'app-modal-note',
  templateUrl: './modal-note.component.html',
  styleUrls: ['./modal-note.component.scss']
})
/**
 * Класс компонента модального окна, для создания заметки
 */
export class ModalNoteComponent implements OnInit, OnDestroy {

  noteForm: FormGroup;
  faWindowClose = faWindowClose;
  sectionId: number;
  title: string;
  private querySubscription: Subscription;
  constructor(
    private formBuilder: FormBuilder, private service: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        this.sectionId = queryParam.sectionId;
      }
    );
    // заполняем поля формы значениями по умолчанию, чтобы пользователь понял что от него требуют
    this.noteForm = formBuilder.group({
      noteHeader: ['Введите название', [Validators.required]],
      noteContent: ['Напишите текст заметки'],
    });
    this.title = 'Создание заметки';
  }
  closeModalWindow(): void {
    this.router.navigate(['/']);
  }
  addNewNote(): void {
    const fullDate = new Date();
    const note: INote = {
      noteHeader: this.noteForm.value.noteHeader,
      noteCreationDate: fullDate,
      noteContent: this.noteForm.value.noteContent,
      id: 0,
      sectionId: this.sectionId
    };
    this.service.addNoteBySectionId(this.sectionId, note);
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    // отписываемся от Observable чтобы не произошло учетчки памяти
    this.querySubscription.unsubscribe();
  }
}
