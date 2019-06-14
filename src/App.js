import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import { increment, fetchSymbols, selectSymbol } from './actions';

class App extends Component {
  componentDidMount() {
    this.props.onFetchSymbols();
  }

  handleSelectSymbol(event) {
    this.props.selectSymbol(event.target.value);
  }

  render() { 
    let symbols = [];
    if (this.props.data) {
      symbols = [...this.props.data].map(x => <option key={x} value={x}>{x}</option>);
    }
    return (
      <div>
        <h1>{this.props.num}</h1>
        <button className="btn btn-primary" onClick={this.props.onIncrement}>Increment</button>

        <h1>Fetching the data from the backend</h1>
        {this.props.error && <p>{this.props.error}</p>}

        <h1>{this.props.symbol}</h1>
        <select className="form-control" onChange={e => this.handleSelectSymbol(e)}>{symbols}</select>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return { num: state.num , data: state.data, error: state.error, symbol: state.symbol};
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onIncrement: () => dispatch(increment()),
    onFetchSymbols: () => dispatch(fetchSymbols()),
    selectSymbol: (symbol) => dispatch(selectSymbol(symbol)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(App);
