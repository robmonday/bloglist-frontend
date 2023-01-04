import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({})

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      'title': newBlog.title,
      'author': newBlog.author,
      'url': newBlog.url,
    })

    setNewBlog({ author: '', title: '', url: '' })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <label htmlFor="title">title: </label>
        <input type="text" value={newBlog.title} id="title" name="Title" onChange={({ target }) => {setNewBlog({ ...newBlog, title: target.value, })}} /><br/>
        <label htmlFor="author">author: </label>
        <input type="text" value={newBlog.author} id="author" name="Author" onChange={({ target }) => {setNewBlog({ ...newBlog, author: target.value, })}} /><br/>
        <label htmlFor="url">url: </label>
        <input type="text" value={newBlog.url} id="url" name="Url" onChange={({ target }) => {setNewBlog({ ...newBlog, url: target.value, })}} /><br/><br/>
        <input type="submit" id="create-button" value="create" />
      </form>
    </div>
  )
}

export default BlogForm