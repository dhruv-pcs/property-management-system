describe('Profile Page', () => {
    beforeEach(() => {
  
      // Login with valid credentials
      cy.login('super@gmail.com', 'Super@123');
  
      // Wait for the URL to include '/dashboard'
      cy.url().should('include', '/');
      
      // Click on the profile icon to navigate to the profile page
      cy.get('[data-testid="profile-icon"]').click();
  
      // Wait for the URL to include '/profile'
      cy.url().should('include', '/profile');
    });

     it('should display the profile picture', () => {
        // Assert that the profile picture exists
        cy.get('[data-testid="profile-image"]').should('exist');
        cy.get('[data-testid="profile-image"]').should('be.visible');    
    });
  
    it('Displays user data correctly', () => {
        cy.wait(2000);

        cy.get('[data-testid="profile-name"]').should('be.visible')
    
        // Check if Email is displayed correctly
        cy.get('[data-testid="profile-email"]').should('be.visible')
    
        // Check if Role is displayed correctly
        cy.get('[data-testid="profile-role"]').should('be.visible')
    
        // Check if Status is displayed correctly
        cy.get('[data-testid="profile-status"]').should('be.visible')
    
        // Check if Contact Number is displayed correctly
        cy.get('[data-testid="profile-phone"]').should('be.visible')
      })

    it('should have non-empty values in profile form', () => {
     
      cy.wait(2000);
      
      // Assert that the values of the profile form are not empty
      cy.get('input[name="first_name"]').should('not.have.value', '');
      cy.get('input[name="last_name"]').should('not.have.value', '');
      cy.get('input[name="email"]').should('not.have.value', '');
      cy.get('input[name="phone"]').should('not.have.value', '');
      cy.get('input[name="alternate_phone"]').should('not.have.value', '');
      cy.get('input[name="city"]').should('not.have.value', '');
      cy.get('input[name="state"]').should('not.have.value', '');
      cy.get('input[name="country"]').should('not.have.value', '');
      cy.get('input[name="pincode"]').should('not.have.value', '');
    });
});
