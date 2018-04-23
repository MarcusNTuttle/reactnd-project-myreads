import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'

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

  componentDidMount() {
    this.setBookShelves(this.props.books);
  }

  /* Returns an array of objects containing an id and Display Name for each found unique bookshelf */
  setBookShelves(books) {
    let uniqueBookShelves = books.map(books => books.shelf)

    uniqueBookShelves = uniqueBookShelves.concat(["currentlyReading", "wantToRead", "read"]) /*Force default BookShelves, even if there are no books */

    uniqueBookShelves = Array.from(new Set(uniqueBookShelves)); /* Remove any repeat bookShelves in array */

    let uniqueBookShelvesObjs = uniqueBookShelves.map(shelf => {

      /* Small lookup table is to provide titles in nice format because given JSON from Database does not provide Shelf Display Names*/

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

  /* Checks if BookShelf has any related books to it, if not, displays message */
  renderBooksShelves(books, shelf) {
    if (books === undefined || books.length === 0) {
      return (<div>No Books Available</div>)

    } else {
      return (
        <div>
          <ListBooks
            key={shelf.id}
            id={shelf.id}
            books={books}
            onBookUpdate={this.props.onBookUpdate} />
        </div>
      )
    }
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
            <div className="bookshelf" key={"bookshelf-" + shelf.id} >
              <h2 className="bookshelf-title" key={"bookshelf-title-" + shelf.id} > {shelf.title}</h2>
              <div className="bookshelf-books" key={"bookshelf-books-" + shelf.id} >
                {this.renderBooksShelves(books.filter(book => book.shelf === shelf.id),shelf)}
              </div>
            </div>
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