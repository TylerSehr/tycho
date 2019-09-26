import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'
import axios from 'axios'

let db;
let getFile;

const initDB = async (render) => {
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
	ipfs.on('ready', async () => {
		// const identity = await Identities.createIdentity(options)
		const orbitdb = await OrbitDB.createInstance(ipfs) //, {identity: identity}
		const dist_db = await axios.get('/page/db')
		db = await orbitdb.keyvalue(dist_db.data)
		db.events.on('ready', () => {
			console.log('database is ready');
		})
		await db.load()		
		db.events.on('replicated', (address) => {
			console.log('db replicated');
		})

		getFile = async (url) => {
			return await db.get(url)
		}

		
	})
	render()
}

export {initDB, getFile}