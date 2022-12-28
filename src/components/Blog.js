import { useState } from "react"

import blogService from '../services/blogs'

const Blog = ({ blog }) => {
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
      .update(blog.id, {...blog, likes: likes + 1})
      .then(returnedBlog => {
        // console.log(returnedBlog)
        setLikes(returnedBlog.likes)
      })
  }
  
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} &nbsp;
      <button onClick={() => setVisible(true)} style={hideWhenVisible}>view</button>
      <button onClick={() => setVisible(false)} style={showWhenVisible}>hide</button>
      <div style={showWhenVisible}>
        <a href={blog.url}>{blog.url}</a><br />
        { likes } likes <button onClick={() => {likeBlog()}}>like</button><br />
        {blog.user.name}
      </div>
    </div>  
  )
}

export default Blog