describe('Bookmark Toggle Button Test', () => {
  beforeEach('Log in and Navigate', () => {
    cy.visit('http://localhost:3000/');
    cy.wait(4000); // Adjust wait time as necessary

    // Log in
    cy.get('[test-id="Login"]').should("exist").click();
    cy.wait(1000);
    cy.get('[test-id="email-input"]').should("exist");
    cy.get('[test-id="password-input"]').should("exist");
    cy.get('input[name="email"]').type('dureti104@gmail.com');
    cy.get('input[name="password"]').type('12345');
    cy.get('[test-id="submit"]').click();
    cy.wait(5000); // Wait for login to complete and elements to load
  });

  it('should toggle color between orange and gray when clicked', () => {
    cy.get('[test-id="65509e9353a7667de6ef5a60"]')
      .should('exist')
      .and('be.visible')
      .wait(10000)
      .should('have.css', 'color', 'rgb(255, 165, 0)') // Use the exact RGB value for orange
    cy.get('[test-id="65509e9353a7667de6ef5a60"]').click();
    cy.wait(5000); // Adjust wait time as necessary
    cy.get('[test-id="65509e9353a7667de6ef5a60"]').should('have.css', 'color', 'rgb(128, 128, 128)'); // Use the exact RGB value for gray
  });
});
