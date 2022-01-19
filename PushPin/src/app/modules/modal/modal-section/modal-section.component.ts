import { Component, OnInit, OnDestroy } from '@angular/core';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ISection } from '../../../modules/section/section/section.interface';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-section',
  templateUrl: './modal-section.component.html',
  styleUrls: ['./modal-section.component.scss']
})
/**
 * Класс компонента модального окна, для создания секции
 */
export class ModalSectionComponent implements OnInit, OnDestroy {
  sectionForm: FormGroup;
  noteForm: FormGroup;
  faWindowClose = faWindowClose;
  title: string;
  private querySubscription: Subscription;
  constructor(
    private formBuilder: FormBuilder, private service: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.querySubscription = route.queryParams.subscribe();
    // заполняем поля формы значениями по умолчанию, чтобы пользователь понял что от него требуют
    this.sectionForm = formBuilder.group({
      sectionHeader: ['Название секции', [Validators.required]],
      sectionColor: ['#add19a', [Validators.required]]
    });
    this.title = 'Создание секции';
  }
  closeModalWindow(): void {
    this.router.navigate(['/']);
  }
  addSection(): void {
    const section: ISection = {
      sectionTitle: this.sectionForm.value.sectionHeader,
      notes: [],
      id: this.service.getFreeSectionId(),
      color: this.sectionForm.value.sectionColor,
      filtrationType: 'none',
      sortingType: 'none'
    };
    this.service.addSection(section);
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    // отписываемся от Observable чтобы не произошло учетчки памяти
    this.querySubscription.unsubscribe();
  }

}

