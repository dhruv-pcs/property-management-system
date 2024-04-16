describe('Admin', () => {
    beforeEach(() => {
      cy.login('super@gmail.com', 'Super@123');
      cy.url().should('include', '/');
      cy.get('[data-testid="Admin"]').click();
      cy.url().should('include', '/admin');
    });
  
    it('should display the Add admin button', () => {
      cy.get('[data-testid="add-admin"]').should('exist');
    });

it('should display the Add Admin button', () => {
    cy.get('[data-testid="add-admin"]').click();

    cy.get("#first_name").type('Aesha');
    cy.get("#last_name").type('Patel');
    cy.get("#email").type('aesha@gmail.com');
    cy.get("#password").type('aesha@123');
    cy.get("#role_u_id").select('admin');
    cy.get("#phone").type('9876321123');
    cy.get("#alternate_phone").type('9876321870');
    cy.get("#city").type('baroda');
    cy.get("#state").type('gujrat');
    cy.get("#country").type('india');
    cy.get("#pincode").type('321123');

    cy.get('button').contains('Add Admin').click(); 
    cy.wait(500);
    cy.contains('Admin successfully added', { timeout: 10000 }).should('be.visible'); 
    cy.get('[data-testid="admin-list"]').contains('New Admin').should('exist');
});
});