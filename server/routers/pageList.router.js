const express = require('express')

const router = express.Router()
const axios = require('axios')

const URL = require('../classes/url.class.js')
const URL_LIST = require('../classes/urlList.class.js')

const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

// THIS LIST STORAGE IN THIS ROUTER WILL BE CONVERTED TO USE ETHEREUM SMART CONTRACTS FOR DECENTRALIZATION

let url_storage = new URL_LIST();

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
let New_URL;

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
	db.events.on('ready', () => {
		console.log('orbitdb has loaded');
	})

	await db.load();

	db.events.on('replicate.progress', async (address, hash, entry, progress, have) => {
		// console.log(entry);
		New_URL = URL.C_newURL(entry.payload.key)
		await upload(New_URL)
	})

	upload = async (New_URL) => {
		await ipfs.addFromURL(New_URL.parsed_url, async (err, result) => {
			if (err) {
				console.log(err);
			}
			// console.log(result);
			New_URL.ipfs_url = result[0].hash
			console.log(New_URL.og_url);
			console.log(New_URL.ipfs_url);

			
			await db.put(New_URL.og_url, New_URL.ipfs_url)
		})
	}

	// upload = async (New_URL) => {
	// 	return await db.put(New_URL.og_url, New_URL.web_content)
	// }

	get = async (New_URL) => {
		console.log(await db.get(New_URL.og_url));
	}
})

// router.post('/new-url', async (req, res) => {
// 	if (req.body.url === '') {
// 		res.sendStatus(500);
// 		return
// 	}

// 	console.log(New_URL.ipfs_url);

// 	res.send(New_URL.ipfs_url)

// 	// axios.get(New_URL.og_url)
// 	// 	.then(async (response) => {
// 	// 		New_URL.web_content = response.data
// 	// 		New_URL.ipfs_url = await upload(New_URL)
// 	// 		res.sendStatus(200)
// 	// 	})
// 	// 	.catch((error) => {
// 	// 		res.send("bad url")
// 	// 	})
// })

router.get('/db', async (req, res) => {
	res.send(await db.address.toString())
})


module.exports = router