var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var $ = require('jquery');
var ReactBootstrap = require('react-bootstrap');
var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;
var DropdownButton = ReactBootstrap.DropdownButton;
var MenuItem = ReactBootstrap.MenuItem;

var NavView = React.createClass({
  render: function () {
    $(document).ready(function () {
        // our function that decides weather the navigation bar should have "fixed" css position or not.
        var sticky_navigation = function () {
          // grab the initial top offset of the navigation
          var sticky_navigation_offset_top = 200;
          var scroll_top = $(window).scrollTop();
          // if we've scrolled more than the navigation, change its position to fixed to stick to top, otherwise change it back to relative
          if (scroll_top > sticky_navigation_offset_top) {
            $('.nav-bar').animate({ height: '4em'}, 50, function () {
              $('.logo').slideUp(function () {
                $('.icon').slideDown();
              });
            });
            $('.docs-menu').animate({'margin-top': '-4em'}, 50);
            $('.link').animate({'margin-top': '-4em'}, 50);
            $('.learn').animate({'margin-top': '-2.1em'}, 50);
            $('.icons').animate({'margin-top': '-2em'}, 50);
          } else {
            $('.nav-bar').animate({ height: '8em'}, 50, function () {
              $('.icon').slideUp(function () {
                $('.logo').slideDown();
              });
            });
            $('.docs-menu').animate({'margin-top': '0em'}, 50);
            $('.link').animate({'margin-top': '-2em'}, 50);
            $('.learn').animate({'margin-top': '-.1em'}, 50);
            $('.icons').animate({'margin-top': '0em'}, 50);
          };
          $('#relephant').css('margin-left', '-100%');
          $('#relephant2').css('margin-right', '-100%');
        }

        // run our function on load
        sticky_navigation();

        var scroller = function () {
          var scroll_top = $(window).scrollTop();
          // scroller
          if (scroll_top > 200) {
            $(".scroller").css('visibility', 'visible');
            $(".scroller").fadeIn();
          } else {
            $(".scroller").fadeOut();
          }
        };
        scroller();
    });

    return (
      <div>
        <Navbar className="nav-bar">
          <Nav>
            <NavItem className="link">
              <Link to="home">
                <img className='logo' src="/client/assets/Tuxx-logo.png" />
                <img className='icon' src="/client/assets/Tuxx-icon.png" />
              </Link>
            </NavItem>
            <NavItem className="link">
              <Link to="home">Home</Link>
            </NavItem>
            <DropdownButton className="learn" title="Learn">
              <MenuItem>
                 <Link to="overview">Overview</Link>
              </MenuItem>
              <MenuItem>
                <Link to="getting-started">Getting Started</Link>
              </MenuItem>
              <MenuItem divider />
              <MenuItem><a href="https://github.com/TuxedoJS/TuxxChatApp">Tuxx Chat App</a></MenuItem>
              <MenuItem><a href="https://github.com/TuxedoJS/TuxxTodoApp">Tuxx ToDo App</a></MenuItem>
            </DropdownButton>
            <NavItem className="link">
              <Link to="docs">Documentation</Link>
            </NavItem>
            <NavItem className="link">
              <Link to="contributors">Contributors</Link>
            </NavItem>
          </Nav>
          <Nav className="icons">
            <NavItem className="github-icon" href="https://github.com/TuxedoJS" target="_blank">
              <i className="fa fa-github-square"></i> Github
            </NavItem>
          </Nav>
        </Navbar>
        <RouteHandler />
      </div>
    );
  }
});

module.exports = NavView;
