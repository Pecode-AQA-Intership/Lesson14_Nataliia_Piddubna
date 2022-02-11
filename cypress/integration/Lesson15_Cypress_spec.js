import { faker } from '@faker-js/faker';

const MAIN_URL = 'https://demoqa.com/webtables';
const SELECTOR_DATA = {
  buttonAdd: '#addNewRecordButton',
  firstName: '#firstName',
  lastName: '#lastName',
  email: '#userEmail',
  age: '#age',
  salary: '#salary',
  department: '#department',
  buttonSubmit: '#submit',
  tables: '.ReactTable',
  buttonEdit: 'span#edit-record-4',
  fourthRow: 'div.rt-tr-group',
  buttonDelete: '#delete-record-4',
  checkDelete: '.rt-tbody',
  searchingButton: '#searchBox',
  sortTable: '.rt-table',
  buttonDeleteFirstRow: '#'
};//selector's array for a convenient usage

const FAKER_DATA = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  age: faker.random.number(99),
  salary: faker.random.number(84000),
  department: faker.commerce.department(),
  editFirstName: faker.name.firstName(),
  editLastName: faker.name.lastName(),
  editEmail: faker.internet.email(),
  editAge: faker.random.number(78),
  editSalary: faker.random.number(89000),
  editDepartment: faker.commerce.department()
};//faker's array in a convenient form

const searchUser = {
  firstName: 'Kierra',
  lastName: 'Gentry',
  age: 29,
  email: 'kierra@example.com',
  salary: 2000,
  department: 'Legal'
};

describe('Create a new user in box "Web Tables"', () => {
  before(() => {
    cy.visit(MAIN_URL);
  }); //open site as a pre-conditions

  it('Create a new user and verify that user was added', () => {
    cy.get(SELECTOR_DATA.buttonAdd).click({ timeout: 2000 });//click the button 'Add'
    cy.get(SELECTOR_DATA.firstName).type(FAKER_DATA.firstName).should('have.value', FAKER_DATA.firstName);//fill in the box 'First Name' 
    cy.get(SELECTOR_DATA.lastName).type(FAKER_DATA.lastName).should('have.value', FAKER_DATA.lastName); //fill in the box 'Last Name'
    cy.get(SELECTOR_DATA.email).type(FAKER_DATA.email).should('have.value', FAKER_DATA.email);//fill in the box 'Email'
    cy.get(SELECTOR_DATA.age).type(FAKER_DATA.age).should('have.value', FAKER_DATA.age, ({ timeout: 1000 }));//fill in the box 'Age'
    cy.get(SELECTOR_DATA.salary).type(FAKER_DATA.salary).should('have.value', FAKER_DATA.salary);//fill in the box 'Salary'
    cy.get(SELECTOR_DATA.department).type(FAKER_DATA.department).should('have.value', FAKER_DATA.department);//fill in the box 'Department'
    cy.get(SELECTOR_DATA.buttonSubmit).click({ timeout: 3000 });//click the button 'Submit' 
    cy.get(SELECTOR_DATA.tables).contains(FAKER_DATA.email).should("be.visible");//check availability the user via e-mail
    cy.get(SELECTOR_DATA.tables).contains(FAKER_DATA.email).parent().then((allDataInRow) => {
      cy.get(allDataInRow)
        .should('contain', FAKER_DATA.firstName).and('contain', FAKER_DATA.lastName).and('contain', FAKER_DATA.age)
        .and('contain', FAKER_DATA.salary).and('contain', FAKER_DATA.department); //Verify that user was added. 
      //Firstly,find e-mail selector, its parent for getting all elements from row
    });
  });
  it('Edit user and check its editability. Delete user and verify it. Check searching and verify that user can be searched by each field', () => {
    cy.get(SELECTOR_DATA.buttonEdit).click({ timeout: 5000 });//click the button 'Edit'.
    cy.get(SELECTOR_DATA.firstName).clear().type(FAKER_DATA.editFirstName);//edit the box 'First Name' 
    cy.get(SELECTOR_DATA.lastName).clear().type(FAKER_DATA.editLastName); //edit the box 'Last Name'
    cy.get(SELECTOR_DATA.email).clear().type(FAKER_DATA.editEmail);//edit the box 'Email'
    cy.get(SELECTOR_DATA.age).clear().type(FAKER_DATA.editAge);//edit the box 'Age'
    cy.get(SELECTOR_DATA.salary).clear().type(FAKER_DATA.editSalary);//edit the box 'Salary'
    cy.get(SELECTOR_DATA.department).clear().type(FAKER_DATA.editDepartment);//edit the box 'Department'
    cy.get(SELECTOR_DATA.buttonSubmit).click({ timeout: 3000 });//click the button 'Submit'

    cy.get(SELECTOR_DATA.buttonDelete).parentsUntil(SELECTOR_DATA.fourthRow)//find 4 row via buttonDelete
      .should('contain', FAKER_DATA.editFirstName)
      .and('contain', FAKER_DATA.editLastName).and('contain', FAKER_DATA.editEmail)
      .and('contain', FAKER_DATA.editAge).and('contain', FAKER_DATA.editSalary)
      .and('contain', FAKER_DATA.editDepartment);//check that each field is editable
    cy.get(SELECTOR_DATA.buttonDelete).click({ timeout: 5000 });//click the button 'Delete' 
    cy.get(SELECTOR_DATA.editEmail).should('not.exist');

    cy.get( SELECTOR_DATA.searchingButton).click({ timeout: 5000 }).type(searchUser.firstName).should('be.visible')//fill in the box user's'First Name' 
      .clear().type(searchUser.lastName).should('be.visible')//fill in the box user's'Last Name'
      .clear().type(searchUser.email).should('be.visible')//fill in the box user's 'Email'
      .clear().type(searchUser.age).should('be.visible')//ffill in the box user's 'Age'
      .clear().type(searchUser.salary).should('be.visible')//fill in the box user's'Salary'
      .clear().type(searchUser.department).should('be.visible').clear();//fill in the box user's 'Department'
  });
});
// 5. And the hardest, implement sorting tests and
// check that table was sorted by each column

// describe('Sorting table', () => {
//   it('sorts', () => {
//     cy.visit(MAIN_URL)

//     cy.get('#delete-record-3').parentsUntil('.rt-tr-group').should('have.length', 3) 

//   });
// });