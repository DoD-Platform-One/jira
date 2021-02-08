// needs to be fixed
describe('Basic Jira', function() {
  it('Check Jira is accessible', function() {
  cy.visit(Cypress.env('jira_url'))
  cy.wait(5000);
  cy.contains('Jira setup') 
  })
})

