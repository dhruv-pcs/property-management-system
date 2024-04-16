describe('Admin', () => {
    beforeEach(() => {
      cy.login('super@gmail.com', 'Super@123');
      cy.url().should('include', '/');
      cy.get('[data-testid="Admin"]').click();
      cy.url().should('include', '/admin');
    });
  
    it('should display the Delete Admin button', () => {
      cy.get('[data-testid="edit-admin"]').should('exist');
    });
  
    it('should Delete a admin', () => {
        cy.get('[data-testid="delete-admin"]').eq(0).click();
        
        cy.get('[data-testid="delete-admin-modal"]').should('be.visible');
        
        cy.get('[data-testid="confirm-delete"]').click();

      });
  
  });
  