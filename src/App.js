import React, { Component } from 'react'
import { Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import BookSearch  from './BookSearch'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    markList: {
      currentlyReading:"Currently reading",
      wantToRead:"Want to read",
      read:"Read"//
    }
  }

  changeState = this.changeState.bind(this);
  changeShelfState = this.changeShelfState.bind(this);

	changeState() {
    const showSearchPage = this.state.showSearchPage;
		this.setState({ showSearchPage: true })
	}

  changeShelfState() {
    const books = this.state.books;
    BooksAPI.getAll().then(books => this.setState({books}))
  }

  downloadImg(url) {
    return fetch(url, {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        "Access-Control-Expose-Headers": "Content-Length, X-JSON"
      }}).then(img => img)
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      console.log(books)
      return this.setState({books})})
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Route path='/search' render={( history ) => (
            <BookSearch
              markList={this.state.markList}
              changeShelfState={ this.changeShelfState }
              onSearch={() => {
                history.push('/')
              }}
            />
          )}/>
        ) : (
          <Route exact path='/' render={() => (
            <ListBooks 
              books={this.state.books}
              markList={this.state.markList} 
              showSearchPage={this.changeState}
              changeShelfState={ this.changeShelfState }
            />
          )}/> 
        )}
      </div>
    )
  }
}

export default BooksApp
