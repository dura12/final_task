describe('Bookmark Toggle Button Test', () => {
  beforeEach('Log in and Navigate', () => {
    cy.visit('http://localhost:3000/');
    cy.wait(4000); 
    cy.get('[test-id="Login"]').should("exist").click();
    cy.wait(1000);
    cy.get('[test-id="email-input"]').should("exist");
    cy.get('[test-id="password-input"]').should("exist");
    cy.get('input[name="email"]').type('dureti104@gmail.com');
    cy.get('input[name="password"]').type('12345');
    cy.get('[test-id="submit"]').click();
    cy.wait(10000); 
  });

  it('should toggle color between orange and gray when clicked', () => {
    cy.get('[test-id="65509e9353a7667de6ef5a60"]')
      .should('exist')
      .and('be.visible')
      .wait(10000)
      .should('have.css', 'color', 'rgb(128, 128, 128)') 
    cy.get('[test-id="65509e9353a7667de6ef5a60"]').click();
    cy.wait(5000); 
    cy.get('[test-id="65509e9353a7667de6ef5a60"]').should('have.css', 'color', 'rgb(255, 165, 0)'); 
    cy.wait(5000)
  });
  it ("should save the job post to the saved bookmarks" , ()=>{
    cy.get('[test-id="savedjob"]').click()
    cy.contains("h1" , "Volunteer Software Development Mentor" )
    cy.wait(5000)
  })
  it ("should delete the job post from the saved bookmarks" , ()=>{
    cy.get('[test-id="65509e9353a7667de6ef5a60"]').click();
    cy.wait(5000); 
    cy.get('[test-id="savedjob"]').click()
    cy.contains('h1' , "No Bookmarked Jobs");

  })
});
