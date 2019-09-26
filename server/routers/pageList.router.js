const express = require('express')

const router = express.Router()
const axios = require('axios')

const URL = require('../classes/url.class.js')
const URL_LIST = require('../classes/urlList.class.js')

// THIS LIST STORAGE IN THIS ROUTER WILL BE CONVERTED TO USE ETHEREUM SMART CONTRACTS FOR DECENTRALIZATION

let url_storage = new URL_LIST();

const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')
// const Identities = require('orbit-db-identity-provider')

// const options = { id: 'local-id' }
const ipfsOptions = {
	EXPERIMENTAL: {
		pubsub: true
	}
}
const ipfs = new IPFS(ipfsOptions)
let upload;
let get;
let New_URL;
let db;

ipfs.on('ready', async () => {
	// const identity = await Identities.createIdentity(options)
	const orbitdb = await OrbitDB.createInstance(ipfs) //, {identity: identity}
	db = await orbitdb.keyvalue('url_store')
	console.log(db.identity);
	
	upload = async () => {
		return await db.put(New_URL.og_url, New_URL.web_content)
	}
	get = async () => {
		console.log(await db.get(New_URL.og_url));
	}
	

})

router.post('/new-url', (req, res) => {
	console.log(req.body.url);

	New_URL = URL.C_newURL(req.body.url)
	axios.get(New_URL.og_url)
	.then(async (response)=>{
		New_URL.web_content = response.data	
		New_URL.ipfs_url = await upload()
		// get();
		
		res.send(New_URL.web_content)
	})
	.catch((error)=>{		
		res.send("bad url")
	})
})

router.get('/db', (req, res) => {
	res.send(db.address)
})


module.exports = router