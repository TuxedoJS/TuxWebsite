'use strict';

var React = require('react');
var NavView = require('./app/components/NavView.jsx');
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var DefaultWelcome = require('./app/components/DefaultWelcome.jsx');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var Redirect = Router.Redirect;
var NotFound = require('./app/components/NotFound.jsx');
var GettingStartedView = require('./app/components/GettingStartedView.jsx');
var DocsView = require('./app/components/docs/DocsView.jsx');
var SectionView = require('./app/components/docs/sections/SectionView.jsx');
var SectionHandler = require('./app/components/docs/sections/SectionHandler.jsx');
var TheTeamView = require('./app/components/TheTeamView.jsx');
var DefaultDocView = require('./app/components/DefaultDocView.jsx');
var OverviewView = require('./app/components/OverviewView.jsx');
var ContributingView = require('./app/components/ContributingView.jsx');

var routes = (
  <Route name="home" path="/" handler={NavView}>
    <DefaultRoute handler={DefaultWelcome} />
    <Route name="docs" path="/docs" handler={DocsView}>
      <DefaultRoute handler={DefaultDocView} />
      <Route name="docs.section" path="/docs/:section" handler={SectionHandler}>
        <DefaultRoute handler={SectionView} />
      </Route>
    </Route>
    <Route name="getting-started" path="/getting-started" handler={GettingStartedView} />
    <Route name="overview" path="/overview" handler={OverviewView} />
    <Route name="contributors" path="/contributors" handler={TheTeamView} />
    <Route name="contributing" path="/contributing" handler={ContributingView} />
    <Redirect from="/CONTRIBUTING.md" to="contributing" />
    <NotFoundRoute handler={NotFound} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler />, document.getElementById("main"));
});
