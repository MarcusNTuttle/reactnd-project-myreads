import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookUpdate: PropTypes.func.isRequired
  }

  render () {
    const { books } = this.props;

    return (
      <ol className="books-grid">
        {books.map(book =>
          <li key={'li_' + book.id}>
            <Book
              key={book.id}
              book={book}
              onBookUpdate={this.props.onBookUpdate}
            />
          </li>
        )}
      </ol>
    )
  }
}

export default ListBooks