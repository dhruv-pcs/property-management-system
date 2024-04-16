describe('View Role', () => {
    beforeEach(() => {
        cy.login('super@gmail.com', 'Super@123');
        cy.url().should('include', '/');
        cy.get('[data-testid="Owner"]').click();
        cy.url().should('include', '/owner');
    })

    it('should display the View Owner button', () => {
        cy.get('[data-testid="view-owner"]').should('exist');
    })

    it('should View a role', () => {
        cy.get('[data-testid="view-owner"]').eq(0).click();
        cy.get('[data-testid="view-owner-modal"]').should('be.visible');
    })
})