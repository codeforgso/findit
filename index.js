import React from 'react';

require('./less/bootstrap.less');

class Root extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1>Hello, world!</h1>
          </div>
        </div>
      </div>
    );
  }
}

React.render(<Root />, document.getElementById('content'));
