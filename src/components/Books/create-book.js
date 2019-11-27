import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import BookForm from './BookForm'

const CreateBook = props => {
  const [book, setBook] = useState({ title: '', author: '' })
  // const [createdBookId, setCreatedBookID] = useState(null)

  const handleChange = event => {
    event.persist()
    setBook({ ...book, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/books`,
      method: 'POST',
      headers: {
        // or write "Token token ${props.user.token}" if using rails
        'Authorization': `Bearer ${props.user.token}`
      },
      data: { book }
    })
      .then(response => {
        props.alert({ heading: 'Success', message: 'You created a book', variant: 'success' })
        props.history.push(`/books/${response.data.book._id}`)
      })
      .catch(console.error)
  }

  // if (createdBookId) {
  //   return <Redirect to={`/books/${createdBookId}`} />
  // }

  return (
    <BookForm
      book={book}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      cancelPath='/'
    />
  )
}

export default withRouter(CreateBook)
