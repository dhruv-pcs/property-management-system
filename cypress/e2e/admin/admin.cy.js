describe('Admin Management', () => {
    beforeEach(() => {
     // Adjust the URL based on your routing setup
      cy.login('super@gmail.com', 'Super@123'); // Assuming you have a custom Cypress command tohandle login
      cy.visit('/admin'); 
    
    });
  
    it('should display the list of admins', () => {
        cy.visit('/admin'); 
    
    });
  
    // it('allows admin to add a new admin', () => {
    //   cy.get('button').contains('ADD', { timeout: 10000 }).click()
    //     .then(() => {
    //       cy.log('Clicked the ADD button');
    //     });
    //   cy.get('input[name="first_name"]').type('neha');
    //   cy.get('input[name="last_name"]').type('patel');
    //   cy.get('input[name="email"]').type('neha45@gmail.com');
    //   cy.get('button').contains('Add').click(); // Make sure this is the exact text of the button
    //   cy.contains('super admin').should('exist'); // Ensure this is the correct check post-admin addition
    // });
  
    // it('allows admin to view an admin details', () => {
    //   cy.get('svg[data-icon="visibility"]').first().click();
    //   cy.contains('View Admin').should('be.visible');
    // });
  
    // it('allows admin to edit an admin', () => {
    //   cy.get('svg[data-icon="edit"]').first().click();
    //   cy.get('input[name="firstName"]').clear().type('Jane');
    //   cy.get('button').contains('Save Changes').click(); // Adjust based on your actual button text
    //   cy.contains('Jane Doe').should('exist');
    // });
  
    // it('allows admin to delete an admin', () => {
    //   cy.get('svg[data-icon="delete"]').first().click();
    //   cy.get('button').contains('Delete').click();
    //   cy.contains('User deleted successfully!').should('be.visible');
    // });
  });
  