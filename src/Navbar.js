import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {

    return (
      <nav className="navbar navbar-expand-lg">
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <button className="btn btn-danger">
                <Link to="/" className="nav-link" style={{color: "white"}}>Show upcoming Interviews</Link>
              </button>
            </li>
            <li className="navbar-item">
              <button className="btn btn-success">
                <Link to="/add" className="nav-link" style={{color: "white"}}>Add Interview</Link>
              </button>            
            </li>
          </ul>
        </div>
      </nav >
    );
  }
}

export default Navbar;