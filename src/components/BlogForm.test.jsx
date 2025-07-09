import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calls onSubmit with proper arguments', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog}/>)
  
  const inputs = screen.getAllByRole('textbox')
  const button = screen.getByText('create')
  
  await user.type(inputs[0], 'creating a new blog...')
  await user.type(inputs[1], 'the owner')
  await user.type(inputs[2], 'www.theowner.com')
  await user.click(button)
  
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('creating a new blog...')
  expect(createBlog.mock.calls[0][0].author).toBe('the owner')
  expect(createBlog.mock.calls[0][0].url).toBe('www.theowner.com')
  
})