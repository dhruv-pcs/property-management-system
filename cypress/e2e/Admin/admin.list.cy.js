describe('Admin Management', () => {
    beforeEach(() => {

    cy.login('super@gmail.com', 'Super@123');

    cy.url().should('include', '/');

    cy.get('[data-testid="Admin"]').click();

    cy.url().should('include', '/admin');
    });

    it('should display the list of admins', () => {
        cy.get('[data-testid="admin-list"]').should('exist');
    }); 

    it('should display the Add Admin button', () => {
        cy.get('[data-testid="add-admin"]').should('exist');
    })

  });