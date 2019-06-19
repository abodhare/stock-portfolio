import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Quotes from './Quotes';
import Navbar from './Navbar';
import Portfolio from './Portfolio';

class App extends Component {
  render() { 
   return (
    <div>
      <Navbar />
      <Quotes />
      <Portfolio />
    </div>
   );
  }
}

export default App;