import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import { fetchSymbols, selectSymbol, fetchQuote, fetchTimeSeries } from './actions';

import CanvasJSReact from './canvasjs.react';

// for better readablility
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
    if (this.props.symbols) {
      symbols = [...this.props.symbols].map(x => <option key={x} value={x}>{x}</option>);
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
        <form>
          <label htmlFor="checkStock">Select a stock ticker</label>
          <select id="checkStock" className="form-control" onChange={e => this.handleSelectSymbol(e)}>{symbols}</select>
        </form>
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
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return { 
        symbols: state.symbols,
        error: state.error,
        symbol: state.symbol,
        quote: state.quote,
        timeSeries: state.timeSeries,
        transactions: state.transactions,
    };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onFetchSymbols: () => dispatch(fetchSymbols()),
    selectSymbol: (symbol) => dispatch(selectSymbol(symbol)),
    onFetchQuote: (symbol) => dispatch(fetchQuote(symbol)),
    onTimeSeries: (symbol) => dispatch(fetchTimeSeries(symbol)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Quotes);