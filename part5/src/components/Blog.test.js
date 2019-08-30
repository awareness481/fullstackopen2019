import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

const blog = {
  title: 'test',
  author: 'test',
  url: 'http://google.com',
  likes: 5
}

const component = render(
  <Blog blog={blog} />
)

test('only renders blog title before click', () => {
  expect(component.container.querySelector('.blog-title')).toHaveTextContent(
    `${blog.title}`
  )

  expect(component.container.querySelector('.blog-details')).toHaveStyle(
    'display: none'
  )
})

test('show blog details after click', () => {
  const title = component.container.querySelector('.blog-title')
  fireEvent.click(title)

  expect(component.container.querySelector('.blog-details')).toHaveStyle(
    'display: block'
  )
})