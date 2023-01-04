describe('Bloglist', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Rob Monday',
      username: 'robmonday',
      password: 'abc123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to the application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('robmonday')
      cy.get('#password').type('abc123')
      cy.get('#login-button').click()
      cy.contains('Rob Monday logged in')
    })

    it('fails with wrong credentials, error message is blue', function() {
      cy.get('#username').type('robmonday')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'These are the wrong credentials')
        .and('have.css', 'color','rgb(0, 0, 255)')
    })
  })

})