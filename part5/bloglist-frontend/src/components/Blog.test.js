import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

  const user = {
    username: "root",
    name: "Superuser",
    id: "5fe88d6a78e1c814588b16bb"
  }

  const blog = {
    likes: 1,
    title: "CanIPass",
    author: "JeongSoman",
    url: "www.canipass.com",
    user: {
        username: "root",
        name: "Superuser",
        id: "5fe88d6a78e1c814588b16bb"
    },
    id: "5fe899895530a41775e811d4"
  }

  const mockHandler = jest.fn()

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} updateLikes={mockHandler}/>
    )
  })


  test('render title and author', () => {

    expect(component.container).toHaveTextContent(
      'CanIPass' && 'JeongSoman'
    )

    const div = component.container.querySelector('.blogRender')
    expect(div).toHaveTextContent(
      'CanIPass' && 'JeongSoman'
    )
  })

  test('render its children', () => {
      expect(
        component.container.querySelector('.blog')
      ).toBeDefined()
    })

  test('at start the children are not displayed', () => {
      const div = component.container.querySelector('.viewHide')

      expect(div).toHaveTextContent('view')
    })

  test('after clicking the button, children are displayed', () => {
      const button = component.getByText('view')
      fireEvent.click(button)

      const div = component.container.querySelector('.viewHide')
      expect(div).not.toHaveTextContent('view')
    })

  test('if the like button is clicked twice, called twice', () => {
    const viewbutton = component.getByText('view')
    fireEvent.click(viewbutton)


    const likesButton = component.container.querySelector('.likesButton')
    fireEvent.click(likesButton)
    fireEvent.click(likesButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
