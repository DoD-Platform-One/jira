describe('Basic Jira', function() {
  it('Check Jira is accessible', function() {
    cy.visit(Cypress.env('url'), { timeout: 10000 })
    cy.title().should('include', 'Jira');
  })
})