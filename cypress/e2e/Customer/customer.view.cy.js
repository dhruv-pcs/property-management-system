describe('View Customer', () => {
    beforeEach(() => {
        cy.login('super@gmail.com', 'Super@123');
        cy.url().should('include', '/');
        cy.get('[data-testid="Customer"]').click();
        cy.url().should('include', '/customer');
    })

    it('should display the View Customer button', () => {
        cy.get('[data-testid="view-customer"]').should('exist');
    })

    it('should View a role', () => {
        cy.get('[data-testid="view-customer"]').eq(0).click();
        cy.get('[data-testid="view-customer-modal"]').should('be.visible');
    })
})