import React from 'react';

class Root extends React.Component {
  render() {
    return (
      <h1>Hello, world!</h1>
    );
  }
}

React.render(<Root />, document.getElementById('content'));
