describe('Admin Management', () => {
    beforeEach(() => {

    cy.login('super@gmail.com', 'Super@123');

    cy.url().should('include', '/');

    cy.get('[data-testid="Property"]').click();

    cy.url().should('include', '/property');
    });

    it('should display the list of property', () => {
        cy.get('[data-testid="property-list"]').should('exist');
    }); 

  });