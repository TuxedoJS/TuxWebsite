var React = require('react');
var Router = require('react-router');
var ReactBootstrap = require('react-bootstrap');
var Col = ReactBootstrap.Col;
var Row = ReactBootstrap.Row;
var Grid = ReactBootstrap.Grid;
var Markdown = require('react-remarkable');
var DocumentStore = require('../stores/DocumentStore');
var DocumentActions = require('../actions/DocumentActions');

var OverviewView = React.createClass({
  getInitialState: function () {
    return {
      overview: DocumentStore.getSingleDoc('Overview'),
      spinner: false
    };
  },

  listenerCallback: function () {
    this.setState({
      overview: DocumentStore.getSingleDoc('Overview'),
      spinner: false
    });
  },

  componentDidMount: function () {
    DocumentStore.addChangeListener(this.listenerCallback);
    DocumentActions.getDoc({section: 'Overview'});
    this.setState({spinner: true});
  },

  componentWillUnmount: function () {
    DocumentStore.removeChangeListener(this.listenerCallback);
  },

  componentWillReceiveProps: function () {
    DocumentActions.getDoc({section: 'Overview'});
  },

  render: function () {
    var spinner;
    if (this.state.spinner) {
      spinner = <img className="spinner3" src="/client/assets/bowtie.gif" />;
    }

    return (
      <div className="overviewBg">
        <Grid>
          <Col className="single-page" xs={10} md={10}>
            <Markdown options={{html: true}}>
              {spinner}
              {this.state.overview}
            </Markdown>
          </Col>
          <div><a href="#"><i className="fa fa-angle-double-up scroller"></i></a></div>
        </Grid>
      </div>
    );
  }
});

module.exports = OverviewView;
