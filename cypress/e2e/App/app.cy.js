describe('App', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the login page if not authenticated', () => {
    cy.url().should('include', '/login')
  })

  it('should navigate to Home page after successful login', () => {
    const email = 'super@gmail.com'
    const password = 'Super@123'
    cy.login(email, password)
    cy.url().should('include', '/')
  })
})
