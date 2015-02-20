var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Col = ReactBootstrap.Col;
var Row = ReactBootstrap.Row;
var Grid = ReactBootstrap.Grid;
var Button = ReactBootstrap.Button;
var $ = require('jquery');
var DocumentActions = require('../actions/DocumentActions');
var DocumentStore = require('../stores/DocumentStore');
var Markdown = require('react-remarkable');

var DefaultWelcome = React.createClass({
  getInitialState: function () {
    return {
      readMe: DocumentStore.getSingleDoc('README')
    };
  },

  listenerCallback: function () {
    this.setState({
      readMe: DocumentStore.getSingleDoc('README')
    });
  },

  componentDidMount: function () {
    DocumentStore.addChangeListener(this.listenerCallback);
    DocumentActions.getDoc({section: 'README'});
  },

  componentWillUnmount: function () {
    DocumentStore.removeChangeListener(this.listenerCallback);
  },

  componentWillReceiveProps: function () {
    DocumentActions.getDoc({section: 'README'});
  },

  render: function () {
    $(document).ready(function () {
      $(function () {
        setInterval( function () {
          $('.readMeArrow').fadeIn(2000);
          $('.readMeArrow').fadeOut(2000);
        }, 4000);

        $('.tagline').slideDown(2000);
      });
    });

    return (
      <div>
        <div className="header"></div>
        <Grid className="grid">
          <div className="tuxbg"/>
          <Row className="show-grid section1">
            <Col className="intro" xs={12} xsoffset={2}>
              <img className="tuxedo" src="/client/assets/tuxedojs.png" />
              <h4 className="tagline">It is like React, but with more bowties.</h4>
              <br />
              <div className="item-container"><img className="bowtie" src="/client/assets/Tuxx-icon.png" /></div>
              <div className="item-container"><img className="dot1 dots" src="/client/assets/dot.png" /></div>
              <div className="item-container"><img className="dot2 dots" src="/client/assets/dot.png" /></div>
              <br />
              <br />
              <br />
              <Button className="github" bsSize="large" href="https://github.com/TuxedoJS/TuxedoJS">
                <i className="fa fa-github-square"> View on Github</i>
              </Button>
              <Button className="download" bsSize="large" href="https://www.npmjs.com/package/tuxx">
                <i className="fa fa-cloud-download"> View on NPM</i>
              </Button>
            </Col>
            </Row>
            <div className="section2bg" />
            <Row className="section2">
              <Col className="why-tux" md={12} xsoffset={2}>
                <h1>Why Tuxedo.js?</h1>
                <br />
                <h3>Tuxx is a feature complete framework built on the React view layer, Flux Architecture, and CommonJS modules</h3>
                <h4>Get all the performance benefits of React with the semantic abstraction and power of Tuxx</h4>
                <br />
                <Markdown className="npm">
                  {'``` npm install tuxx ```'}
                </Markdown>
                <br />
                <br />
              </Col>
              <Col className="feature" md={6} xsoffset={2}>
                <a href="/docs/TuxxModularity"><h1>Graceful Degradation</h1></a>
                <h4>Require only the modules you need</h4>
                <img src="/client/assets/require.png" />
              </Col>
              <Col className="feature" md={6} xsoffset={2}>
                <a href="/docs/TuxxArchitecture"><h1>Revolutionary App Architecture</h1></a>
                <h4>Define all model dependancies in a single file with</h4>
                <h4>beautiful self-documenting syntax</h4>
                <img src="/client/assets/architect.png" />
              </Col>
              <Col className="feature" md={6} xsoffset={2}>
                <a href="/docs/TuxxActions"><h1>Semantic Action Creation</h1></a>
                <h4>Easily define app actions</h4>
                <img src="/client/assets/actions.png" />
              </Col>
              <Col className="feature" md={6} xsoffset={2}>
                <a href="/docs/TuxxAnimations"><h1>Custom Animation Library</h1></a>
                <h4>One-line expressive animations</h4>
                <img src="/client/assets/animation.png" />
              </Col>
              <Col md={12} xsoffset={2}>
                <div className="readMediv">
                  <h4>Scroll For ReadMe</h4>
                  <i className="fa fa-angle-double-down readMeArrow"></i>
                </div>
              </Col>
            </Row>
            <Row className="section3">
              <Col className="readMe" xs={10} xsoffset={2}>
                <Markdown options={{html: true}}>
                  {this.state.readMe}
                </Markdown>
                <div><a href="#"><i className="fa fa-angle-double-up scroller"></i></a></div>
              </Col>
            </Row>
        </Grid>
      </div>
    );
  }
});

module.exports = DefaultWelcome;
