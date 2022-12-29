import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
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
    setTimeout(() => {setErrorMessage(null)}, 3000)
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        showTempNotification('Blog entry added: '+ returnedBlog.title)
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

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

      showTempNotification('These are the wrong credentials')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBloglistUser')
  }

  const removeBlogHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {

      const updatedBlogs = []
      for (const blog of blogs) {
        if (blog.id !== id) {
          updatedBlogs.push(blog)
        }
      }

      blogService
        .deleteBlog(id)
        .then(setBlogs(updatedBlogs))

      showTempNotification('Record deleted')
    }
  }

  const handleUsernameChange = ({ target }) => setUsername(target.value)

  const handlePasswordChange = ({ target }) => setPassword(target.value)

  if (user === null) {
    return (
      <>
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          username={username}
          password={password}
        />
        <Notification message={errorMessage} />
      </>
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
        <BlogForm createBlog={addBlog} />
      </Togglable>

      <br/>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} removeBlogHandler={removeBlogHandler} />
        )}
      </div>
    </div>
  )
}

export default App
