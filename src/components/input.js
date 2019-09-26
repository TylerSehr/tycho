import React from 'react';
import '../styles/App.css';
import axios from 'axios'

import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'
// import Identities from 'orbit-db-identity-provider'

// const options = { id: 'local-id' }
const ipfsOptions = {
	EXPERIMENTAL: {
		pubsub: true
	}
}
const ipfs = new IPFS(ipfsOptions)
let get;
let src;

ipfs.on('ready', async () => {
	// const identity = await Identities.createIdentity(options)
	const orbitdb = await OrbitDB.createInstance(ipfs) //, {identity: identity}
	src = await axios.get('/page/db')
	src = src.data
	console.log(src);
	

	
	const db = await orbitdb.keyvalue(src.toString())
	console.log(db.identity.toJSON());
	db.events.on('replicated', (address) => {
		console.log(db.iterator({ limit: -1 }).collect())
	})
	
	get = async () => {
		console.log(await db.get('https://google.com'));
	} 


})


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
				<button onClick={get}>retrieve</button>
			</div>
		)
	}

}

export default Input