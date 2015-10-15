import React from 'react'
import Navbar from './components/Navbar'
import request from 'superagent'

import {Input} from 'react-bootstrap'

require('./less/bootstrap.less');

let getFacilityTypes = function(callback) {
  let url = "https://codeforgreensboro.opendatasoft.com/api/records/1.0/search/?dataset=cityfacilities&rows=0&facet=assetclass";

  request.get(url).end((error, result) => {
    if (result.ok) {
      callback(result.body.facet_groups[0].facets || []);
    }
    else {
      alert('Oh noes! ' + error.message);
    }
  });
};

class FacetColumns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {checkedFacet: null};
  }

  render() {


    return (
        <ul className="list-unstyled">
          {this.props.facilities
              .filter((facility) =>
                  (this.state.checkedFacet == null || this.state.checkedFacet == facility.name))
              .map((facility) =>
                  <li key = {facility.name}>
                    <Input type="checkbox"
                             label={facility.name}
                             checked={this.state.checkedFacet == facility.name}
                             onChange={() => this.setState({checkedFacet: (this.state.checkedFacet == null ? facility.name : null)})} />
                  </li>)}
        </ul>
    );
  }
}


class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {facilities:[]}
  }

  componentWillMount() {
    getFacilityTypes((types) => this.setState({facilities:types}))
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <FacetColumns facilities={this.state.facilities} />
            </div>
            <div className="col-md-3">
              <h1>Hello, world!</h1>
            </div>
            <div className="col-md-6">
              <h1>Hello, world!</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

React.render(<Root />, document.getElementById('content'));
