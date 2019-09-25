const express = require('express')

const router = express.Router()
const axios = require('axios')

const URL = require('../classes/url.class.js')
const URL_LIST = require('../classes/urlList.class.js')

// THIS LIST STORAGE IN THIS ROUTER WILL BE CONVERTED TO USE ETHEREUM SMART CONTRACTS FOR DECENTRALIZATION

let url_storage = new URL_LIST();



router.post('/new-url', (req, res) => {
	console.log(req.body.url);

	let new_url = URL.C_newURL(req.body.url)
	axios.get(new_url.og_url)
	.then((response)=>{
		new_url.web_content = response.data	
		res.send(new_url.web_content)
	})
	.catch((error)=>{		
		res.send("bad url")
	})
})

module.exports = router