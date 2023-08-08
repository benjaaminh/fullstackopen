describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }

    const user2= {
      name: 'tester',
      username: 'test',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users',user)
    cy.request('POST', 'http://localhost:3003/api/users',user2)
  })

  it('Login form is shown', function() {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('logging in', function(){
    it('login is succeeded with right credentials', function(){
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
  
  cy.contains('Matti Luukkainen logged in')    
    })

    it('login is failed with wrong credentials', function(){
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
  
  cy.contains('failed: wrong username or password')    

  })
})

describe('when logged in', function() {
  beforeEach(function() {
    cy.login({ username: 'mluukkai', password: 'salainen' })

})

it('a new blog can be created', function() {
  cy.contains('new blog').click()
  cy.get('#title').type('a blog created by cypress')
  cy.get('#author').type('cypress')
  cy.get('#url').type('www.fullstackopen.com')
  cy.get('#create-button').click()
  cy.contains('a blog created by cypress cypress')
  cy.contains('view')
})


describe('blog has been created', function() {
  beforeEach(function() {
    cy.createBlog({ 
      title:'a blog created by cypress',
      author:'cypress',
      url:'www.fullstackopen.com'
    })
})

it('it can be liked', function () {
  cy.contains('a blog created by cypress cypress')
  cy.get('#view-button').click()
  cy.get('#like-button').click()
  cy.contains('likes 1')
})

it('it can be deleted', function () {
  cy.contains('a blog created by cypress cypress')
  cy.get('#view-button').click()
  cy.get('#remove-button').click()
  
  cy.get('html').should('not.contain', 'a blog created by cypress cypress')
})

it('only creator can see delete button', function () {
  cy.contains('logout').click()
  cy.login({ username: 'test', password: 'salainen' })

  cy.get('#view-button').click()
  cy.contains('a blog created by cypress cypress').parent().should('not.contain', '#remove-button')
  cy.get('#view-button').click()

  cy.createBlog({ 
    title:'testblog',
    author:'tester',
    url:'www.fullstackopen.com'
  })

cy.contains('testblog tester').parent().find('#view-button').click()
cy.contains('testblog tester').parent().find('#remove-button')

})

it.only('blogs are ordered by likes with most likes being first', function () {
  cy.createBlog({ 
    title:'testblog',
    author:'tester',
    url:'www.fullstackopen.com'
  })

  cy.contains('a blog created by cypress cypress').parent().find('#view-button').click()
  cy.contains('a blog created by cypress cypress').parent().find('#like-button').click()
  cy.contains('a blog created by cypress cypress').parent().find('#view-button').click()
  cy.contains('testblog tester').parent().find('#view-button').click()
  cy.contains('testblog tester').parent().find('#like-button').click()
  cy.request('GET', 'http://localhost:3000')
  cy.contains('testblog tester').parent().find('#like-button').click()

  cy.get('.blog').eq(0).should('contain', 'testblog tester')
cy.get('.blog').eq(1).should('contain', 'a blog created by cypress cypress')
})


})
})


})