Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login'); // Assuming your login page is located at /login

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    
    cy.get('form').submit();
  });
  