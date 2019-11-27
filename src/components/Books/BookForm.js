import React from 'react'
import { Link } from 'react-router-dom'

const BookForm = ({ book, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label htmlFor="title">Title</label>
    <input
      id="title"
      placeholder="Enter your book"
      value={book.title}
      name="title"
      onChange={handleChange}
    />

    <label htmlFor="author">Author</label>
    <input
      id="author"
      placeholder="Enter author"
      value={book.author}
      name="author"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button type="button">Cancel</button>
    </Link>
  </form>
)

export default BookForm
