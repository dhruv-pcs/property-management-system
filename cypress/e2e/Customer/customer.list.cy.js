describe('Customer', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.login('super@gmail.com', 'Super@123')
    cy.url().should('include', '/')
    cy.get('[data-testid="Customer"]').click()
    cy.url().should('include', '/customer')
  })

  it('should display the list of Owner', () => {
    cy.get('[data-testid="customer-list"]').should('exist')
  })

  it('should display the Add Owner button', () => {
    cy.get('[data-testid="add-customer"]').should('exist')
  })

  it('should display the view Customer button', () => {
    cy.get('[data-testid="view-customer"]').should('exist')
  })

  it('should display the edit Customer button', () => {
    cy.get('[data-testid="edit-customer"]').should('exist')
  })

  it('should display the Delete Customer button', () => {
    cy.get('[data-testid="delete-customer"]').should('exist')
  })

  it('should open the add customer modal when the "Add" button is clicked', () => {
    cy.get('[data-testid="add-customer"]').click()
    cy.get('[data-testid="add-customer-modal"]').should('be.visible')
  })

  it('should open the edit customer modal when the "Edit" button is clicked', () => {
    cy.wait(2000)
    cy.get('[data-testid="edit-customer"]').eq(0).click()
    cy.get('[data-testid="edit-customer-modal"]').should('be.visible')
  })

  it('should open the view customer modal when the "View" button is clicked', () => {
    cy.wait(2000)
    cy.get('[data-testid="view-customer"]').eq(0).click()
    cy.get('[data-testid="view-customer-modal"]').should('be.visible')
  })

  it('should open the delete customer modal when the "Delete" button is clicked', () => {
    cy.wait(2000)
    cy.get('[data-testid="delete-customer"]').eq(0).click()
    cy.get('[data-testid="delete-customer-modal"]').should('be.visible')
  })
})
