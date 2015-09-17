import React from 'react';
import request from 'superagent';

require('./less/bootstrap.less');

let getFacilityTypes = function(callback) {
  let url = "https://codeforgreensboro.opendatasoft.com/api/records/1.0/search/?dataset=cityfacilities&rows=0&facet=assetclass";

  request.get(url).end((error, result) => {
    if (result.ok) {
      callback(result.body.facet_groups[0].facets);
    }
    else {
      alert('Oh noes! ' + error.message);
    }
  });
};

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
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <ul>
              {this.state.facilities.map((facility) => <li>{facility.name}</li>)}
            </ul>
          </div>
          <div className="col-md-3">
            <h1>Hello, world!</h1>
          </div>
          <div className="col-md-6">
            <h1>Hello, world!</h1>
          </div>
        </div>
      </div>
    );
  }
}

React.render(<Root />, document.getElementById('content'));
