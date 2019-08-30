import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

const blog = {
  title: 'test',
  author: 'test',
  url: 'http://google.com',
  likes: 5
}

test('renders content', () => {
  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container.querySelector('.blog-header')).toHaveTextContent(
    `${blog.title} ${blog.author}`
  )

  expect(component.container.querySelector('.blog-likes')).toHaveTextContent(
    `blog has ${blog.likes} likes`
  )
})

test('n clicks', () => {
  const mockHandler = jest.fn();
  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
