describe('Add Role', () => {
     beforeEach(() => {
         cy.login('super@gmail.com', 'Super@123');
         cy.url().should('include', '/');
         cy.get('[data-testid="Role And Permission"]').click();
         cy.url().should('include', '/role-and-permission');
     })   

     it('should display the Add Role button', () => {
         cy.get('[data-testid="add-role"]').should('exist');         
     })

     it('should add a new role with default data', () => {
         cy.get('[data-testid="add-role"]').click();
         cy.get('#role-name').type('HR');
         cy.get('#select-all').click();
         cy.get('#save-permissions').click();
         cy.wait(2000); 
         cy.get('[data-testid="role-list"]').should('exist');
         cy.contains('HR').should('exist');
     })

})