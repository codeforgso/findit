
import request from 'superagent'

export let getFacilityTypes = function(callback) {
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

export let getFacilityLocations = function(location, callback) {
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

export let getAllLocations = function(callback) {
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


export let searchLocations = function(query, callback) {
    let url = "https://codeforgreensboro.opendatasoft.com/api/records/1.0/search/?dataset=cityfacilities&rows=247&q=" + query.split(' ').join('+');

    request.get(url).end((error, result) => {
    if (result.ok) {
      callback(result.body.records || []);
    }
    else {
      alert('Oh noes! ' + error.message);
    }
  });
};

