import React from 'react'
import {getFile} from '../orbitdb/orbitdb'
import HTMLParser from 'html-react-parser'


class WebPage extends React.Component {
	constructor(props) {
		super(props)
	}



	render() {
		return (
			<div>
				{ (this.props.page) ? HTMLParser(`${this.props.page}`) : '' }
			</div>
		)
	}
	// <div dangerouslySetInnerHTML={{ __html: (this.props.page) ? this.props.page : '<div></div>' }}></div>

}

export default WebPage