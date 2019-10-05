import React from 'react'
import { getFile } from '../orbitdb/orbitdb'
import TODD from '../redux/GlobalState'

class WebPage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			ipfs_url: this.parseURL() || '',
			file: '',
			page: ''
		}
	}

	parseURL() {
		let result = window.location.href
		console.log(result);

		return result.substring(result.indexOf('#') + 1, result.length)
	}

	async componentDidMount() {
		let file = await getFile(this.state.ipfs_url)
		this.setState({
			file: file,
			page: file[0].content
		})
	}


	render() {
		return (
			<div>
				{<div dangerouslySetInnerHTML={{ __html: this.state.page }}></div>}
			</div>
		)
	}
}

export default WebPage
