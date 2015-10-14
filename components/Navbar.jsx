import React from 'react'
import {Navbar, NavBrand, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'

let Logo = require('../images/logo.png');

export default class extends React.Component {
  render() {
    return (
      <Navbar staticTop={true} fluid={true}>
        <NavBrand>
          <div style={{marginTop:-6}}>
            <a href="/">
              <img alt="Code for Greensboro logo" src={Logo} />
              {' '}
              Greensboro Finda Facility
            </a>
          </div>
        </NavBrand>
        <Nav>
          <form className="navbar-form navbar-left" role="search">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Search" />
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </Nav>
        <Nav pullRight={true}>
          <NavItem eventKey={1} href="#">About</NavItem>
        </Nav>
      </Navbar>
    );
  }
}
