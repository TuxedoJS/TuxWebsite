var React = require('react');

var DefaultDocView = React.createClass({
  render: function () {
    return (
      <div className="defaultDoc">
        <h1 className="DefaultDocViewView">Welcome to Tuxx Documentation</h1>
        <h4>Click on a doc link to discover the power of Tuxx</h4>
      </div>
    );
  }
});

module.exports = DefaultDocView;
