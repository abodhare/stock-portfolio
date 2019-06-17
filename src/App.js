import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Quotes from './Quotes';
import Navbar from './Navbar';

class App extends Component {
  render() { 
   return (
    <div>
      <Navbar />
      <Quotes />
    </div>
   );
  }
}

export default App;