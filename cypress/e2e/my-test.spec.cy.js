describe('template spec', () => {
  it('passes', () => {
    cy.visit('/');

    cy.get('#district-boundaries-page .filter-bar .search-input input')
      .type('1705 90th St. West Des Moines');

    cy.get('#district-boundaries-page .filter-bar .search-input button').click();

    cy.get('#district-boundaries-page .filter-bar .search-input>label, #district-boundaries-page .filter-bar .filter>label a')
      .should('be.visible')
      .invoke('text')
      .should((text) => {
        console.log({text});
      });
    

  })
})