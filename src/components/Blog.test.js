import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {

  const user = {
    username: 'robmonday',
    name: 'Rob Monday',
    blogList: [ ],
    id: '63a49f8240eafe1336d77989'
  }

  const blog = {
    'title': 'cooking with cans',
    'author': 'Rob Monday',
    'url': 'www.cookwithcans.com',
    'likes': 7,
    'id': '63ad1c0c7bb660faa0fbb91d',
    'user': {
      username: 'robmonday',
      name: 'Rob Monday',
      blogList: [ ],
      id: '63a49f8240eafe1336d77989'
    }
  }

  render(<Blog blog={blog} user={user}/>)

  const element = screen.getByText('cooking with cans', { exact : false })

  expect(element).toBeDefined()

})

