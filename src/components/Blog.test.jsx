import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'


test('should render blog\'s title and author, not likes or url ', () => { 
    const blog = {
        title: 'testing render blog',
        author: 'the owner',
        url: 'www.owner.com',
        likes: 5
    }

    render(<Blog blog={ blog } />)
    const element = screen.getByText('testing render blog', { exact: false })
    const element1 = screen.getByText('the owner', { exact: false })
    const element2 = screen.queryByText('www.owner.com')
    const element3 = screen.queryByText('5')
    
    expect(element).toBeDefined()
    expect(element1).toBeDefined()
    expect(element2).toBeNull()
    expect(element3).toBeNull()
})

test('should render blog\'s url and likes, when clicking button',  async () => { 
    const blog = {
        title: 'testing render blog',
        author: 'the owner',
        url: 'www.owner.com',
        likes: 5,
        user: {
            name: 'Juan'
        }
    }

    render(<Blog blog={ blog } />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const element = screen.getByText('www.owner.com', { exact: false })
    const element1 = screen.getByText('5', { exact: false })
    
    expect(element).toBeDefined()
    expect(element1).toBeDefined()
})

test('clicking twice the button like calls event handler twice', async () => {
  const blog = {
        title: 'testing render blog',
        author: 'the owner',
        url: 'www.owner.com',
        likes: 5,
        user: {
            name: 'Juan'
        }
    }
  //El controlador de eventos es la función mock definida con Vitest
  const updateBlog = vi.fn()

  render(
    <Blog blog={blog} updateBlog={updateBlog} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  
  const buttonLike = screen.getByText('like')
  await user.click(buttonLike)
  await user.click(buttonLike)

  expect(updateBlog.mock.calls).toHaveLength(2) 
})