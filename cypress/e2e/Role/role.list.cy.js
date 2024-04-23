describe('Role', () => {
  beforeEach(() => {
    cy.login('super@gmail.com', 'Super@123')
    cy.url().should('include', '/')
    cy.get('[data-testid="Role And Permission"]').click()
    cy.url().should('include', '/role-and-permission')
  })

  it('should display the list of roles', () => {
    cy.get('[data-testid="role-list"]').should('exist')
  })

  it('should display the Add button and Add modal when Add button is clicked', () => {
    cy.get('[data-testid="add-role"]').should('exist')
    cy.get('[data-testid="add-role"]').eq(0).click()
    cy.get('[data-testid="add-role-modal"]').should('be.visible')
  })

  it('should display the Edit button and Edit modal when Edit button is clicked', () => {
    cy.get('[data-testid="edit-role"]').should('exist')
    cy.get('[data-testid="edit-role"]').eq(0).click()
    cy.get('[data-testid="edit-role-modal"]').should('be.visible')
  })

  it('should display the View button and View modal when View button is clicked', () => {
    cy.get('[data-testid="view-role"]').should('exist')
    cy.get('[data-testid="view-role"]').eq(0).click()
    cy.get('[data-testid="view-role-modal"]').should('be.visible')
  })

  it('should display the Delete button and Delete modal when Delete button is clicked', () => {
    cy.get('[data-testid="delete-role"]').should('exist')
    cy.get('[data-testid="delete-role"]').eq(0).click()
    cy.get('[data-testid="delete-role-modal"]').should('be.visible')
  })
})
