import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const notificationStyle = {color: 'blue'}

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle} className='error'><p>{message}</p></div>
  )
}

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
  
  const showTempNotification = (message) => {
    setErrorMessage(message)
    setTimeout(() => {setErrorMessage(null)}, 4000)
  }

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
        showTempNotification("Blog entry added: "+ returnedBlog.title)
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
      // setErrorMessage('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)

      showTempNotification("These are the wrong credentials")
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
        <div><Notification message={errorMessage} /></div>
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
      <Notification message={errorMessage} />

      <Togglable buttonLabel="create new blog">
        <BlogForm onSubmit={addBlog} handleChange={setNewBlog} values={newBlog}  />
      </Togglable>
      
      <br/>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App
