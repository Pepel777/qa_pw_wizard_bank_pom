import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.lastRow = page.locator('tbody tr').last();
    this.lastRowFirstNameCell = this.lastRow.locator('td').nth(0);
    this.lastRowLastNameCell = this.lastRow.locator('td').nth(1);
    this.lastRowPostCodeCell = this.lastRow.locator('td').nth(2);
    this.lastRowAccountNumberCell = this.lastRow.locator('td').nth(3);
    this.searchField = page.getByPlaceholder('Search Customer');
    this.tableRows = page.locator('tbody tr');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async assertLastRowFirstNameContainsText(text) {
    await expect(this.lastRowFirstNameCell).toContainText(text);
  }

  async assertLastRowLastNameContainsText(text) {
    await expect(this.lastRowLastNameCell).toContainText(text);
  }

  async assertLastRowPostCodeContainsText(text) {
    await expect(this.lastRowPostCodeCell).toContainText(text);
  }

  async assertLastRowAccountNumberIsEmpty() {
    await expect(this.lastRowAccountNumberCell).toHaveText('');
  }

  async reload() {
    await this.page.reload();
  }

  getCustomerRow(firstName, lastName) {
    return this.page
      .locator('tbody tr')
      .filter({ hasText: firstName })
      .filter({ hasText: lastName });
  }

  async clickDeleteButtonForCustomer(firstName, lastName) {
    await this.getCustomerRow(firstName, lastName)
      .getByRole('button', { name: 'Delete' })
      .click();
  }

  async assertCustomerRowIsNotPresent(firstName, lastName) {
    await expect(this.getCustomerRow(firstName, lastName)).toHaveCount(0);
  }

    async assertLastRowAccountNumberIsNotEmpty() {
    await expect(this.lastRowAccountNumberCell).not.toHaveText('');
  }

    async fillSearchField(text) {
    await this.searchField.fill(text);
  }

  async assertCustomerRowIsPresent(firstName, lastName) {
    await expect(this.getCustomerRow(firstName, lastName)).toHaveCount(1);
  }

  async assertNoOtherRowsArePresent() {
    await expect(this.tableRows).toHaveCount(1);
  }

  async assertLastRowHasTwoAccountNumbers() {
    await expect(this.lastRowAccountNumberCell).toHaveText(/^\s*\d+\s+\d+\s*$/);
  }
}
