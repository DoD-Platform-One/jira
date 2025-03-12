describe('Basic Jira', function() {
  it('Check Jira is accessible', function() {
    cy.visit(Cypress.env('url'))
    cy.title().should('include', 'Jira');
  })
})