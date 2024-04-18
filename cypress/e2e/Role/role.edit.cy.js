describe('Edit Role', () => {
  beforeEach(() => {
    cy.login('super@gmail.com', 'Super@123')
    cy.url().should('include', '/')
    cy.get('[data-testid="Role And Permission"]').click()
    cy.url().should('include', '/role-and-permission')
  })

  it('should display the Edit Role button', () => {
    cy.get('[data-testid="edit-role"]').should('exist')
  })

  it('should edit a role with default data', () => {
    cy.get('[data-testid="edit-role"]').last().click()
    cy.get('#role-name').clear()
    cy.get('#role-name').type('Clerk')
    cy.get('#selectAll-0').click()
    cy.get('#selectAll-1').click()
    cy.get('#selectAll-2').click()
    cy.get('#save-permissions').click()
    cy.wait(2000)
    cy.get('[data-testid="role-list"]').should('exist')
    cy.contains('Clerk').should('exist')
  })
})
