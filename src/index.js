import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import TODD from './redux/GlobalState'

import { initDB } from './orbitdb/orbitdb.js'

Object.keys(TODD.flags).forEach((key) => {
	TODD.flags[key] = false;
	TODD.updateFlags(TODD.flags)
})

initDB(() => {
	console.log('rendering');
	ReactDOM.render(<App />, document.getElementById('root'));
})
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA