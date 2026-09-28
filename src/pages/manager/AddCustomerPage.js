import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last Name');
    this.postCodeField = page.getByPlaceholder('Post Code');
    this.addCustomerFormButton = page
      .locator('form')
      .getByRole('button', { name: 'Add Customer' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async reload() {
    await this.page.reload();
  }

  async fillFirstName(firstName) {
    await this.firstNameField.fill(firstName);
  }

  async fillLastName(lastName) {
    await this.lastNameField.fill(lastName);
  }

  async fillPostCode(postCode) {
    await this.postCodeField.fill(postCode);
  }

  async clickAddCustomerFormButton() {
    await this.addCustomerFormButton.click();
  }

  async clickAddCustomerAndGetAlertText() {
    const messagePromise = new Promise((resolve) => {
      this.page.once('dialog', async (dialog) => {
        const message = dialog.message();
        await dialog.accept();
        resolve(message);
      });
    });
    await this.addCustomerFormButton.click();
    return await messagePromise;
  }

  async assertAlertContainsText(message, text) {
    expect(message).toContain(text);
  }
}
