const express = require('express')

const router = express.Router()
const axios = require('axios')

const URL = require('../classes/url.class.js')
const URL_LIST = require('../classes/urlList.class.js')

const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

// THIS LIST STORAGE IN THIS ROUTER WILL BE CONVERTED TO USE ETHEREUM SMART CONTRACTS FOR DECENTRALIZATION

let url_storage = new URL_LIST();

// const Identities = require('orbit-db-identity-provider')

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
let upload;
let get;
let db;

router.post('/new-url', (req, res) => {

	let New_URL = URL.C_newURL(req.body.url)
	console.log(New_URL.og_url)
	axios.get(New_URL.og_url)
		.then(async (response) => {
			New_URL.web_content = response.data
			New_URL.ipfs_url = await upload(New_URL)
			
			
			// get();

			// res.send(New_URL.web_content)
			res.sendStatus(200)
		})
		.catch((error) => {
			res.send("bad url")
		})
})

ipfs.on('ready', async () => {
	// const identity = await Identities.createIdentity(options)
	const options = {
		// Give write access to everyone
		accessController: {
			write: ['*']
		}
	}

	const orbitdb = await OrbitDB.createInstance(ipfs) //, {identity: identity}
	db = await orbitdb.keyvalue('url_store', options)
	console.log(db.address.toString());
	
	upload = async (New_URL) => {
		return await db.put(New_URL.og_url, New_URL.web_content)
	}

	get = async (New_URL) => {
		console.log(await db.get(New_URL.og_url));
	}


})


router.get('/db', async (req, res) => {
	res.send(await db.address.toString())
})


module.exports = router