import React from 'react';
import '../styles/App.css';
import axios from 'axios'
import {getFile} from '../orbitdb/orbitdb'

class Input extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			url: ''
		}
	}

	P_normalizeURL(){
		let url;
		if (this.state.url.indexOf("https://" || "http://") === -1){
			url = "https://"+this.state.url
		}	
		if (this.state.url.indexOf(".") === -1){
			url = `${url}.com`
		}
		return url
	}

	P_handleChange = (event) => {
		event.preventDefault();
		this.setState({
			url: event.target.value
		})
	}

	R_handleSubmit = () => {
		axios.post('/page/new-url', {
			url: this.state.url
		})
			.then((response) => {
				// console.log(response);
			})
			.catch((error) => {
				console.log(error);

			})
	}

	R_makeRequest = async () => {		
		console.log(await getFile(this.P_normalizeURL()));
	}

	render() {
		return (
			<div className="Input">
				<input onChange={this.P_handleChange} placeholder="Type URL Here" />
				<button onClick={this.R_handleSubmit}>Submit</button>
				<button onClick={this.R_makeRequest}>retrieve</button>
			</div>
		)
	}

}

export default Input