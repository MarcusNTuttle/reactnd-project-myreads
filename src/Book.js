import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    onBookUpdate: PropTypes.func.isRequired
  }

  state = {
    currentShelf: this.props.book.shelf
  }

  componentWillReceiveProps() {
    this.setState({
      currentShelf: this.props.book.shelf
    });
  }
  

  handleSelect = (event) => {
    event.preventDefault()

    if (this.props.onBookUpdate) {
      this.props.onBookUpdate(this.props.book, event.target.value)
    }
  }



  render () {

    const { book } = this.props;

    let bookImage = book.imageLinks ? book.imageLinks.smallThumbnail : '';
    let bookAuthors = book.authors ? book.authors : '';
    let bookShelf = book.shelf ? book.shelf : 'none'

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${bookImage}')`}}></div>
          <div className="book-shelf-changer">
            <select value={bookShelf} onChange={this.handleSelect}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{bookAuthors}</div>
      </div>

    )
  }

}

export default Book