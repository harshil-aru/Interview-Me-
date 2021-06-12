import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {

    return (
      <nav class="navbar navbar-expand-lg navbar-light " style={{backgroundColor:"#01418b"}}>
  <a class="navbar-brand"  style={{color:"white", marginLeft:24}}>Interview Me!!</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse d-flex flex-row-reverse" id="navbarSupportedContent" style={{marginRight:24}}>
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active" style={{marginRight:24}}>
      <Link to="/" className="nav-link" style={{color:"white"}}>Upcoming Interviews</Link>
        
      </li>
      <li class="nav-item" style={{marginRight:24}}>
      <Link to="/add" className="nav-link" style={{color:"white"}}>Add Interview</Link>
      </li>
    </ul>
    
  </div>
</nav>
      
    );
  }
}

export default Navbar;
