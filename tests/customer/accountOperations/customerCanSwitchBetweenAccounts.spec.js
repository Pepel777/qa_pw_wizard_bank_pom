import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

let customerName;

test.beforeEach(async ({ page }) => {

  const addCustomerPage = new AddCustomerPage(page);
  const openAccountPage = new OpenAccountPage(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  customerName = `${firstName} ${lastName}`;

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(faker.location.zipCode());
  await addCustomerPage.clickAddCustomerFormButton();
  await addCustomerPage.reload();

  await openAccountPage.open();
  await openAccountPage.selectCustomer(customerName);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcessButton();
  await openAccountPage.reload();

  await openAccountPage.selectCustomer(customerName);
  await openAccountPage.selectCurrency('Pound');
  await openAccountPage.clickProcessButton();
  await openAccountPage.reload();
});

test('Assert customer can switch between accounts', async ({ page }) => {

  const bankHomePage = new BankHomePage(page);
  const customerLoginPage = new CustomerLoginPage(page);
  const customerAccountPage = new CustomerAccountPage(page);

  await bankHomePage.open();
  await bankHomePage.clickCustomerLoginButton();
  await customerLoginPage.selectCustomer(customerName);
  await customerLoginPage.clickLoginButton();

  await customerAccountPage.selectAccountByIndex(0);
  const firstAccountNumber = await customerAccountPage.getSelectedAccountNumber();
  await customerAccountPage.assertAccountLineContainsText(firstAccountNumber);
  await customerAccountPage.assertAccountLineContainsText('Dollar');

  await customerAccountPage.selectAccountByIndex(1);
  const secondAccountNumber = await customerAccountPage.getSelectedAccountNumber();
  await customerAccountPage.assertAccountLineContainsText(secondAccountNumber);
  await customerAccountPage.assertAccountLineContainsText('Pound');
});