import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class Library extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    libraryTitle: PropTypes.string.isRequired,
    onBookUpdate: PropTypes.func.isRequired
  }

  state = {
    bookShelves: []
  }

  componentWillReceiveProps(props) {
    this.setBookShelves(props.books);
  }

  /* Returns an array of objects containing an id and Display Name for each found unique bookshelf */
  setBookShelves(books) {
    let uniqueBookShelves = Array.from(new Set(books.map(books => books.shelf)));

    let uniqueBookShelvesObjs = uniqueBookShelves.map(shelf => {

      /* Small lookup table is to provide titles in nice format because given JSON from Database does not provide Shelf Display Names*/
      /* TODO: Remove table once json data provides Display Names for BookShelves */
      let shelfTitles = {
        "currentlyReading": "Currently Reading",
        "wantToRead": "Want To Read",
        "read": "Read"
      };

      return { id: shelf, title: shelfTitles[shelf] ? shelfTitles[shelf] : shelf };
    });

    this.setState({
      bookShelves: uniqueBookShelvesObjs
    });
  }


  render () {

    const { books, libraryTitle } = this.props;
    const {bookShelves} = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>{libraryTitle}</h1>
        </div>
        <div className="list-books-content">

        {bookShelves.map((shelf) => 
          <BookShelf 
            key={shelf.id} 
            id={shelf.id} 
            shelfTitle={shelf.title} 
            books={books.filter(book => book.shelf === shelf.id)}
            onBookUpdate={this.props.onBookUpdate} />
        )}

        </div>

        <div className="open-search">
          <Link to='/search' >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Library