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
    });

    it('should display the view Admin button', () => {
        cy.get('[data-testid="view-admin"]').should('exist');
    });

    it('should display the edit Admin button', () => {
        cy.get('[data-testid="edit-admin"]').should('exist');
    });

    it('should display the Delete Admin button', () => {
        cy.get('[data-testid="delete-admin"]').should('exist');
    });

    it('should open the add admin modal when the "Add" button is clicked', () => {
        cy.get('[data-testid="add-admin"]').click(); // Click on the element with aria-label "Add"
        cy.get('[data-testid="add-admin-modal"]').should('be.visible');
    });

    it('should open the edit admin modal when the "Edit" button is clicked', () => {
        cy.wait(2000);
        cy.get('[data-testid="edit-admin"]').eq(0).click(); // Click on the element with aria-label "Edit"
        cy.get('[data-testid="edit-admin-modal"]').should('be.visible');
    });

    it('should open the view admin modal when the "View" button is clicked', () => {
        cy.wait(2000);
        cy.get('[data-testid="view-admin"]').eq(0).click(); 
        cy.get('[data-testid="view-admin-modal"]').should('be.visible');
    });

    it('should open the delete admin modal when the "Delete" button is clicked', () => {
        cy.wait(2000);
        cy.get('[data-testid="delete-admin"]').eq(0).click(); // Click on the element with aria-label "Delete"
        cy.get('[data-testid="delete-admin-modal"]').should('be.visible');
    });

  });