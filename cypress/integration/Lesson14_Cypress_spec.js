import {faker} from '@faker-js/faker';

const MAIN_URL= 'https://demoqa.com/text-box'; 
const FULL_NAME = faker.name.findName();
const EMAIL = faker.internet.email();
const CURRENT_ADDRESS = faker.address.secondaryAddress();
const PERMANENT_ADDRESS = faker.address.secondaryAddress();//faked data for filling the box in

const SELECTOR_FULL_NAME = '#userName';
const SELECTOR_EMAIL = '#userEmail';
const SELECTOR_CURRENT_ADDRESS = '#currentAddress';
const SELECTOR_PERMANRENT_ADDRESS = '#permanentAddress';
const SELECTOR_BUTTON_SUBMIT = '#submit'; // CSS selectors, searching element via ID

const OUTPUT_FULL_NAME = '#output #name';
const OUTPUT_EMAIL = '#output #email';
const OUTPUT_CURRENT_ADDRESS = '#output #currentAddress';
const OUTPUT_PERMANENT_ADDRESS = '#output #permanentAddress';// output data after completed tasks


describe('Verify to fill in the data to  the "Text Box"', () => {

  before(() => {
    cy.visit(MAIN_URL);
  }); //visiting necessary site (Main url = https://demoqa.com/text-box) as a pre-condition

  it('Fill in the box "Full Name"', () => {
      cy.get(SELECTOR_FULL_NAME).click({timeout: 1000}) // Click on button
      .type(FULL_NAME)
      .should('have.value', FULL_NAME);
  });

  it('Fill in the box "Email"', () => {
    cy.get(SELECTOR_EMAIL).click({timeout: 1000}) 
    .type(EMAIL)
    .should('have.value', EMAIL);
  });

  it('Fill in the box "Current address"', () => {
    cy.get(SELECTOR_CURRENT_ADDRESS).click({timeout: 1000}) 
    .type(CURRENT_ADDRESS)
    .should('have.value', CURRENT_ADDRESS);
  });

  it('Fill in the box "Permanent address"', () => {
    cy.get(SELECTOR_PERMANRENT_ADDRESS).click({timeout: 1000}) 
    .type(PERMANENT_ADDRESS)
    .should('have.value', PERMANENT_ADDRESS);
  });

  it('Click the button "Submit"', () => { 
  cy.get(SELECTOR_BUTTON_SUBMIT).click({timeout: 1000}) 
  });
  
  it('Check if the entered data is correct', () => {
    cy.get(OUTPUT_FULL_NAME).should('include.text', FULL_NAME);
    cy.get(OUTPUT_EMAIL).should('include.text', EMAIL);
    cy.get(OUTPUT_CURRENT_ADDRESS).should('include.text', CURRENT_ADDRESS);
    cy.get(OUTPUT_PERMANENT_ADDRESS).should('include.text', PERMANENT_ADDRESS);
  });
});

