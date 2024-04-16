describe('Owner', () => {
    beforeEach(() => {
      cy.login('super@gmail.com', 'Super@123');
      cy.url().should('include', '/');
      cy.get('[data-testid="Property"]').click();
      cy.url().should('include', '/property');
    });
  
    it('should display the Add property button', () => {
      cy.get('[data-testid="edit-property"]').should('exist');
    });
  
    it('should add a new property with default data', () => {
        cy.get('[data-testid="edit-property"]').eq(0).click();
        
        cy.get('#city').clear();  
        cy.get('#city').type('Baroda');
        cy.get('#name').clear(); 
        cy.get('#name').type('Green Ellegance Lux');
    
        cy.get('form').submit();

        cy.wait(2000); 
        cy.get('[data-testid="property-list"]').should('exist');
    
      });
  
  });
  