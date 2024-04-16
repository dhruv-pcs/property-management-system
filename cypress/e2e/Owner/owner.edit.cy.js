describe('Owner', () => {
    beforeEach(() => {
      cy.login('super@gmail.com', 'Super@123');
      cy.url().should('include', '/');
      cy.get('[data-testid="Owner"]').click();
      cy.url().should('include', '/owner');
    });
  
    it('should display the Edit Owner button', () => {
      cy.get('[data-testid="edit-owner"]').should('exist');
    });
  
    it('should add a new owner with default data', () => {
        cy.get('[data-testid="edit-owner"]').eq(0).click();
        
        cy.get('#last_name').clear();   
        cy.get('#last_name').type('Wick');
        cy.get('#email').clear();
        cy.get('#email').type('john.wick@example.com');
        cy.get('#active').click();
        cy.get('#verified').click();
        cy.get('form').submit();

    
        cy.wait(2000); 
        cy.get('[data-testid="owner-list"]').should('exist');
        cy.contains('John').should('exist');
      });
  
  });
  