import addresses from '../fixtures/addresses.json';

describe('school districts', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should find the school district for the addresses', () => {
    addresses.forEach((address) => {
      cy.log('Getting address: ', address);
      cy.get('#district-boundaries-page .filter-bar .search-input input')
        .clear()
        .type(address);

      cy.get('#district-boundaries-page .filter-bar .search-input button').click();

      cy.wait(1000);

      cy.get('#district-boundaries-page .filter-bar .search-input>label, #district-boundaries-page .filter-bar .filter>label a')
        .should('be.visible')
        .invoke('text')
        .then((text) => {
          cy.log({ text });
        });
    });
  });
})