describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Superuser',
      username: 'root',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('blogs')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
  })

  describe('login', function() {
    it('succeeds with correct username and password', function() {
      cy.contains('login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Superuser logged in')
    })

    it('login fails with wrong username or password', function() {
      cy.contains('login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Superuser logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('create blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('suwat')
      cy.get('#url').type('www.createdbycypress.com')
      cy.get('#create-button').click()
      cy.contains('a blog created by cypress')
      cy.contains('suwat')
      cy.contains('www.createdbycypress.com')
    })

    describe('and a blog exits', function() {
      beforeEach(function () {
        cy.createBlog({
          title: 'another blog cypress',
          author: 'suwat',
          url: 'www.suwat.com'
        })

        cy.createBlog({
          title: 'blog have likes 42',
          author: 'suwat',
          url: 'www.suwat.com',
          likes: 42
        })

        cy.createBlog({
          title: 'blog have likes 18',
          author: 'suwat',
          url: 'www.suwat.com',
          likes: 18
        })
      })

      it('user can like a blog', function() {
        cy.contains('view').click()
        cy.contains('like').then(buttons => {
          cy.wrap(buttons[0]).click()
        })
        cy.contains('likes 1')
      })

      it('blogs displays by the most like number', function() {
        cy.get('.blogRender').should('have.length', 3)
          .then(blogs => {
            blogs.sort((a,b) => b.likes - a.likes)
            cy.wrap(blogs[0]).should('contain', 'blog have likes 42')
            cy.wrap(blogs[1]).should('contain', 'blog have likes 18')
            cy.wrap(blogs[2]).should('contain', 'another blog cypress')
          })
      })

      it('user can delete a blog', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'blog have likes 42')
      })

      it('unauthorize user cannot delete blog', function() {
        const anotherUser = {
          name: 'SonHuengMin',
          username: 'another',
          password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', anotherUser)
        cy.contains('logout').click()
        cy.contains('login').click()
        cy.login({ username: 'another', password: 'salainen' })
        cy.contains('view').click()
        cy.get('html').should('not.contain', 'remove')
      })
    })
  })
})