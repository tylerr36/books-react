import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'

const Books = props => {
  // this initializes the state
  const [books, setBooks] = useState([])

  // make an API call
  useEffect(() => {
    axios(`${apiUrl}/books`)
      .then(response => {
        // to make our books appear in a mapped list, we create the "const booksJsx" file a few lines down
        setBooks(response.data.books)
      })
    // calling the alert here from the app.js file
    // alert function in the app.js file is expecting a [heading, message, variant], so we have to add those in brackets below
      .then(() => props.alert({ heading: 'Success', message: 'You got books', variant: 'success' }))
      .catch(console.error)
  }, [])

  const booksJsx = books.map(book => (
    <ListGroup.Item key={book._id} as={'a'} href={`#/books/${book._id}`}>
      {book.title}
    </ListGroup.Item>
  ))

  return (
    <div>
      <h1>Books</h1>
      <ListGroup>
        {booksJsx}
      </ListGroup>
    </div>
  )
}

export default Books
