import { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({
  blog,
  updateBlog,
  deleteBlog
}) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  const incrementLike = () => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    })
  }

  const remove = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  const viewDetails = () => (
    <div>
      {blog.url}<br />
      {`${blog.likes}  `}
      <button onClick={incrementLike}>like</button><br />
      {`Add by: ${blog.user.name}`}<br />
      { blog.user.username === JSON.parse(window.localStorage.getItem('loggedUser')).username && 
        <button onClick={remove}>Delete</button>
      }
    </div>
  )

  return (
    <div style={blogStyle} data-testid='blog'>
      <div>
        {`${blog.title} ${blog.author} `}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view' }</button>
      </div>
      { visible && viewDetails()}
    </div>
  )}

export default Blog