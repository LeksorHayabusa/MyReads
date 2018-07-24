import React, { Component } from 'react' 
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import MainPage from './MainPage'
import SearchPage  from './SearchPage'

class BooksApp extends Component {
  state = {
    showSearchPage: false ,
    books: [],
    markList: {
      currentlyReading:"Currently reading",
      wantToRead:"Want to read",
      read:"Read",
      none:"None"
    }
  }

  changeBookState(books) {
    if(typeof(book) == 'object') throw new Error;   
    this.setState(books)
  }
		
	changeShelf = (book,shelf) => {
    BooksAPI.update(book, shelf);
    this.componentDidMount();
	}

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({books}))
  }

  render() {
    return (
      <div className="app">
          <Route path='/myreads/search' render={() => (
            <SearchPage
              books={ this.state.books }
              markList={ this.state.markList }
              changeShelf={ this.changeShelf }
            />
          )}/>
          <Route exact path='/myreads/' render={() => (
            <MainPage 
              books={ this.state.books }
              markList={ this.state.markList }
              changeShelf={ this.changeShelf }
            />
          )}/>
      </div>
    )
  }
}

export default BooksApp
