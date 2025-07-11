describe('Home and Login Flow', () => {
  it('should navigate from home to login and log in successfully', () => {

    cy.visit('/');

    cy.contains('Login').click();

    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('password123');

    cy.get('button[type="submit"]').click();

    // Wait for navigation to dashboard
    cy.url().should('include', '/dashboard');
    
    // Wait for either the modal or the main content to load
    cy.get('body').should('exist');
    
    // Check if we can find the dashboard content (might be hidden behind modal)
    cy.contains('AI Cover Letter Generator', { timeout: 10000 }).should('exist');
  });
});
