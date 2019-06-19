import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';

class Portfolio extends Component {
    render() {
        return (
            <div className="container">
            {this.props.transactions && JSON.stringify(this.props.transactions)}
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        transactions: state.transactions,
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {

    };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Portfolio);