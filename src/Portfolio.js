import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import { updatePortfolio } from './actions';

class Portfolio extends Component {
    componentDidUpdate() {
        this.props.onUpdatePortfolio(this.props.transactions);
    }

    render() {
        let body = [];
        let map = new Map();
        let currentPrice = 0;
        let change = 0;
        for (let transaction of this.props.transactions) {
            map.set(transaction.symbol, transaction.numShares);
        }
        let count = 1;
        for (let stock in this.props.portfolio) {
            body.push(<tr>
                <th scope="row">{count}</th>
                <td>{this.props.portfolio[stock].quote.symbol}</td>
                <td>{this.props.portfolio[stock].quote.companyName}</td>
                <td>{map.get(this.props.portfolio[stock].quote.symbol)}</td>
                <td>{this.props.portfolio[stock].quote.latestPrice}</td>
                <td>{this.props.portfolio[stock].quote.change}</td>
            </tr>);
            count++;
            currentPrice += map.get(this.props.portfolio[stock].quote.symbol) * this.props.portfolio[stock].quote.latestPrice;
            change += map.get(this.props.portfolio[stock].quote.symbol) * this.props.portfolio[stock].quote.change;
        }
        return (
            <div className="container">
                <table className="table table-striped">
                    <thead>
                        <th scope="col">#</th>
                        <th scope="col">Symbol</th>
                        <th scope="col">Company Name</th>
                        <th scope="col">No. of Shares</th>
                        <th scope="col">Latest price</th>
                        <th scope="col">change</th>
                    </thead>
                    <tbody>
                        {body}
                        <tr>
                            <th scope="row">{count}</th>
                            <th colSpan="3">Total</th>
                            <td>{currentPrice}</td>
                            <td>{change}</td>
                        </tr>
                   </tbody>
                </table>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        transactions: state.transactions,
        portfolio: state.portfolio,
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        onUpdatePortfolio: (transactions) => dispatch(updatePortfolio(transactions)),
    };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Portfolio);