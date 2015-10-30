import React from 'react'
import
  { Navbar,
    NavBrand,
    Nav,
    NavItem,
    NavDropdown,
    CollapsibleNav,
    MenuItem,
    Modal,
    Button,
    OverlayTrigger }
  from 'react-bootstrap'
import {searchLocations} from '../api'

let Logo = require('../images/logo.png');
let BuiltInLogo = require('../images/gsobuilt.jpg');

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showModal:false}
  }

  render() {
    return (
      <Nav navbar right {...this.props}>
        <NavItem eventKey={1} href="#" onClick={(e) => this.setState({showModal:true})}>About</NavItem>

        <Modal show={this.state.showModal} onHide={() => this.setState({showModal:false})}>
          <Modal.Header closeButton>
            <Modal.Title>About Greensboro Finda Facility</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Finda is a generic "find-a" app for geographic datasets.</p>
            <p><strong>Please send feedback, ideas, and bug reports to our <a href="https://github.com/codeforgreensboro/finda/issues">Github page</a>.</strong></p>

            <hr />

            <h4>About Code for Greensboro</h4>
            <p>We're developers, designers, data nerds, politically-minded people with ideas for making things better, citizens, users of software—in other words, we are this community. We want to use these talents to make Greensboro's government work with the web in new and better ways.</p>

            <p>Feel free to stop by one of our <a href="https://www.bit.ly/cfgrsvp">Bi-weekly Hack Nights</a>, <a href="https://www.github.com/codeforgso">check us out on Github</a>, or <a href="mailto:hello@codeforgreensboro.org">simply drop us a line</a>!</p>

            <hr />

            <h4>Credit Where Due</h4>

            <p>Finda was originally built by <a href="https://github.com/codeforboston">Code for Boston</a>. We stand on the shoulders of giants!</p>

          </Modal.Body>
          <Modal.Footer>
            <a href="http://www.gsobuilt.co" target="_blank">
              <img alt="Built in GSO logo" className="pull-left" src={BuiltInLogo} style={{height:'2.5em'}} />
            </a>
            <Button onClick={() => this.setState({showModal:false})}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Nav>
    );
  }
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  onSearchSubmit(e) {
      e.preventDefault(e)
      //this.setState({locations: searchLocations(query)});
      searchLocations(this.state.query, (locs) => this.props.onChange(locs));
  }

  componentWillReceiveProps(nextProps, nextState){
    console.log('test');
    if (nextProps.selectedFacility !== this.props.selectedFacility) {
      this.setState({query: ''});
    }
  }

  render() {
    return (
      <Navbar toggleNavKey={0} fluid staticTop>
        <NavBrand>
          <div style={{marginTop:-6}}>
            <a href="/">
              <img alt="Code for Greensboro logo" src={Logo} />
              {' '}
              Greensboro Finda Facility
            </a>
          </div>
        </NavBrand>
        <CollapsibleNav eventKey={0}>
          <Nav navbar>
            <form className="navbar-form navbar-left"
                  role="search"
                  onSubmit={(e) => this.onSearchSubmit(e)}>
              <div className="form-group">
                <input type="text"
                       className="form-control"
                       placeholder="Search"
                       value={this.state.query}
                       onChange={(e) => this.setState({query: e.target.value})} />
              </div>
              {' '}
              <input type="submit" className="btn btn-primary"></input>
            </form>
          </Nav>
          <About />
        </CollapsibleNav>
      </Navbar>
    );
  }
}
