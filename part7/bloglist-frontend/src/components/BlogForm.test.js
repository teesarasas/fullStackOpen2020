import React, { Component } from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> check blogForm eventhandler work or not', () => {
  const addBlog = jest.fn()
  const component = render(<BlogForm createBlog={addBlog} />)
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'blog title' },
  })
  fireEvent.change(author, {
    target: { value: 'suwat' },
  })
  fireEvent.change(url, {
    target: { value: 'www.fullstackopen.com' },
  })
  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('blog title')
  expect(addBlog.mock.calls[0][0].author).toBe('suwat')
  expect(addBlog.mock.calls[0][0].url).toBe('www.fullstackopen.com')
})