import { Injectable } from '@angular/core';
import { INote } from '../modules/section/note/note.interface';
import { Observable, of } from 'rxjs';
import { ISection } from '../modules/section/section/section.interface';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Сервис для обмена данными между секциями и заметками.
 */
export class DataService {
  private sections: ISection[] = [];
  private sectionId = 0;
  private noteId = 0;
  /**
   * Сортировка Шелла для заметок.
   * Суть алгоритма: https://en.wikipedia.org/wiki/Shellsort
   * @param array массив заметок
   * @param earlier флаг для сортировки по возрастанию или убыванию
   */
  private ShellSort(array: INote[], earlier: boolean): INote[] {
    const n = array.length;
    let i = Math.floor(n / 2);
    while (i > 0) {
      for (let j = 0; j < n; j++) {
        let k = j;
        const t = array[j];
        if (earlier) {
          while (k >= i && array[k - i].noteCreationDate < t.noteCreationDate) {
            array[k] = array[k - i]; k -= i;
          }
        }
        else {
          while ((k >= i) && array[k - i].noteCreationDate > t.noteCreationDate) {
            array[k] = array[k - i]; k -= i;
          }
        }
        array[k] = t;
      }
      i = (i === 2) ? 1 : Math.floor(i * 5 / 11);
    }
    return array;
  }
  saveStateOfAppInLocalSt(): void {
    localStorage.setItem('sections', JSON.stringify(this.sections));
    localStorage.setItem('sectionId', String(this.sectionId));
    localStorage.setItem('noteId', String(this.noteId));
  }
  private fixDateOfNotes(section: ISection): void {
    section.notes.map(note => {
      note.noteCreationDate = new Date(Date.parse(String(note.noteCreationDate)));
    });
  }
  private getStateFromLocalSt(): void {
    if (localStorage.getItem('sections')) {
      this.sections = JSON.parse(localStorage.getItem('sections'));
      this.sections.map(this.fixDateOfNotes);
      this.noteId = +localStorage.getItem('noteID');
      this.sectionId = +localStorage.getItem('sectionId');
    }
  }
  constructor(private activateRoute: ActivatedRoute) { 
      this.getStateFromLocalSt();
  }
  getSections(): Observable<ISection[]> {
    return of(this.sections);
  }
  addSection(section: ISection): void {
    this.sections.push(section);
    this.saveStateOfAppInLocalSt();
  }
  getFreeSectionId(): number {
    console.log(this.sectionId);
    console.log(this.sectionId);
    return this.sectionId++;
  }
  getNote(sectionId: number, noteId: number): INote {
    const section: ISection = this.getSectionById(sectionId);
    return section.notes.find(note => note.id === noteId);

  }
  addNoteBySectionId(sectionId: number, note: INote): void {
    const index = this.sections.findIndex(section => section.id == sectionId);
    note.id = this.noteId++;
    this.sections[index].notes.push(note);
    this.saveStateOfAppInLocalSt();
  }
  getSectionById(id: number): ISection {
    return this.sections.find(section => section.id === id);
  }
  deleteNote(sectionId: number, noteId: number): void {
    const section: ISection = this.sections.find(section => section.id == sectionId);
    const indexOfDeletingNote: number = section.notes.findIndex(note => note.id == noteId);
    section.notes.splice(indexOfDeletingNote, 1);
    this.saveStateOfAppInLocalSt();
  }
  deleteSectionById(sectionId: number): void {
    const index = this.sections.findIndex(section => section.id == sectionId);
    this.sections.splice(index, 1);
    this.saveStateOfAppInLocalSt();
  }
  editSection(id: number, section: ISection): void {
    const index = this.sections.findIndex(section => section.id == id);
    this.sections[index] = section;
    this.saveStateOfAppInLocalSt();
  }
  /**
   * Фильтрация заметок по четным и нечетным числам месяца.
   */
  notesFiltration(section: ISection): ISection {
    let tempSection: ISection = { ...section };
    let subscription: Subscription;
    subscription = this.activateRoute.params.subscribe(params => console.log(params['filterType']));
    subscription.unsubscribe();
    console.log(tempSection);
    switch (tempSection.filtrationType) {
      case 'even':
        tempSection.notes = tempSection.notes.filter(note =>
          note.noteCreationDate.getDay() % 2 == 1);
        tempSection.filtrationType = 'none';
        return tempSection;
      case 'odd':
        tempSection.notes = tempSection.notes.filter(note =>
          note.noteCreationDate.getDay() % 2 != 1);
        tempSection.filtrationType = 'none';
        return tempSection;
      case 'none':
        tempSection = this.getSectionById(tempSection.id);
        return tempSection;
    }
  }
  notesSorting(section: ISection, earlier: boolean): ISection {
    const tempSection: ISection = { ...section };
    tempSection.notes = this.ShellSort(tempSection.notes, earlier);
    return tempSection;
  }
  editNote(note: INote): void {
    let tempNote = this.getNote(note.sectionId, note.id);
    tempNote = note;
  }
}