import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from './components/Navbar'
import {Input} from 'react-bootstrap'
import {getAllLocations, getFacilityLocations, getFacilityTypes, searchLocations} from './api'


require('./less/bootstrap.less');

class Map extends React.Component {
  componentDidMount() {
    this.leaflet = L.map('map').setView([36.082977, -79.828582], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'brendanyounger.cigbhr58u0gh1adknotchtuv0',
        accessToken: 'pk.eyJ1IjoiYnJlbmRhbnlvdW5nZXIiLCJhIjoiY2lnYmhyNmg3MGlhcnYya202dXN6MXc0NCJ9.gBCXYG13Ub6UwaJ2kcIgVg'
    }).addTo(this.leaflet);
  }

  render() {
    return (
      <div id="map" style={{height:'100%'}}></div>
    );
  }
}

class FacilitiesColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {facilities:[]}
  }

  componentWillMount() {
    getFacilityTypes((types) => this.setState({facilities:types}));
  }

  render() {
    return (
      <ul className="list-unstyled list-group">
        {this.state.facilities
            .filter((facility) => (this.props.selectedFacility == null ||
                                   this.props.selectedFacility == facility.name))
            .map((facility) =>
                <li key={facility.name}>
                    <Input type="checkbox"
                           label={facility.name + ' (' + facility.count + ')'}
                           checked={this.props.selectedFacility == facility.name}
                           onChange={() =>
                            this.props.onChange(
                              this.props.selectedFacility == facility.name ? null : facility.name) } />

                </li>)}
      </ul>
    );
  }
}

class LocationsColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {locations:[]};
  }

  componentWillMount() {
    getAllLocations((locs) => this.setState({locations:locs}));
  }

    componentWillReceiveProps (nextProps){
        // prevent changing locations list if a location is clicked
        if (nextProps.selectedLocation != this.props.selectedLocation){return}

        // update locations based on search and facet choice
        if (nextProps.selectedFacility == null && this.props.selectedFacility != null) {
            // a facet was unselected
             getAllLocations((locs) => this.setState({locations: locs}));
        } else if (nextProps.selectedFacility != this.props.selectedFacility) {
            // new facet selected
            getFacilityLocations(nextProps.selectedFacility, (locs) => this.setState({locations: locs}));
        } else {
            // selectedFacility didn't change so must be search
            this.setState({locations: nextProps.locations});
        }
    }

  render() {
    return (
      <div className="list-group">
        {this.state.locations
          .filter((loc) =>
            (this.props.selectedFacility == null ? true : this.props.selectedFacility == loc.fields.assetclass))
          .map((loc) =>
            <a key={loc.fields.autolabel}
               className={"list-group-item " + (this.props.selectedLocation === loc ? 'active' : '')}
               href="#"
               onClick={() => this.props.onChange(loc)}>
              <h4 className="list-group-item-heading">{loc.fields.autolabel}</h4>
                <p className="list-group-item-text"><em>{loc.fields.address}</em></p>
            </a>)}
      </div>
    );
  }
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state =
      { locations: [],
        selectedLocation:null,
        selectedFacility:null }
  }

  onSelectFacet(facility) {
    this.setState({selectedFacility:facility});
  }

  onSelectLocation(locations) {
    this.setState({selectedLocation:locations});
  }

    onSearchSubmit(locs){
        this.setState({locations: locs});
    }


  render() {
    return (

      <div style={{position:'fixed',width:'100%',height:'100%',top:0,left:0}}>
        <Navbar
            selectedFacility={this.state.selectedFacility}
            onChange={this.onSearchSubmit.bind(this)}/>
        <div className="container-fluid" style={{height:'100%'}}>
          <div className="row" style={{height:'100%'}}>
            <div className="col-xs-6 col-md-3"
                 style={{borderRight:'1px solid #afafaf',height:'100%'}}>
              <h4 className="quiet">Property Type</h4>
              <FacilitiesColumn
                selectedFacility={this.state.selectedFacility}
                onChange={this.onSelectFacet.bind(this)} />
            </div>
            <div className="col-xs-6 col-md-3 no-lr-padding"
                 style={{borderRight:'1px solid #afafaf',height:'100%',overflowY:'scroll'}}>
              <LocationsColumn
                  locations={this.state.locations}
                  selectedFacility={this.state.selectedFacility}
                  selectedLocation={this.state.selectedLocation}
                  onChange={this.onSelectLocation.bind(this)} />
            </div>
            <div className="col-xs-12 col-md-6 no-lr-padding"
                 style={{borderRight:'1px solid #afafaf',height:'100%'}}>
              <Map />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('content'));
