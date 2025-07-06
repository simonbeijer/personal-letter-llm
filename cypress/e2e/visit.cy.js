describe('Home Page', () => {
  it('Visit home page and should click the Login button and navigate to login page', () => {
    cy.visit('/');
    cy.contains('Login').should('be.visible').click();
    cy.url().should('include', '/login');
    cy.contains('Personal Letter LLM').should('be.visible');
    cy.contains('Sign in to generate personalized cover letters').should('be.visible');
  });
});
