describe('persons test', () => {

    beforeEach(() => {
        // stub and mock persons list
        cy.intercept('GET', 'http://localhost:8080/persons', { fixture: 'persons/nikolaAlbert.js' });
        cy.visit('/persons').url().should('include', '/persons');
    });

    it('create person carl sagan', () => {
        cy.contains('add').click();

        // fill form fields
        cy.get('mat-dialog-content').within(() => {
            cy.get('[formcontrolname|="firstName"]').type("Carl");
            cy.get('[formcontrolname|="lastName"]').type("Sagan");
            cy.get('[formcontrolname|="dateOfBirth"]').type("11/9/1934");
        });

        // stub and mock create person Carl Sagan
        cy.intercept('POST', 'http://localhost:8080/persons', {
            headers: { "Location": "/3" }
        });

        // stub and mock persons list after create person Carl Sagan
        cy.intercept('GET', 'http://localhost:8080/persons', { fixture: 'persons/nikolaAlbertCarl.js' }).as('personsListAfterCreate');

        // click CREATE button
        cy.get('mat-dialog-actions').within(() => {
            cy.get('button:nth-child(2)').click();
        });

        cy.wait('@personsListAfterCreate');

        // check whether new record is present on the list
        cy.get('.mat-row').within(() => {
            cy.contains('Carl');
            cy.contains('Sagan');
        });
    });

    it('delete person nikola tesla', () => {
        // stub and mock delete
        cy.intercept('DELETE', 'http://localhost:8080/persons/1', { statusCode: 204 });
        // stub and mock list call
        cy.intercept('GET', 'http://localhost:8080/persons', { fixture: 'persons/albert.js' }).as('personsListAfterDelete');

        // open delete modal
        cy.get('.mat-row:nth-child(1)').within(() => {
            cy.get('button').click();
        });

        // click delete
        cy.get('mat-dialog-actions').within(() => {
            cy.get('button:nth-child(2)').click();
        });

        cy.wait('@personsListAfterDelete');

        cy.get('.mat-row').within(() => {
            cy.contains('Nikola').should('not.exist');
            cy.contains('Tesla').should('not.exist');
        });
    });

    it('edit person nikola tesla', () => {
        // stub and mock update
        cy.intercept('PATCH', 'http://localhost:8080/persons/1', { statusCode: 204 });
        // stub and mock persons list after person nikola tesla is updated
        cy.intercept('GET', 'http://localhost:8080/persons', { fixture: 'persons/nikolaAlbertUpdate.js' }).as('personsListAfterUpdate');;

        cy.contains('Nikola').click();

        cy.get('mat-dialog-content').within(() => {
            cy.get('[formcontrolname|="firstName"]').type("-updated");
            cy.get('[formcontrolname|="lastName"]').type("-updated");
        });

        // click UPDATE button
        cy.get('mat-dialog-actions').within(() => {
            cy.get('button:nth-child(2)').click();
        });

        cy.wait('@personsListAfterUpdate');

        // check whether nikola tesla is updated on the list
        cy.get('.mat-row').within(() => {
            cy.contains('Nikola-updated');
            cy.contains('Tesla-updated');
        });
    });

});