import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createNotification = (message, isSuccess = true) => {
    setNotification({ message: message, isSuccess: isSuccess })
    setTimeout(() => { setNotification(null) }, 5000)
  }

  const createBlog = async ({ title, author, url }) => {

    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create({ title, author, url })
      const newBlogs = blogs.concat(newBlog)
      setBlogs(newBlogs)
      createNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    }
    catch (error) {
      createNotification(error.response.data.error, false)
    }
  }

  const updateBlog = async (blogToUpdate) => {
    try {
      await blogService.update(blogToUpdate)
      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs)
    } catch (error) {
      createNotification(error.response.data.error, false)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      const newBlogs = blogs.filter( blog => blog.id !== id)
      setBlogs(newBlogs)
    } catch (error) {
      createNotification(error.response.data.error, false)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      createNotification(error.response.data.error, false)
    }
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  blogs.sort( (a,b) => b.likes - a.likes)

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <div>{user.name} logged in
        <button type="button" onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel='new blog' ref={blogFormRef} >
        <BlogForm createBlog={createBlog} />
      </Togglable>

      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog} />
      )}
    </div>
  )
}

export default App