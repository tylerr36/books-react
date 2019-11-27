import React, { useEffect, useState } from 'react'
// import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'

const Book = props => {
  const [book, setBook] = useState(null)
  const userId = props.user._id

  useEffect(() => {
    axios(`${apiUrl}/books/${props.match.params.id}`)
      .then(res => setBook(res.data.book))
      .catch(console.error)
  }, [])

  const handleDelete = event => {
    axios({
      url: `${apiUrl}/books/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(() => {
        props.alert({ heading: 'Success', message: 'You deleted a book', variant: 'warning' })
        props.history.push('/books')
      })
      .catch(() => {
        props.alert({ heading: 'Uh oh', message: 'Something went wrong', variant: 'danger' })
      })
  }

  if (!book) {
    return <p>Loading...</p>
  }

  return (
    <div>
      {/* if book is true, then output the book title, otherwise put a paragraph saying "Loading" */}
      <h2>{book.title}</h2>
      <h2>{book.author}</h2>
      {/* Only show a delete button if the book belong to the user/user's ID */}
      {userId === book.owner._id && <Button onClick ={handleDelete} variant={'danger'}>Delete</Button>}
    </div>
  )
}

export default withRouter(Book)
