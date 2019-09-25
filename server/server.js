const express = require('express')
require('dotenv').config();
const pageListRouter = require('./routers/pageList.router')
const bodyParser = require('body-parser')
require('fs-extra');

const app = express()

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('build'))

const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

const ipfsOptions = {
	EXPERIMENTAL: {
		pubsub: true
	}
}
const ipfs = new IPFS(ipfsOptions)

ipfs.on('ready', async () => {
	const orbitdb = await OrbitDB.createInstance(ipfs)
	const db = await orbitdb.docs('document_store')
	console.log(db.identity);
	
	app.use('/page', pageListRouter);
	


})

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`)
})