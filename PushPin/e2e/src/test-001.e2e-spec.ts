import { SectionPage } from './page-objects/section.po';

describe('Добавление секции:', () => {
    const page: SectionPage = new SectionPage();
    beforeAll(async () => {
        await page.navigateTo();
    });
    it('Отображение модального окна', async () => {
        await page.getModalOpenBtn().click();
        expect(page.getModalForSectionComponent()?.isPresent()).toBeTruthy(
            'Отсутсвие компонента модального окна типа секция'
        );
    });
    it('Отображение всех нужных кнопок и полей ввода', async () => {
        expect(page.getInputForSectionColor()?.isPresent()).toBeTruthy(
            'поле для ввода цвета не отображается'
        );
        expect(page.getInputForSectionTitle()?.isPresent()).toBeTruthy(
            'поле ввода для заголовка секции не отображается'
        );
        expect(page.getModalCloseBtn()?.isPresent()).toBeTruthy(
            'кнопка закрытия модального окна не отображается'
        );
        expect(page.getModalFormSubmit()?.isPresent()).toBeTruthy(
            'кнопка отправки формы не отображается'
        );
    });
    it('Заполнение полей модального окна', async () => {
        await page.inputSectionTitle('Введите название секции');
        expect(page.getValueOfSectionHeader()).toEqual(
            'Введите название секции', 'Введённое название секции не соответствует заданному');
    });
})