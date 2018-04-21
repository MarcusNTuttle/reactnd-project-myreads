import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'
class BookShelf extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfTitle: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onBookUpdate: PropTypes.func.isRequired
  }

  listBooks(books) {
    return(
      <ol className="books-grid">
        {books.map(book => 
          <li key={'li_'+ book.id}>
            <Book
              key={book.id}
              book={book}
              onBookUpdate={this.props.onBookUpdate}
            />
          </li>
        )}
      </ol >
    );
  }

  render () {
    const { books, shelfTitle } = this.props;
    return (

      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{shelfTitle}</h2>
          <div className="bookshelf-books">
            {this.listBooks(books)}
          </div>
        </div>
      </div>
    )
  }

}

export default BookShelf