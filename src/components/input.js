import React from 'react';
import axios from 'axios'
import {getFile} from '../orbitdb/orbitdb'
import WebPage from './WebPage'
import TODD from '../redux/GlobalState'

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

	R_handleSubmit = () => {
		if (TODD.flags.dbReady == false){
			console.log('still loading');
			return;
		}
		axios.post('/page/new-url', {
			url: this.state.url
		})
			.then(async (response) => {
				this.setState({
					ipfs_url: response.data
				}, async () => {
					console.log(getFile);
					
					let file = await getFile('/ipfs/' + this.state.ipfs_url)
					console.log('hi');

					this.setState({
						page: file[0].content
					}, () => {
						console.log(this.state.page);
						
					})
				})
				
			})
			.catch((error) => {
				console.log(error);

			})
	}

	// R_makeRequest = async () => {		
		
	// 	this.setState({
	// 		page: tmp
	// 	})
	// }

	render() {
		return (
			<div className="Input">
				<input onChange={this.P_handleChange} placeholder="Type URL Here" />
				<button onClick={this.R_handleSubmit}>Submit</button>
				<button onClick={this.R_makeRequest}>retrieve</button>
				<WebPage page={this.state.page}/>
			</div>
		)
	}

}

export default Input