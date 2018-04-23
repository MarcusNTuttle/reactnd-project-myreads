import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Library from './Library'
import AddBook from './AddBook'


class BooksApp extends React.Component {
  state = {
    books: [],
    booksInLibrary: []
  }

  componentDidMount() {
    this.updateBooks();
  }

  /* Updates the database with shelf status for the given book object with the given shelf name
    then updates the local books and booksInLibrary State */
  updateBookLocation = (book, shelf, update) => {
    BooksAPI.update(book, shelf);

    if(update) {
      this.updateBooks();
    }
  }

  /* Queries the database with the given query and returns the results within books state 
    If returned result was not an array of books, books state is set to empty*/
  getNewBooks = (query) => {
    BooksAPI.search(query).then((newBooks) => {
      if (Array.isArray(newBooks)) {

        /* Go through results, and add shelf information to book objs if already within the library */ 
        this.state.booksInLibrary.forEach(book => {
          newBooks.forEach(newBook => {
            if (newBook.id === book.id && book.shelf) {
              newBook.shelf = book.shelf;
            }
          })
        })

        this.setState(() => ({
          books: newBooks
        }))
      }
      else { this.setState(() => ({ books: [] })) }
      })
  }

  /* Grabs library information form database, and updates related states */
  updateBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books: books,
        booksInLibrary: books
      }))
    })
  }

  /* Renders the Library Component after book ensuring books have returned from database */
  renderLibrary(books) {
    if (books !== undefined && books.length !== 0) {
      return( 
        <Library
          books={books}
          libraryTitle="My Reads"
          onBookUpdate={(book, shelf) => {
            this.updateBookLocation(book, shelf, true)
          }} />
      )
    }
    else {  return(<div className="Loading-icon"></div>) }
  }

  render() {
    const { books } = this.state

    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <div>
            {this.renderLibrary(books)}
          </div>
        )}/>

        <Route path="/search" render={({ history }) => (
          <AddBook books={books}
          onBookUpdate={this.updateBookLocation} 
          getNewBooks={this.getNewBooks}
          updateBooks={this.updateBooks}
            />
        )}/>

      </div>
    )
  }
}
export default BooksApp
