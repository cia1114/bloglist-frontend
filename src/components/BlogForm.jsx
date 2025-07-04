import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, handleBlogs, notification }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url,setUrl] = useState('')

    const createBlog = async (event) => {
        event.preventDefault()
        
        try {
            const newBlog = await blogService.create({title, author, url})
            const newBlogs = blogs.concat(newBlog)
            handleBlogs(newBlogs)
            notification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
        }
        catch (error) {
            notification(error.response.data.error, false)
        }
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createBlog}>
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
                type="url"
                value={url}
                name="Url"
                onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm