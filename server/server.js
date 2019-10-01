const express = require('express')
require('dotenv').config();
const pageListRouter = require('./routers/pageList.router')

//2nd attempt create an orbitdb wrapper

const bodyParser = require('body-parser')
require('fs-extra');

const app = express()

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('build'))

app.use('/page', pageListRouter);

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`)
})