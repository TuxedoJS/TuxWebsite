var React = require('react');
var Link = require('react-router').Link;

// Section Component
var Section =  React.createClass({
  render: function () {
    //Element array
    var links = [];
    var docs = this.props.section.docs;
    var docsLength = docs.length;

    for (var i = 0; i < docsLength; i++) {
      var doc = docs[i];
      //Push doc link into links
      links.push(<div key={i}><Link to="docs.section" params={{section: doc}}>{doc}</Link><br/></div>);
    }

    var section = this.props.section.section;

    return (
      <div>
        <h3><Link to="docs.section" params={{section: section}}>{section}</Link></h3>
        {links}
      </div>
    );
  }
});

//Export module
module.exports = Section;
