// describe('Admin Management', () => {
//     beforeEach(() => {

//     cy.login('super@gmail.com', 'Super@123');

//     cy.url().should('include', '/');

//     cy.get('[data-testid="Property"]').click();

//     cy.url().should('include', '/property');
//     });

//     it('should display the list of property', () => {
//         cy.get('[data-testid="property-list"]').should('exist');
//     });

//   });

describe('Property', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.login('super@gmail.com', 'Super@123')
    cy.url().should('include', '/')
    cy.get('[data-testid="Property"]').click()
    cy.url().should('include', '/property')
  })

  it('should display the list of Property', () => {
    cy.get('[data-testid="property-list"]').should('exist')
  })

  it('should display the Add Property button', () => {
    cy.get('[data-testid="add-property"]').should('exist')
  })

  it('should display the view Property button', () => {
    cy.get('[data-testid="view-property"]').should('exist')
  })

  it('should display the edit Property button', () => {
    cy.get('[data-testid="edit-property"]').should('exist')
  })

  it('should display the Delete Property button', () => {
    cy.get('[data-testid="delete-property"]').should('exist')
  })

  it('should open the add property modal when the "Add" button is clicked', () => {
    cy.get('[data-testid="add-property"]').click() // Click on the element with aria-label "Add"
    cy.get('[data-testid="add-property-modal"]').should('be.visible')
  })

  it('should open the edit property modal when the "Edit" button is clicked', () => {
    cy.wait(2000)
    cy.get('[data-testid="edit-property"]').eq(0).click() // Click on the element with aria-label "Edit"
    cy.get('[data-testid="edit-property-modal"]').should('be.visible')
  })

  it('should open the view property modal when the "View" button is clicked', () => {
    cy.wait(2000)
    cy.get('[data-testid="view-property"]').eq(0).click()
    cy.get('[data-testid="view-property-modal"]').should('be.visible')
  })

  it('should open the delete property modal when the "Delete" button is clicked', () => {
    cy.wait(2000)
    cy.get('[data-testid="delete-property"]').eq(0).click() // Click on the element with aria-label "Delete"
    cy.get('[data-testid="delete-property-modal"]').should('be.visible')
  })
})
