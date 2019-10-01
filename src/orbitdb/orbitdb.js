import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'
import axios from 'axios'
import TODD from '../redux/GlobalState'

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
		console.log('ipfs has loaded');
		TODD.flags.ipfsReady = true;
		getFile = async (ipfs_path) => {
			return await ipfs.get(ipfs_path)
		}

		// const identity = await Identities.createIdentity(options)
		const orbitdb = await OrbitDB.createInstance(ipfs) //, {identity: identity}
		const dist_db = await axios.get('/page/db')
		db = await orbitdb.keyvalue(dist_db.data)
		db.events.on('ready', () => {
			console.log('orbitdb has loaded');
			TODD.flags.dbReady = true;
		})
		await db.load()
		db.events.on('replicated', (address) => {
			console.log('db replicated');
		})

	})
	render()
}

export { initDB, getFile }