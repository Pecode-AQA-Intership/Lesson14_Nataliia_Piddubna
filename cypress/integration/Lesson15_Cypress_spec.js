import {faker} from '@faker-js/faker';

// 1. Create a new user and verify that user was added;
const MAIN_URL = 'https://demoqa.com/webtables';
const SELECTOR_DATA = {
  buttonAdd:'#addNewRecordButton',
  firstName: '#firstName',
  lastName: '#lastName',
  email: '#userEmail',
  age: '#age',
  salary: '#salary',
  department: '#department',
  buttonSubmit: '#submit',
  tables: '.ReactTable'
};//selector's array for a convenient usage

const FAKER_DATA = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  age: faker.random.number(125),
  salary: faker.random.number(84000),
  department: faker.commerce.department()
};//faker's array in a convenient form

describe('Create a new user in box "Web Tables"', () => {
  before(() => {
    cy.visit(MAIN_URL);
  }); //open site as a pre-conditions

  it('Create a new user', () => { 
    cy.get(SELECTOR_DATA.buttonAdd).click({timeout: 1000});//click the button 'Add'
    cy.get(SELECTOR_DATA.firstName).type(FAKER_DATA.firstName).should('have.value', FAKER_DATA.firstName);//fill in the box 'First Name' 
    cy.get(SELECTOR_DATA.lastName).type(FAKER_DATA.lastName).should('have.value', FAKER_DATA.lastName); //fill in the box 'Last Name'
    cy.get(SELECTOR_DATA.email).type(FAKER_DATA.email).should('have.value', FAKER_DATA.email);//fill in the box 'Email'
    cy.get(SELECTOR_DATA.age).type(FAKER_DATA.age).should('have.value', FAKER_DATA.age);//fill in the box 'Age'
    cy.get(SELECTOR_DATA.salary).type(FAKER_DATA.salary).should('have.value', FAKER_DATA.salary);//fill in the box 'Salary'
    cy.get(SELECTOR_DATA.department).type(FAKER_DATA.department).should('have.value', FAKER_DATA.department);//fill in the box 'Department'
    cy.get(SELECTOR_DATA.buttonSubmit).click({timeout: 3000});//click the button 'Add' 
    cy.get(SELECTOR_DATA.tables).contains(FAKER_DATA.email).should("be.visible");//check availability the user via e-mail
    cy.get(SELECTOR_DATA.tables).contains(FAKER_DATA.email).parent().then((allDataInRow) => {
        cy.get(allDataInRow)
          .should('contain', FAKER_DATA.firstName).and('contain', FAKER_DATA.lastName).and('contain', FAKER_DATA.age)
          .and('contain', FAKER_DATA.salary).and('contain', FAKER_DATA.department); //Verify that user was added. 
          //Firstly,find e-mail selector, its parent for getting all elements from row
    });
  });
});

// 2. Edit user and check that each field is editable;

// 3. Delete user from the table and check that user 
// was deleted;

// 4. Check searching feature, check that appropriate 
// user can be searched by each field;

// 5. And the hardest, implement sorting tests and 
// check that table was sorted by each column