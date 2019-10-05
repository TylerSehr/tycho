import React from 'react';
import InputPage from './InputPage';
import WebPage from './WebPage'
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              path="/ipfs"
              component={WebPage}
            />
            <Route
              path="/"
              exact
              component={InputPage}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
