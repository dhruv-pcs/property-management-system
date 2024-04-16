describe('Edit Customer', () => {
    beforeEach(() => {
      cy.login('super@gmail.com', 'Super@123');
      cy.url().should('include', '/');
      cy.get('[data-testid="Customer"]').click();
      cy.url().should('include', '/customer');
    });
  
    it('should display the Edit Customer button', () => {
      cy.get('[data-testid="edit-customer"]').should('exist');
    });
  
    it('should add a Edit Customer with default data', () => {
        cy.get('[data-testid="edit-customer"]').eq(0).click();
        
        cy.get('#last_name').clear();   
        cy.get('#last_name').type('Wick');
        cy.get('#email').clear();
        cy.get('#email').type('john.wick@example.com');
        cy.get('#active').click();
        cy.get('#verified').click();
        cy.get('form').submit();

    
        cy.wait(2000); 
        cy.get('[data-testid="customer-list"]').should('exist');
        cy.contains('John').should('exist');
      });
  
  });
  