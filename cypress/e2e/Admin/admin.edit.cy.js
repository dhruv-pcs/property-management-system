describe('Admin', () => {
    beforeEach(() => {
      cy.login('super@gmail.com', 'Super@123');
      cy.url().should('include', '/');
      cy.get('[data-testid="Admin"]').click();
      cy.url().should('include', '/admin');
    });
  
    it('should display the Add Admin button', () => {
      cy.get('[data-testid="edit-admin"]').should('exist');
    });
  
    it('should add a new Admin with default data', () => {
        cy.get('[data-testid="edit-admin"]').eq(0).click();

        cy.contains('button', 'Edit').click();
        cy.get('#city').clear();  
        cy.get('#city').type('Baroda');
        cy.get('#first_name').clear();  
        cy.get('#first_name').type('Ayeshaa');
    
        cy.get('#Save_changes').click();

        cy.wait(2000); 
        cy.get('[data-testid="admin-list"]').should('exist');
    
      });
  
  });
  