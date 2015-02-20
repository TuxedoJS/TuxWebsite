var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Markdown = require('react-remarkable');
var DocumentStore = require('../../../stores/DocumentStore');
var DocumentActions = require('../../../actions/DocumentActions');

var SectionView = React.createClass({
  mixins: [Router.State],

  getInitialState: function () {
    return {
      section: DocumentStore.getSingleDoc(this.getParams().section),
      spinner: false
    };
  },

  listenerCallback: function () {
    this.setState({
      section: DocumentStore.getSingleDoc(this.getParams().section),
      spinner: false
    });
  },

  componentDidMount: function () {
    var currentParams = this.getParams();
    this.__currentSection = currentParams.section;
    DocumentStore.addChangeListener(this.listenerCallback);
    DocumentActions.getDoc(currentParams);
    if (!this.state.section) {
      this.setState({spinner: true});
    }
  },

  componentWillUnmount: function () {
    DocumentStore.removeChangeListener(this.listenerCallback);
  },

  componentDidUpdate: function () {
    var hash = window.location.hash;
    if (hash) {
      window.location.href = window.location.href;
    }
  },

  componentWillReceiveProps: function () {
    var currentParams = this.getParams();
    if (this.__currentSection !== currentParams.section) {
      this.setState({spinner: true, section: null});
      DocumentActions.getDoc(currentParams);
      this.__currentSection = currentParams.section;
    }
  },

  render: function () {
    var spinner;
    if (this.state.spinner) {
      spinner = <img className="spinner2" src="/client/assets/bowtie.gif" />;
    }

    return (
      <div>
        <Markdown options={{html: true}}>
          {this.state.section}
        </Markdown>
        {spinner}
      </div>
    );
  }
});

module.exports = SectionView;
