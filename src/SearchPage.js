import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SelectShelf from './SelectShelf'
import BookPatern from './BookPatern'
//npm install --save escape-string-regexp sort-by
//npm install --save form-serialize

class SearchPage extends Component {
	state = { 
		query: '', 
		matchedBooks: []
	}

	updateQuery(e) {
		const query = e.target.value;
		this.setState({ query })
		this.getMatchedBooks( query )
	}

	getMatchedBooks(query) {
		let matchedBooks = this.state.matchedBooks;
		const books = this.props.books;

		if( query ) return BooksAPI.search(query)
			.then(matchedBooks => {
				//console.log(matchedBooks)
				if(matchedBooks.error) 
					return this.setState({ matchedBooks: [] });
				else return this.setState({ matchedBooks });
			})
		return this.setState({ matchedBooks: [] })
	}
	
	render() {
		const { query, matchedBooks } = this.state,
			{ books } = this.props;
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/myreads/" className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
						{// https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
						}
						<input 
							type="text" 
							placeholder="Search by title or author"
							value={ query }
							onChange={ event => this.updateQuery(event)}
						/>

					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{ matchedBooks.map( book => {
							if(!books.some(storedBook => storedBook.id === book.id)) 
								book.shelf = 'none';
							return (
							<li key={ book.id } >
								<BookPatern
									book={ book }
									markList={ this.props.markList }
									changeShelf={ this.props.changeShelf }
								/>
							</li>
						)})}
					</ol>
				</div>
			</div>
		)
	}
}

export default SearchPage