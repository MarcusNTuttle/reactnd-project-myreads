import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import PropTypes from 'prop-types'


class AddBook extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookUpdate: PropTypes.func.isRequired,
    getNewBooks: PropTypes.func.isRequired,
    updateBooks: PropTypes.func.isRequired
  }

  state = {
    query: '',
  }

  componentWillUnmount(){
    this.props.updateBooks();
  }

  /* Update the query state and books state based on user input from form */
  updateQuery = (query) => {
    if (query !== '') {
      this.props.getNewBooks(query)

      this.setState(() => ({
        query: query
      }))
    } else {
      this.setState(() => ({
        query: ''
      }))
      this.props.updateBooks();
    }
  }



  render() {
    const { query } = this.state
    const { books, onBookUpdate } = this.props

    return (    
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" 
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <ListBooks books={books} onBookUpdate={onBookUpdate} />
          </ol>
        </div>
      </div>
    )
  }



}
  export default AddBook