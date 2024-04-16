describe('Profile Page', () => {
    beforeEach(() => {
      cy.login('super@gmail.com', 'Super@123');
      cy.url().should('include', '/');
      cy.get('[data-testid="profile-icon"]').click();
      cy.url().should('include', '/profile');
    });

     it('should display the profile picture', () => {
        cy.get('[data-testid="profile-image"]').should('exist');
        cy.get('[data-testid="profile-image"]').should('be.visible');    
    });
  
    it('Displays user data correctly', () => {
        cy.wait(2000);
        cy.get('[data-testid="profile-name"]').should('be.visible')
        cy.get('[data-testid="profile-email"]').should('be.visible')
        cy.get('[data-testid="profile-role"]').should('be.visible')
        cy.get('[data-testid="profile-status"]').should('be.visible')
        cy.get('[data-testid="profile-phone"]').should('be.visible')
      })

    it('should have non-empty values in profile form', () => {
     
      cy.wait(2000);
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
