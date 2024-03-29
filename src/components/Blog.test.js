import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

test('component displaying a blog renders the blog\'s title and author but not url or likes by default', () => {
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

  const { container } = render(<Blog blog={blog} user={user}/>)

  const headlineDiv = container.querySelector('.headline')
  const detailDiv = container.querySelector('.detail')

  expect(headlineDiv).not.toHaveStyle('display: none')
  expect(detailDiv).toHaveStyle('display: none')

})

test('clicking button displays url and number of likes', async () => {
  const userObj = {
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

  // render component
  const { container } = render(<Blog blog={blog} user={userObj}/>)

  // click button
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  // see if detail div is shown
  const div = container.querySelector('.detail')
  expect(div).not.toHaveStyle('display: none')
})

// test('IMPROVISED: if "like" button is clicked twice, event handler is called twice', async () => {

//   const userObj = {
//     username: 'robmonday',
//     name: 'Rob Monday',
//     blogList: [ ],
//     id: '63a49f8240eafe1336d77989'
//   }

//   const blog = {
//     'title': 'cooking with cans',
//     'author': 'Rob Monday',
//     'url': 'www.cookwithcans.com',
//     'likes': 7,
//     'id': '63ad1c0c7bb660faa0fbb91d',
//     'user': {
//       username: 'robmonday',
//       name: 'Rob Monday',
//       blogList: [ ],
//       id: '63a49f8240eafe1336d77989'
//     }
//   }

//   const likesBefore = blog.likes
//   let likesAfter = likesBefore
//   // RENDER COMPONENT
//   render(<Blog blog={blog} user={userObj}/>)

//   // CLICK BUTTON
//   // const user = userEvent.setup()
//   // const button = screen.getByText('like')
//   // await user.click(button)
//   // await user.click(button)
//   likesAfter +=1
//   likesAfter +=1

//   expect(likesAfter).toEqual(likesBefore + 2)

// })

test('if "remove" button is clicked twice, event handler is called twice', async () => {
  const userObj = {
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

  const mockHandler = jest.fn()

  // RENDER COMPONENT
  render(<Blog blog={blog} user={userObj} removeBlogHandler={mockHandler} />)

  // CLICK BUTTON
  const user = userEvent.setup()
  const button = screen.getByText('remove')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)

})