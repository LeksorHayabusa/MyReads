import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'
import SelectShelf from './SelectShelf'
// import sortBy from 'sort-by'
//npm install --save escape-string-regexp sort-by
//npm install --save prop-types
//npm install --save react-router-dom
class BookPatern extends Component {

	joinAuthors(author) {
		if( typeof(author) == 'string') return author;
		if(Array.isArray(author)) return author.join(', ')
	}

	render() {
		const { book, markList } = this.props;
		let displayedThumbnail = (book.imageLinks) ? book.imageLinks.smallThumbnail : '';
		return(
			<div className="book">
				<div className="book-top">
					<div 
						className="book-cover"
						style={{
							width: '128px',
							height: '190px',
							backgroundImage: `url("${displayedThumbnail}")`
						}} 
					>
					</div>
					<div className="book-shelf-changer">
							<SelectShelf
								book={ book }
								markList={ this.props.markList }
								changeShelf={ this.props.changeShelf }
							/>
					</div>
				</div>
				<div className="book-title">{book.title}</div>
				<div className="book-authors">{this.joinAuthors(book.authors)}</div>
			</div>
		)
	}
}
/* class BookPatern extends Component {

	joinAuthors(author) {
		if( typeof(author) == 'string') return author;
		if(Array.isArray(author)) return author.join(', ')
	}

	render() {
		const { book, markList } = this.props;
		return(
			<div className="book">
				<div className="book-top">
					<div 
						className="book-cover" 
						style={{
							width: '128px',
							height: '190px',
							backgroundImage: `url(" ${book.imageLinks.smallThumbnail} ")` }}
					>
					</div>
					<div className="book-shelf-changer">
						<select value={ book.shelf } onChange={( e => 
							this.props.changeShelf(book, e.target.value))}
						>
							<option value="move" disabled >Move to...</option>
							{Object.keys(this.props.markList).map( mark => 
								<option 
									value={ mark } 
									data-shelf={ mark }
									key={ mark }
									>{ this.props.markList[mark] }
								</option>
							)}
						</select>
					</div>
				</div>
				<div className="book-title">{book.title}</div>
				<div className="book-authors">{this.joinAuthors(book.authors)}</div>
			</div>
		)
	}
} */

export default BookPatern

