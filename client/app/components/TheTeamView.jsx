var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var ReactBootstrap = require('react-bootstrap');
var Col = ReactBootstrap.Col;
var Row = ReactBootstrap.Row;
var Grid = ReactBootstrap.Grid;
var DocumentStore = require('../stores/DocumentStore');
var DocumentActions = require('../actions/DocumentActions');

var TheTeamView = React.createClass({
  getInitialState: function () {
    return {
      contributing: DocumentStore.getSingleDoc('CONTRIBUTING'),
      spinner: false
    };
  },

  listenerCallback: function () {
    this.setState({
      contributing: DocumentStore.getSingleDoc('CONTRIBUTING'),
      spinner: false
    });
  },

  componentDidMount: function () {
    DocumentStore.addChangeListener(this.listenerCallback);
    DocumentActions.getDoc('CONTRIBUTING');
    if (!this.state.contributing) {
      this.setState({spinner: true});
    }
  },

  componentWillUnmount: function () {
    DocumentStore.removeChangeListener(this.listenerCallback);
  },

  render: function () {
    return (
      <div>
        <div className="header"></div>
        <Grid className="grid">
          <Row className="the-team">
            <h1 className="team">The TuxedoJS Team</h1>
            <br />
            <Col className="profile" md={3} xsoffset={2}>
              <a href="https://github.com/sjstebbins">
                <img className="team-profiles" src="https://avatars2.githubusercontent.com/u/455819?v=3&s=460" />
                <h3 className="team-names">Spencer Stebbins <i className="fa fa-github-square"></i></h3>
                <h4 className="team-names">Product Manager & UI / Animation Assassin</h4>
              </a>
            </Col>
            <Col className="profile" md={3} xsoffset={2}>
              <a href="https://github.com/drabinowitz">
                <img className="team-profiles" src="https://avatars0.githubusercontent.com/u/7275304?v=3&s=400" />
                <h3 className="team-names">Dmitri Rabinowitz <i className="fa fa-github-square"></i></h3>
                <h4 className="team-names">Lead Dev & Tuxx Totalitarian</h4>
              </a>
            </Col>
            <Col className="profile" md={3} xsoffset={2}>
              <a href="https://github.com/plauer">
                <img className="team-profiles" src="https://avatars0.githubusercontent.com/u/4451274?v=3&s=400" />
                <h3 className="team-names">Pat Lauer <i className="fa fa-github-square"></i></h3>
                <h4 className="team-names">Software Engineer & Everything Evangelist</h4>
              </a>
            </Col>
            <Col className="profile" md={3} xsoffset={2}>
              <a href="https://github.com/Cheerazar">
                <img className="team-profiles" src="https://avatars2.githubusercontent.com/u/5581107?v=3&s=400" />
                <h3 className="team-names">Gunnari Auvinen <i className="fa fa-github-square"></i></h3>
                <h4 className="team-names">Scrum Master & Code Standard Commander</h4>
              </a>
            </Col>
          </Row>
          <Row className="contributeRow">
            <Col className="contributeView" xs={12} md={12}>
              <h3>Contribute</h3>
              <h4>Please visit the Tuxedo.js github repo here:
                <a href="https://github.com/TuxedoJS/TuxedoJS" target="_blank"> <i className="fa fa-github-square"></i></a>
              </h4>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});

module.exports = TheTeamView;
