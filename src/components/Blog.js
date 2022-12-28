import { useState } from "react"


const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} &nbsp;
      <button onClick={() => setVisible(true)} style={hideWhenVisible}>view</button>
      <button onClick={() => setVisible(false)} style={showWhenVisible}>hide</button>
      <div style={showWhenVisible}>
        <a href={blog.url}>{blog.url}</a><br />
        {blog.likes || 0} likes <button>like</button><br />
        {blog.user.name}
      </div>
    </div>  
  )
}

export default Blog