describe('Owner', () => {
    beforeEach(() => {
        cy.viewport(1280, 720); 
        cy.login('super@gmail.com', 'Super@123');
        cy.url().should('include', '/');
        cy.get('[data-testid="Owner"]').click();
        cy.url().should('include', '/owner');
    });

 

    it('should display the list of Owner', () => {
        cy.get('[data-testid="owner-list"]').should('exist');
    });

    it('should display the Add Owner button', () => {
        cy.get('[data-testid="add-owner"]').should('exist');
    });

    it('should display the view Owner button', () => {
        cy.get('[data-testid="view-owner"]').should('exist');
    });

    it('should display the edit Owner button', () => {
        cy.get('[data-testid="edit-owner"]').should('exist');
    });

    it('should display the Delete Owner button', () => {
        cy.get('[data-testid="delete-owner"]').should('exist');
    });

    it('should open the add owner modal when the "Add" button is clicked', () => {
        cy.get('[data-testid="add-owner"]').click();
        cy.get('[data-testid="add-owner-modal"]').should('be.visible');
    });

    it('should open the edit owner modal when the "Edit" button is clicked', () => {
        cy.wait(2000);
        cy.get('[data-testid="edit-owner"]').eq(0).click();
        cy.get('[data-testid="edit-owner-modal"]').should('be.visible');
    });

    it('should open the view owner modal when the "View" button is clicked', () => {
        cy.wait(2000);
        cy.get('[data-testid="view-owner"]').eq(0).click(); 
        cy.get('[data-testid="view-owner-modal"]').should('be.visible');
    });

    it('should open the delete owner modal when the "Delete" button is clicked', () => {
        cy.wait(2000);
        cy.get('[data-testid="delete-owner"]').eq(0).click();
        cy.get('[data-testid="delete-owner-modal"]').should('be.visible');
    });
});
