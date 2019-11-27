import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Books from '../Books/books'
import Book from '../Books/book'
import CreateBook from '../Books/create-book'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  // this is a function to set a state.
  // setting the state rerenders...
  alert = ({ heading, message, variant }) => {
    // variant is a bootstrap variant. Green for success, red for failure, etc.
    // when it receives these three properties, it sets the state by
    // the "..." spread operator creates a copy, placs it inside of out new array that was defined with the square brackets, and appends our new message onto the end
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/books' render={() => (
            <Books alert={this.alert}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/create-book' render={() => (
            <CreateBook alert={this.alert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} path='/books/:id' render={() => (
            <Book alert={this.alert} user={user}/>
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
