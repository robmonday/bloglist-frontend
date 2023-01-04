import { useState } from 'react'

import blogService from '../services/blogs'

const Blog = ({ blog, user, removeBlogHandler }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeBlog = () => {
    blogService
      .update(blog.id, { ...blog, likes: likes + 1 })
      .then(returnedBlog => {
        setLikes(returnedBlog.likes)
      })
  }

  const removeButton = () => (
    <button onClick={() => removeBlogHandler(blog.id)}>remove</button>
  )

  return (
    <div style={blogStyle}>
      <div className='headline'>
        {blog.title} {blog.author} &nbsp;
        <button className="view-button" onClick={() => setVisible(true)} style={hideWhenVisible}>view</button>
        <button onClick={() => setVisible(false)} style={showWhenVisible}>hide</button>
      </div>
      <div style={showWhenVisible} className='detail'>
        <a href={blog.url}>{blog.url}</a><br />
        { likes } likes <button className="like-button" onClick={() => {likeBlog()}}>like</button><br />
        {blog.user.name} <br />
        { user.name === blog.user.name ? removeButton() : null }
      </div>
    </div>
  )
}

export default Blog