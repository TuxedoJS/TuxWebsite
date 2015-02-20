var React = require('react');
var Router = require('react-router');
var ReactBootstrap = require('react-bootstrap');
var Col = ReactBootstrap.Col;
var Row = ReactBootstrap.Row;
var Grid = ReactBootstrap.Grid;
var Markdown = require('react-remarkable');
var DocumentStore = require('../stores/DocumentStore');
var DocumentActions = require('../actions/DocumentActions');

var GettingStartedView = React.createClass({
  getInitialState: function () {
    return {
      gettingStarted: DocumentStore.getSingleDoc('Getting-Started'),
      spinner: false
    };
  },

  listenerCallback: function () {
    this.setState({
      gettingStarted: DocumentStore.getSingleDoc('Getting-Started'),
      spinner: false
    });
  },

  componentDidMount: function () {
    DocumentStore.addChangeListener(this.listenerCallback);
    DocumentActions.getDoc({section: 'Getting-Started'});
    this.setState({spinner: true});
  },

  componentWillUnmount: function () {
    DocumentStore.removeChangeListener(this.listenerCallback);
  },

  componentWillReceiveProps: function () {
    DocumentActions.getDoc({section: 'Getting-Started'});
  },

  render: function () {
    var spinner;
    if (this.state.spinner) {
      spinner = <img className="spinner3" src="/client/assets/bowtie.gif" />;
    }

    return (
      <div>
        <div className="gettingStartedBg">
          <Grid>
            <Col className="single-page" xs={10} md={10} xoffset={2}>
              <Markdown options={{html: true}}>
                {spinner}
                {this.state.gettingStarted}
              </Markdown>
            </Col>
            <div><a href="#"><i className="fa fa-angle-double-up scroller"></i></a></div>
          </Grid>
        </div>
      </div>
    );
  }
});

module.exports = GettingStartedView;
