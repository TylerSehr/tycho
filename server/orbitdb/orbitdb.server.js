const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')
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
