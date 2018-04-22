import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import PropTypes from 'prop-types'


class AddBook extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
  }

  clearQuery = () => {
    this.updateQuery('');
  }


  render() {
    const { query } = this.state
    const { books } = this.props

    return (    
      <div className="search-books">
        {console.log(query)}
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
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
            <listBooks books={books} />
          </ol>
        </div>
      </div>
    )
  }



}
  export default AddBook