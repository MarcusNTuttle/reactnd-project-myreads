import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'
class BookShelf extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfTitle: PropTypes.string.isRequired,
  }

  render () {
    return (

      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              <li>
                <Book 
                  bookCoverUrl='http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api'
                  bookTitle='Marcus Tuttle'
                  bookAuthors={['marcus', 'john']}
                  />
              </li>
            </ol>
          </div>
        </div>
      </div>
    )
  }

}

export default BookShelf