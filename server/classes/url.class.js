const axios = require('axios')

class URL {
	constructor(og_url) {
		this.og_url = og_url;
		this.parsed_url = og_url;
		this.ipfs_url = '';
		this.web_content = '';
	}

	static C_newURL(url){
		let new_url = new URL(url)
		new_url.P_normalizeURL()
		return new_url
	}
	
	P_normalizeURL(){
		if (this.parsed_url.indexOf("https://" || "http://") === -1){
			this.parsed_url = "https://" + this.parsed_url
		}	
		if (this.parsed_url.indexOf(".") === -1){
			this.parsed_url = `${this.parsed_url}.com`
		}
	}

	R_deployWebContentToIPFS() {
		
	}
}

module.exports = URL