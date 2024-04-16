describe('View Admin', () => {
    beforeEach(() => {
        cy.login('super@gmail.com', 'Super@123');
        cy.url().should('include', '/');
        cy.get('[data-testid="Admin"]').click();
        cy.url().should('include', '/admin');
    })

    it('should display the View Admin button', () => {
        cy.get('[data-testid="view-admin"]').should('exist');
    })

    it('should View a role', () => {
        cy.get('[data-testid="view-admin"]').eq(0).click();
        cy.get('[data-testid="view-admin-modal"]').should('be.visible');
    })
})