import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class SelectShelf extends Component {
	
	render () {
		const shelf = this.props.book.shelf,
			book = this.props.book;
		return (
			<select value={shelf} onChange={( e => 
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
		)
	}
}

export default SelectShelf