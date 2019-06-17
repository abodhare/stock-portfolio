import React, { Component } from 'react';

class Navbar extends Component {
    render () {
        return (
        <nav className="navbar navbar-light bg-light">
            <h1>stock-portfolio</h1>
            <form className="form-inline ml-auto">
                <input className="form-control mr-sm-2" type="text" placeholder="Stock symbol" aria-label="select" required/>
                <input className="form-control mr-sm-2" type="date" placeholder="Date bought" />
                <input className="form-control mr-sm-2" type="number" placeholder="Number of shares" required/> 
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Add</button>
            </form>
        </nav>
        );
    }
}

export default Navbar;