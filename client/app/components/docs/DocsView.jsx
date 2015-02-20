var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var DocumentActions = require("../../actions/DocumentActions");
var DocumentStore = require('../../stores/DocumentStore');
var ReactBootstrap = require('react-bootstrap');
var Col = ReactBootstrap.Col;
var Row = ReactBootstrap.Row;
var Grid = ReactBootstrap.Grid;
var Section = require('./sections/Section.jsx');

//Main ApiView component
var DocsView = React.createClass({
  getInitialState: function () {
    return {
      docs: DocumentStore.getAllDocs(),
      spinner: false,
      menu: true
    };
  },

  menu: function () {
    this.setState({menu: !this.state.menu});
  },

  listenerCallback: function () {
    this.setState({
      docs: DocumentStore.getAllDocs(),
      spinner: false
    });
  },

  componentDidMount: function () {
    DocumentStore.addChangeListener(this.listenerCallback);
    DocumentActions.get();
    if (!this.state.docs) {
      this.setState({spinner: true});
    }
  },

  componentWillUnmount: function () {
    DocumentStore.removeChangeListener(this.listenerCallback);
  },

  render: function () {
    //Create api menu
    var docsMenu = [];
    var docs = this.state.docs;
    //Check if apiDocs exists
    if (docs) {
      var docsLength = docs.length;
      //Iterate through sections
      for (var i = 0; i < docsLength; i++ ) {
        //Push in section link and sub doc links to api menu
        docsMenu.push(<Section section={docs[i]} />);
      }
    }
    var spinner;
    if (this.state.spinner){
      spinner = <img className="spinner1" src="/client/assets/bowtie.gif" />;
    }
    var menu  = (
      <Col className='docs-menu' xs={3} md={2}>
        {docsMenu}
        {spinner}
      </Col>
    );

    return (
      <div className="docBg">
        <div className="header"></div>
        <Grid>
          <Row>
            {menu}
            <Col md={3} />
            <Col xs={12} md={8} className="docs">
              <RouteHandler />
            </Col>
          </Row>
          <div>
            <a href="#"><i className="fa fa-angle-double-up scroller"></i></a>
          </div>
        </Grid>
      </div>
    );
  }
});

module.exports = DocsView;
