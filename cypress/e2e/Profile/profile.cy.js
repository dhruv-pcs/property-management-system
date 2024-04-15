describe('Profile Page', () => {
    beforeEach(() => {
      // Visit the profile page
      cy.login('super@gmail.com', 'Super@123');
      cy.visit('/profile');
  
      // Login before each test
    });
  
    it('should display the profile picture and account details', () => {
      // Check if the profile picture is displayed
      cy.get('.img-account-profile').should('be.visible');
  
      // Check if account details are displayed
      cy.contains('Name:').should('exist');
      cy.contains('Email:').should('exist');
      cy.contains('Role:').should('exist');
      cy.contains('Status:').should('exist');
      cy.contains('Contact Number:').should('exist');
    });
  
    it('should allow editing profile information', () => {
      // Click on the edit button
      cy.contains('Edit').click();
  
      // Check if input fields are editable
      cy.get('input[name="first_name"]').should('be.enabled');
      cy.get('input[name="last_name"]').should('be.enabled');
      cy.get('input[name="email"]').should('be.enabled');
      cy.get('input[name="phone"]').should('be.enabled');
      cy.get('input[name="alternate_phone"]').should('be.enabled');
      cy.get('input[name="city"]').should('be.enabled');
      cy.get('input[name="state"]').should('be.enabled');
      cy.get('input[name="country"]').should('be.enabled');
      cy.get('input[name="pincode"]').should('be.enabled');
  
      // Modify some profile information (you can change this according to your UI)
      cy.get('input[name="first_name"]').clear().type('NewFirstName');
      cy.get('input[name="last_name"]').clear().type('NewLastName');
      cy.get('input[name="phone"]').clear().type('1234567890');
      
      // Modify other fields as needed
  
      // Click on save changes button
      cy.contains('Save changes').click();
  
      // Assert that changes are saved (you may need to adjust this assertion based on how your UI behaves)
      cy.contains('Your changes have been saved').should('be.visible');
    });
  });
  