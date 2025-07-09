import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url,setUrl] = useState('')

  const create = (event) => {
    event.preventDefault()
    
    createBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Blog"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" id="create-button">create</button>
      </form>
    </div>
  )
}

export default BlogForm