import React from 'react';
import Input from './input';

class App extends React.Component {
  constructor(props){
    super(props)
  }

  render(){    
    return (
      <div className="App">
        <Input />
      </div>
    );
  }
}

export default App;
