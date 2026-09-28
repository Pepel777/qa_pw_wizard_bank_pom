import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postCode;

test.beforeEach(async ({ page }) => {

  const addCustomerPage = new AddCustomerPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postCode);
  await addCustomerPage.clickAddCustomerFormButton();
  await addCustomerPage.reload();
});

test('Assert manager can open several accounts for one customer', async ({ page }) => {
  
  const bankManagerMainPage = new BankManagerMainPage(page);
  const openAccountPage = new OpenAccountPage(page);
  const customersListPage = new CustomersListPage(page);

  await bankManagerMainPage.clickOpenAccountButton();
  await openAccountPage.selectCustomer(`${firstName} ${lastName}`);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcessButton();
  await openAccountPage.reload();

  await openAccountPage.selectCustomer(`${firstName} ${lastName}`);
  await openAccountPage.selectCurrency('Pound');
  await openAccountPage.clickProcessButton();
  await openAccountPage.reload();

  await bankManagerMainPage.clickCustomersButton();

  await customersListPage.assertLastRowHasTwoAccountNumbers();
});