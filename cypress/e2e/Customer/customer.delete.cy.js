describe('Delete Customer', () => {
    beforeEach(() => {
        cy.login('super@gmail.com', 'Super@123');
        cy.url().should('include', '/');
        cy.get('[data-testid="Customer"]').click();
        cy.url().should('include', '/customer');
    })

    it('should display the Delete Customer button', () => {
        cy.get('[data-testid="delete-customer"]').should('exist');
    })

    it('should Delete a customer', () => {
        cy.get('[data-testid="delete-customer"]').eq(0).click();
        cy.get('[data-testid="delete-customer-modal"]').should('be.visible');
        cy.get('[data-testid="confirm-delete"]').click();
    })

})