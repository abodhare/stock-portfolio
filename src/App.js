import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { increment, fetchData } from './actions';

class App extends Component {
  componentDidMount() {
    this.props.onFetchData();
  }

  render() { 
      return (
      <div className="App">
        <h1>{this.props.num}</h1>
        <button onClick={this.props.onIncrement}>Increment</button>

        <h1>Fetching the data from the backend</h1>
        {this.props.error && <p>{this.props.error}</p>}

        {JSON.stringify(this.props.data)}
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return { num: state.num , data: state.data, error: state.error};
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onIncrement: () => dispatch(increment()),
    onFetchData: () => dispatch(fetchData()),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(App);
