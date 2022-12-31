import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('form calls event handler received as props with right details', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const titleInput = container.querySelector('#title')
  const authorInput = container.querySelector('#author')
  const urlInput = container.querySelector('#url')

  const createButton = screen.getByText('create')

  await user.type(titleInput, 'this is the title')
  await user.type(authorInput, 'this is the author')
  await user.type(urlInput, 'this is the url')
  await user.click(createButton)

  expect(createBlog.mock.calls[0][0]).toEqual({
    'author': 'this is the author',
    'title': 'this is the title',
    'url': 'this is the url'
  })

})