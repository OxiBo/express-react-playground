import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  state = {
    menuOpen: false
  };

  handleWindowResize = () => {
    // https://medium.com/@renatorib/tackling-responsive-elements-in-react-and-why-ive-created-react-sizes-f7c87e3f9e64
    if (window.innerWidth > 600) {
      this.setState({
        menuOpen: false
      });
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
  }

  onMenuClick() {
    this.setState(prevState => ({
      menuOpen: !prevState.menuOpen
    }));
  }
  render() {
    // const menuStyles = !this.state.menuOpen
    //   ? "ui fixed inverted menu"
    //   : "nav-links";
    const { menuOpen } = this.state;
    const hamburgerShow = menuOpen ? "close" : "open";
    const hamburgerHide = !menuOpen ? "close" : "open";
    const menuOpenStyles = menuOpen ? "menuOpen" : "";
    return (
      <>
        <nav>
          <div className="ui fixed inverted menu nav-links">
            <div id="nav-button">
              <button
                onClick={() =>
                  this.setState(prevState => ({
                    menuOpen: !prevState.menuOpen
                  }))
                }
                id="toggle"
                aria-expanded="false"
                aria-controls="menu-list"
              >
                <span id="spanOpen" className={hamburgerShow}>
                  ☰
                </span>
                <span id="spanClose" className={hamburgerHide}>
                  ×
                </span>
                Menu
              </button>
            </div>
            <div
              id="left-menu"
              className={`left menu ${menuOpenStyles}`}
              onClick={() => this.onMenuClick()}
            >
              <Link to="/home" className="ui item">
                HOME
              </Link>
              <Link to="/products" className="ui item">
                Products
              </Link>
            </div>
            <div
              className={`right menu ${menuOpenStyles}`}
              onClick={() => this.onMenuClick()}
            >
              {this.props.auth.user ? (
                <>
                  <Link to={`/product-testing`} className="ui item">
                    <i className="amazon icon"></i>
                    Testing
                  </Link>
                  <Link
                    to={`/user-profile/${this.props.auth.user._id}`}
                    className="ui item"
                  >
                    <i className="address card outline icon"></i>
                    View Profile
                  </Link>
                  <a className="ui item" href="#">
                    Logged in as&nbsp;
                    {this.props.auth.user.google &&
                      this.props.auth.user.google.name}
                    {this.props.auth.user.local &&
                      this.props.auth.user.local.username}
                    {this.props.auth.user.facebook &&
                      this.props.auth.user.facebook.name}
                  </a>
                  <a href="/api/logout" className="ui item">
                    <i className="sign out icon"></i>
                    Log Out
                  </a>
                </>
              ) : (
                <>
                  <Link to="/" className="ui item">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  // console.log(state.auth.user.local.username);
  return {
    auth
  };
};

export default connect(mapStateToProps)(Header);
