var React = require('react');

var NotFound = React.createClass({
  render: function () {
    return (
      <div>
        <div className="header"></div>
        <h1 className="notFoundView">404 There are no Internets here</h1>
      </div>
    );
  }
});

module.exports = NotFound;
