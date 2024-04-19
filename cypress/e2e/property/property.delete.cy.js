describe('Property', () => {
  beforeEach(() => {
    cy.login('super@gmail.com', 'Super@123')
    cy.url().should('include', '/')
    cy.get('[data-testid="Property"]').click()
    cy.url().should('include', '/property')
  })

  it('should display the Delete property button', () => {
    cy.get('[data-testid="edit-property"]').should('exist')
  })

  it('should Delete a Property', () => {
    cy.get('[data-testid="delete-property"]').eq(0).click()

    cy.get('[data-testid="delete-property-modal"]').should('be.visible')

    cy.get('[data-testid="confirm-delete"]').click()
  })
})
