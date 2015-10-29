import React from 'react'
import ReactDOM from 'react-dom'
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

let getFacilityLocations = function(location, callback) {
  console.log("get facility locations called: " + location);
  if (location == null) {return};
  let url = "https://codeforgreensboro.opendatasoft.com/api/records/1.0/search/?dataset=cityfacilities&rows=247&refine.assetclass=" + location.split(' ').join('+');

  request.get(url).end((error, result) => {
    if (result.ok) {
      callback(result.body.records || []);
    }
    else {
      alert('Oh noes! ' + error.message);
    }
  });
};

let getAllLocations = function(callback) {
  let url = "https://codeforgreensboro.opendatasoft.com/api/records/1.0/search/?dataset=cityfacilities&rows=247";

  request.get(url).end((error, result) => {
    if (result.ok) {
      callback(result.body.records || []);
    }
    else {
      alert('Oh noes! ' + error.message);
    }
  });
};

class Map extends React.Component {
  componentDidMount() {
    this.leaflet = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('http://a{s}.acetate.geoiq.com/tiles/acetate-hillshading/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'your.mapbox.project.id',
        accessToken: 'your.mapbox.public.access.token'
    }).addTo(this.leaflet);
  }

  render() {
    return (
      <div id="map" style={{height:'100%'}}></div>
    );
  }
}

// Controls the far left column
// Used to select a facet or facility type
class FacetColumns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {checkedFacet: null};
  }

  update(selectedFacet) {
    console.log("update called: " + selectedFacet);
    this.setState({checkedFacet: selectedFacet});
    this.props.onChange(selectedFacet);
  }

  render() {
    return (
        <ul className="list-unstyled list-group">
          {this.props.facilities
              .filter((facility) =>
                  (this.state.checkedFacet == null || this.state.checkedFacet == facility.name))
              .map((facility) =>
                  <li key = {facility.name}>
                      <Input type="checkbox"
                             label={facility.name + ' (' + facility.count + ')'}
                             checked={this.state.checkedFacet == facility.name}
                             onChange={() => this.update((this.state.checkedFacet == null ? facility.name : null))} />

                  </li>)}
        </ul>
    );
  }
}

class LocationsColumn extends React.Component {
    constructor(props) {
    super(props);
    this.state = {location: null};
  }

    render() {
    return (
        <ul className="list-unstyled list-group scroll-menu">
          {this.props.locations
              .map((location) =>
                  <li key = {location.fields.autolabel} className="list-group-item">
                    <h4 className="list-group-item-heading">{location.fields.autolabel}</h4>
                      <p className="list-group-item-text"><em>{location.fields.address}</em></p>
                  </li>)}
        </ul>
    );
  }
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {facilities:[],
                  locations: [],
                  selectedLocation:null, selectedFacet:null}
      getAllLocations((locs) => this.setState({locations:locs}))
  }

  componentWillMount() {
    getFacilityTypes((types) => this.setState({facilities: types}));
  }

  render() {
    return (
      <div style={{position:'fixed',width:'100%',height:'100%',top:0,left:0}}>
        <Navbar />
        <div className="container-fluid" style={{height:'100%'}}>
          <div className="row" style={{height:'100%'}}>
            <div className="col-md-3" style={{borderRight:'1px solid #afafaf',height:'100%'}}>
              <h4 className="quiet">Property Type</h4>
              <FacetColumns facilities={this.state.facilities}
                            onChange={(facet) => this.setState({selectedFacet:facet})}/>
            </div>
            <div className="col-md-3" style={{borderRight:'1px solid #afafaf',height:'100%'}}>
              <LocationsColumn locations={this.state.locations}
                               selectedLocation={this.state.selectedLocation}
                               onChange={getFacilityLocations(this.state.selectedFacet, (locs) => this.setState({locations:locs}))} />
            </div>
            <div className="col-md-6" style={{borderRight:'1px solid #afafaf',height:'100%'}}>
              <div style={{height:'100%'}}>
                <Map />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('content'));
