import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Book extends Component {

  static propTypes = {
    bookTitle: PropTypes.string.isRequired,
    bookAuthors: PropTypes.array.isRequired,
    bookCoverUrl: PropTypes.string.isRequired
  }


  state = {
    currentShelf: 'currentlyReading'
  }

  render () {
    return (

      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${this.props.bookCoverUrl}')`}}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.bookTitle}</div>
        <div className="book-authors">{this.props.bookAuthors}</div>
      </div>

    )
  }

}

export default Book