import { INote } from '../note/note.interface';
export interface ISection {
    id: number;
    sectionTitle: string;
    notes: INote[];
    color: string;
    filtrationType: string;
    sortingType: string;
}
