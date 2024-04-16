describe('Delete Role', () => {
    beforeEach(() => {
        cy.login('super@gmail.com', 'Super@123');
        cy.url().should('include', '/');
        cy.get('[data-testid="Role And Permission"]').click();
        cy.url().should('include', '/role-and-permission');
    })

    it('should display the Delete Role button', () => {
        cy.get('[data-testid="delete-role"]').should('exist');
    })

    it('should Delete a role', () => {
        cy.get('[data-testid="delete-role"]').last().click();
        cy.get('[data-testid="delete-role-modal"]').should('be.visible');
        cy.get('[data-testid="confirm-delete"]').click();
    })

})