describe('Property', () => {
  beforeEach(() => {
    cy.login('super@gmail.com', 'Super@123')
    cy.url().should('include', '/')
    cy.get('[data-testid="Property"]').click()
    cy.url().should('include', '/property')
  })

  it('should display the Add property button', () => {
    cy.get('[data-testid="add-property"]').should('exist')
  })

  it('should add a new property with default data', () => {
    cy.get('[data-testid="add-property"]').click()

    cy.get('#name').type('Green Ellegance')
    cy.get('#available_from').type('2024-04-01')
    cy.get('#bhk').type('3bhk')
    cy.get('#city').type('Anand')
    cy.get('#state').type('Gujarat')
    cy.get('#country').type('India')
    cy.get('#location').type('abc xyz')
    cy.get('#description').type('Property well furnished')
    cy.get('#district').type('Anand')
    cy.get('#address').type('123 Main St')
    cy.get('#landmark').type('Near Park')
    cy.get('#latitude').type('22.0987633')
    cy.get('#longitude').type('22.0987633')
    cy.get('#no_of_balconies').type(2)
    cy.get('#no_of_bathrooms').type(3)
    cy.get('#no_of_bedrooms').type(3)
    cy.get('#no_of_kitchen').type(1)
    cy.get('#no_of_rooms').type(3)
    cy.get('#pin_code').type(123456)
    cy.get('#property_age').type(4)
    cy.get('#property_area').type('1200 sq. ft.')
    cy.get('#property_number').type('S-009')
    cy.get('#property_type').type('House')
    cy.get('#rent').type(4000)
    cy.get('#rent_type').type('Monthly')
    cy.get('#street').type('near park')
    cy.get('#ready_to_move').check()

    cy.get('form').submit()

    cy.wait(2000)
    cy.get('[data-testid="property-list"]').should('exist')
  })
})
