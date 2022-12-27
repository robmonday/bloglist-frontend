import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({})
  const [errorMessage, setErrorMessage ] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      "title": newBlog.title,
      "author": newBlog.author,
      "url": newBlog.url,
      "userId": "63a49f8240eafe1336d77989"
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog({author: "", title: "", url: ""})
      })
  }
  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({username, password})

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBloglistUser')
  }

  
  if (user === null) {
    return (
      <div>
        <h2>Log in to the application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username: 
            <input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)} />
          </div>
          <div>
            password: 
            <input type="password" value={password} name="Password" onChange={({target}) => setPassword(target.value)} />
            <br /><br />
            <button type="submit">login</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <div>
        <h2>blogs</h2>
        <p>
          {user.name} logged in &nbsp;
          <button onClick={handleLogout}>logout</button>
        </p>
      </div>
      <div>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <label for="title">title: </label>
          <input type="text" value={newBlog.title} id="title" name="Title" onChange={({target}) => {setNewBlog({ ...newBlog, title: target.value, })}} /><br/>
          <label for="author">author: </label>
          <input type="text" value={newBlog.author} id="author" name="Author" onChange={({target}) => {setNewBlog({ ...newBlog, author: target.value, })}} /><br/>
          <label for="url">url: </label>
          <input type="text" value={newBlog.url} id="url" name="Url" onChange={({target}) => {setNewBlog({ ...newBlog, url: target.value, })}} /><br/><br/>
          <input type="submit" value="create" />
        </form>
      </div><br/>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App
