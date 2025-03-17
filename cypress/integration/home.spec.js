describe('home test', () => {

    it('home is loaded with default route /persons', () => {
        cy.intercept('GET', 'http://localhost:8080/persons', { fixture: 'persons/nikolaAlbert.js' });
        cy.visit('/');
        cy.url().should('include', '/persons');
    });

});