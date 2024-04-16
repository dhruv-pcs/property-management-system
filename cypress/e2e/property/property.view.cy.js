describe('View Property', () => {
    beforeEach(() => {
        cy.login('super@gmail.com', 'Super@123');
        cy.url().should('include', '/');
        cy.get('[data-testid="Property"]').click();
        cy.url().should('include', '/property');
    })

    it('should display the View Property button', () => {
        cy.get('[data-testid="view-property"]').should('exist');
    })

    it('should View a role', () => {
        cy.get('[data-testid="view-property"]').eq(0).click();
        cy.get('[data-testid="view-property-modal"]').should('be.visible');
    })
})