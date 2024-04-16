describe('Owner', () => {
    beforeEach(() => {
      cy.login('super@gmail.com', 'Super@123');
      cy.url().should('include', '/');
      cy.get('[data-testid="Owner"]').click();
      cy.url().should('include', '/owner');
    });
  
    it('should display the Delete Owner button', () => {
      cy.get('[data-testid="edit-owner"]').should('exist');
    });
  
    it('should Delete a owner', () => {
        cy.get('[data-testid="delete-owner"]').eq(0).click();
        
        cy.get('[data-testid="delete-owner-modal"]').should('be.visible');
        
        cy.get('[data-testid="confirm-delete"]').click();

        
      });
  
  });
  