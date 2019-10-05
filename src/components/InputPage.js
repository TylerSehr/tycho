import React from 'react';
import axios from 'axios'
import TODD from '../redux/GlobalState'
import { sendURL } from '../orbitdb/orbitdb'

class Input extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			url: '',
			page: null,
			ipfs_url: ''
		}
	}

	P_handleChange = (event) => {
		event.preventDefault();
		this.setState({
			url: event.target.value
		})
	}

	R_handleSubmit = async () => {
		if (TODD.flags.dbReady === false){
			console.log('still loading');
			return;
		}
		TODD.search = this.state.url
		await sendURL(this.state.url)

		// axios.post('/page/new-url', {
		// 	url: this.state.url
		// })
		// 	.then(async (response) => {
		// 			TODD.ipfs_url = response.data
		// 			this.props.history.push({
		// 				pathname: `/ipfs/${this.state.url}/`,
		// 				search: `${TODD.ipfs_url}`
		// 			})
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);

		// 	})
	}

	render() {
		return (
			<div className="Input">
				<input onChange={this.P_handleChange} placeholder="Type URL Here" />
				<button onClick={this.R_handleSubmit}>Submit</button>
			</div>
		)
	}

}

export default Input