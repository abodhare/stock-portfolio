import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import { increment, fetchSymbols, selectSymbol, fetchQuote, fetchTimeSeries } from './actions';

import CanvasJSReact from './canvasjs.react';

// for better readablility
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Quotes extends Component {
  componentDidMount() {
    this.props.onFetchSymbols();
  }

  handleSelectSymbol(event) {
    this.props.selectSymbol(event.target.value);
    this.props.onFetchQuote(event.target.value);
    this.props.onTimeSeries(event.target.value);
  }

  render() { 
    let symbols = [];
    if (this.props.data) {
      symbols = [...this.props.data].map(x => <option key={x} value={x}>{x}</option>);
    }

    const options = {
        theme: "light2",
        title: {
            text: `Stock Price of ${this.props.quote.companyName}`,
        },
        axisY: {
            title: "Price",
            includeZero: false,
        },
        data: [{
            type: "line",
            xValueFormatString: 'YYYY-MM-DD',
            yValueFormalString: '#,###.##',
            dataPoints: this.props.timeSeries,
        }],
    }
    return (
      <div className="container">
        <p>{this.props.num}</p>
        <button className="btn btn-primary" onClick={this.props.onIncrement}>Increment</button>

        {this.props.error && <p>{this.props.error}</p>}

        {this.props.quote.symbol && <ul>
            <li>Symbol: {this.props.quote.symbol}</li>
            <li>Company: {this.props.quote.companyName}</li>
            <li>Latest Price: {this.props.quote.latestPrice}</li>
            <li>Change: {this.props.quote.change}</li>
            <li>Average Volume: {this.props.quote.avgTotalVolume}</li>
        </ul>}

        {this.props.timeSeries[0] && <div>
            <CanvasJSChart options = {options} /> 
        </div>}

        <select className="form-control" onChange={e => this.handleSelectSymbol(e)}>{symbols}</select>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return { 
        num: state.num,
        data: state.data,
        error: state.error,
        symbol: state.symbol,
        quote: state.quote,
        timeSeries: state.timeSeries,
    };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onIncrement: () => dispatch(increment()),
    onFetchSymbols: () => dispatch(fetchSymbols()),
    selectSymbol: (symbol) => dispatch(selectSymbol(symbol)),
    onFetchQuote: (symbol) => dispatch(fetchQuote(symbol)),
    onTimeSeries: (symbol) => dispatch(fetchTimeSeries(symbol)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Quotes);