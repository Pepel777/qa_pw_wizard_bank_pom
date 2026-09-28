import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerDropDown = page.getByTestId('userSelect');
    this.currencyDropDown = page.getByTestId('currency');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCustomer(customerName) {
    await this.customerDropDown.selectOption({ label: customerName });
  }

  async selectCurrency(currency) {
    await this.currencyDropDown.selectOption(currency);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async clickProcessAndGetAlertText() {
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.processButton.click();
    const dialog = await dialogPromise;
    const message = dialog.message();
    await dialog.accept();
    return message;
  }

  async assertAlertContainsText(message, text) {
    expect(message).toContain(text);
  }

    async assertCurrencyDropDownHasValue(value) {
    await expect(this.currencyDropDown).toHaveValue(value);
  }

    async reload() {
    await this.page.reload();
  }
}
