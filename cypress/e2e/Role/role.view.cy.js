describe('View Role', () => {
    beforeEach(() => {
        cy.login('super@gmail.com', 'Super@123');
        cy.url().should('include', '/');
        cy.get('[data-testid="Role And Permission"]').click();
        cy.url().should('include', '/role-and-permission');
    })

    it('should display the View Role button', () => {
        cy.get('[data-testid="view-role"]').should('exist');
    })

    it('should View a role', () => {
        cy.get('[data-testid="view-role"]').last().click();
        cy.get('[data-testid="view-role-modal"]').should('be.visible');
    })
})