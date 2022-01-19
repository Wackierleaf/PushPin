import { ElementFinder, browser, by, element } from 'protractor';

export class SectionPage {
    navigateTo(): Promise<unknown> {
        return browser.get(browser.baseUrl) as Promise<unknown>;
    }
    getModalOpenBtn(): ElementFinder {
        return element(by.id('addSection'));
    }
    getModalForSectionComponent(): ElementFinder {
        return element(by.tagName('app-modal-section'));
    }
    getModalCloseBtn(): ElementFinder {
        return element(by.id('modal-section-close-btn'));
    }
    getInputForSectionTitle(): ElementFinder {
        return element(by.name('section-header'));
    }
    getInputForSectionColor(): ElementFinder {
        return element(by.name('section-color'));
    }
    getModalFormSubmit(): ElementFinder {
        return element(by.name('modal-add-section'));
    }
    inputSectionTitle(title: string): void {
        element(by.name('section-header')).clear();
        element(by.name('section-header')).sendKeys(title);
    }
    getValueOfSectionHeader(): any {
        return element(by.name('section-header')).getAttribute('value');
    }
}
