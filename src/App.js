import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Library from './Library'
import AddBook from './AddBook'


class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentWillMount() {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => (
        {books}
      ))
    })
  }

  updateBookLocation = (book, shelf) => {
    BooksAPI.update(book, shelf);

    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => (
          { books }
        ))
      })

  }

  render() {
    const { books } = this.state

    return (
      <div className="app">

        <Route exact path='/' render={() => (
          <Library 
            books={this.state.books} 
            libraryTitle="My Reads" 
            onBookUpdate={this.updateBookLocation}/>
        )} />

        <Route path='/search' render={({ history }) => (
          
          <AddBook books={this.state.books}  />

        )} />

      </div>
    )
  }
}

export default BooksApp
