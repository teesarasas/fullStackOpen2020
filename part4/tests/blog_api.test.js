const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

})

describe('when there is initially some blog saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the first blog is about React patterns', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain('React patterns')
  })
})

describe('viewing a specific blog', () => {
  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new blog', () => {
  test('a unique identifier is id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('a valid blog can be added', async () => {
    const passwordHash = await bcrypt.hash('salainen', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
    const response = await api
      .post('/api/login')
      .send({ username: 'root', password: 'salainen' })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = response.body.token

    const newBlog = {
      title: 'dog factory',
      author: 'suwat',
      url: 'www.dogfactory.com',
      likes: 23
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain(
      'dog factory'
    )
  })

  test('blog without content is not added', async () => {
    const passwordHash = await bcrypt.hash('salainen', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
    const response = await api
      .post('/api/login')
      .send({ username: 'root', password: 'salainen' })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = response.body.token

    const newBlog = { likes: 2 }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('if title and url are missing return status code 400', async () => {
    const passwordHash = await bcrypt.hash('salainen', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
    const response = await api
      .post('/api/login')
      .send({ username: 'root', password: 'salainen' })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = response.body.token

    const newBlog = {
      author: 'matti',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('if likes property is missing default to 0', async () => {
    const passwordHash = await bcrypt.hash('salainen', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
    const response = await api
      .post('/api/login')
      .send({ username: 'root', password: 'salainen' })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = response.body.token
    const newBlog = {
      title: 'dog factory',
      author: 'suwat',
      url: 'www.dogfactory.com'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0)
  })
})

describe('deletion of a blog', () => {
  test('a blog can be deleted', async () => {
    const passwordHash = await bcrypt.hash('salainen', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
    const response = await api
      .post('/api/login')
      .send({ username: 'root', password: 'salainen' })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = response.body.token

    const newBlog = {
      title: 'blogToDelete',
      author: 'somani',
      url: 'www.deleteblog.org',
    }

    const delBlog = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = delBlog.body

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('update blog', () => {
  test('update likes for blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = 28

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(blogsAtStart[0].likes).toBe(28)
  })
})

afterAll(() => {
  mongoose.connection.close()
})