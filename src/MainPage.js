import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookPatern from './BookPatern'
// import PropTypes from 'prop-types'
// import sortBy from 'sort-by'
//npm install --save escape-string-regexp sort-by
//npm install --save prop-types
//npm install --save react-router-dom

class MainPage extends Component {

	sortBooks(mark, books) {//passes a mark value and books array
			const sortedBooks = books.filter( book => book.shelf == mark && book )
			if( sortedBooks.length > 0 ) return sortedBooks;
	}

	render() {
		const books = this.props.books,
			markList = this.props.markList;
		return(
			<div className="list-books">
				<div className="list-books-title">
					<h1>My reads</h1>
				</div>
				<div className="list-books-content">
					<div>
					{Object.keys(markList).map( mark => {
						const sortedBooks = this.sortBooks(mark, books)
						if (!Array.isArray(sortedBooks)) return;
						return ( sortedBooks.length > 0 && (
							<div className="bookshelf" key={ mark }>
								<h2 className="bookshelf"> { markList[mark]} </h2>
								<div className="bookshelf-books">
									<ol className="books-grid">
										{ sortedBooks.map( book => (
											<li key={ book.id }>
												<BookPatern
													book={ book }
													markList={ this.props.markList }
													changeShelf={ this.props.changeShelf }
												/>
											</li>
										))}
									</ol>
								</div>
							</div>
						))})}
					</div>
				</div>
				<div className="open-search">
					<Link to='/search'>Search a book</Link>
				</div>
			</div>
		)
	}
}

export default MainPage