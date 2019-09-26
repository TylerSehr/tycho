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
	},
	config: {
		Addresses: {
			Swarm: ['/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star']
		}
	}
}
const ipfs = new IPFS(ipfsOptions)
let db;
ipfs.on('ready', async () => {
	// const identity = await Identities.createIdentity(options)
	const orbitdb = await OrbitDB.createInstance(ipfs) //, {identity: identity}
	const dist_db = await axios.get('/page/db')

	db = await orbitdb.keyvalue(dist_db.data)
	db.events.on('ready', () => {
		// Set the status text
		setTimeout(() => {
			console.log('database is ready');
			
		}, 1000)
	})
	await db.load()
	db.events.on('replicated', (address) => {
		console.log('db replicated');
	})


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
		// console.log(this.state.url);
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
		console.log(await db.get('https://google.com'));
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