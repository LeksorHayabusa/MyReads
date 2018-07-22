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

  updateHistory(){}

  render() {
    return (
      <div className="app">
          <Route path='/search' render={(history) => (
            <SearchPage
              books={ this.state.books }
              markList={ this.state.markList }
              changeShelf={ this.changeShelf }
              updateHistory={ () => {
                this.updateHistory();
                //history.push('/')
              }}
            />
          )}/>
          <Route exact path='/' render={() => (
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
