const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')
const Identities = require('orbit-db-identity-provider')

const options = { id: 'local-id' }
const ipfsOptions = {
	EXPERIMENTAL: {
		pubsub: true
	}
}
const ipfs = new IPFS(ipfsOptions)

ipfs.on('ready', async () => {
	const identity = await Identities.createIdentity(options)
	const orbitdb = await OrbitDB.createInstance(ipfs, {identity: identity})
	const db = await orbitdb.docs('document_store')
	console.log(db.identity.toJSON());
	

	


})
