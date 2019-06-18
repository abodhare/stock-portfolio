import React, { Component } from 'react';
import { addTransaction, fetchSymbols } from './actions';
import { connect } from 'react-redux';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            symbol: "",
            numShares: 0,
        }

        this.handleNumber = this.handleNumber.bind(this);
        this.handleSymbol = this.handleSymbol.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        if (!this.props.symbols) this.props.onFetchSymbols();
        if (!this.props.symbols.includes(this.state.symbol)) alert("Select a valid symbol");
        this.props.onAddTransction(this.state.symbol, this.state.numShares);
        event.preventDefault();
    }

    handleSymbol(event) {
        this.setState({
            symbol: event.target.value,
        })
    }

    handleNumber(event) {
        this.setState({
            numShares: event.target.value,
        })
    }

    render () {
        return (
        <nav className="navbar navbar-light bg-light">
            <h1>stock-portfolio</h1>
            <form className="form-inline ml-auto" onSubmit={this.handleSubmit}>
                <input className="form-control mr-sm-2" type="text" placeholder="Stock symbol" aria-label="select" onChange={this.handleSymbol} required />
                <input className="form-control mr-sm-2" type="number" placeholder="Number of shares" onChange={this.handleNumber} required /> 
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Add</button>
            </form>
        </nav>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        symbols: state.symbols,
        error: state.error,
        transactions: state.transactions,
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        onFetchSymbols: () => dispatch(fetchSymbols()),
        onAddTransction: (symbol, numShares) => dispatch(addTransaction(symbol, numShares)),
    };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Navbar);