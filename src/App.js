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

  changePageState = this.changePageState.bind(this);

	changePageState(state) {
    const showSearchPage = this.state.showSearchPage;
    if(state) return this.setState({ showSearchPage: state })
    this.setState({ showSearchPage: false })
	}

  changeBookState(books) {
    if(typeof(book) == 'object') throw new Error;   
    this.setState(books)
  }
		
	changeShelf = (book,shelf) => {
    BooksAPI.update(book, shelf);
    this.componentDidMount();
	}

/*   downloadImg(url) {
    return fetch(url, {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        "Access-Control-Expose-Headers": "Content-Length, X-JSON"
      }}).then(img => img)
  } */

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({books}))
  }

  render() {
    return (
      <div className="app">
          <Route path='/search' render={(history) => (
            <SearchPage
              books={ this.state.books }
              markList={ this.state.markList }
              changeShelf={ this.changeShelf }
              changePageState={ this.changePageState }
            />
          )}/>
          <Route exact path='/' render={() => (
            <MainPage 
              books={ this.state.books }
              markList={ this.state.markList }
              changeShelf={ this.changeShelf }
              changePageState={ this.changePageState }
            />
          )}/>
      </div>
    )
  }
}

export default BooksApp
