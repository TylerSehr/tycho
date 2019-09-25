import React from 'react';
import '../styles/App.css';
import axios from 'axios'


class Input extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			url: ''
		}
	}

	P_handleChange = (event) => {
		event.preventDefault();
		this.setState({
			url: event.target.value
		})
	}

	R_handleSubmit = () => {
		console.log(this.state.url);
		axios.post('/page/new-url', {
			url: this.state.url
		})
		.then((response)=> {
			console.log(response);
		})
		.catch((error)=>{
			console.log(error);
			
		})
	}

	render() {
		return (
			<div className="Input">
				<input onChange={this.P_handleChange} placeholder="Type URL Here"/>
				<button onClick={this.R_handleSubmit}>Submit</button>
			</div>
		)
	}

}

export default Input