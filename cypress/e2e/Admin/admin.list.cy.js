describe('Admin Management', () => {
    beforeEach(() => {

    cy.login('super@gmail.com', 'Super@123');

    cy.url().should('include', '/');

    cy.get('[data-testid="Admin"]').click();

    cy.url().should('include', '/admin');
    });

    it('should display the list of admins', () => {
        cy.get('[data-testid="admin-list"]').should('exist');
    }); 

    it('should display the Add Admin button', () => {
        cy.get('[data-testid="add-admin"]').click();

        // Fill out the admin addition form
        cy.get('input[name="first_name"]').type('Aesha');
        cy.get('input[name="last_name"]').type('Patel');
        cy.get('input[name="email"]').type('aesha@gmail.com');
        cy.get('input[name="password"]').type('aesha@123');
        cy.get('select[name="role_u_id"]').select('admin');
        cy.get('input[name="phone"]').type('9876321123');
        cy.get('input[name="alternate_phone"]').type('9876321870');
        cy.get('input[name="city"]').type('baroda');
        cy.get('input[name="state"]').type('gujrat');
        cy.get('input[name="country"]').type('india');
        cy.get('input[name="pincode"]').type('321123');

        cy.get('button').contains('Add Admin').click(); 
        cy.wait(500);
        cy.contains('Admin successfully added', { timeout: 10000 }).should('be.visible'); 
        cy.get('[data-testid="admin-list"]').contains('New Admin').should('exist');
    });

    it('should view the admin details', () =>{
        cy.get('[data-testid="view-admin"]').click();
    });

  });