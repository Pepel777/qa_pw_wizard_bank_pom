import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

test('Assert manager cannot add duplicate customer', async ({ page }) => {

  const addCustomerPage = new AddCustomerPage(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postCode);
  await addCustomerPage.clickAddCustomerAndGetAlertText();

  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postCode);
  const message = await addCustomerPage.clickAddCustomerAndGetAlertText();

  await addCustomerPage.assertAlertContainsText(message, 'Customer may be duplicate');
});