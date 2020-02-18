import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// flesh messages
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

class Header extends Component {
  state = {
    menuOpen: false
  };

  handleWindowResize = () => {
    // console.log(this)
    if (window.innerWidth > 600) {
      this.setState({
        menuOpen: false
      });
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowResize);
  }

  render() {
    const menuStyles = !this.state.menuOpen
      ? "ui fixed inverted menu"
      : "nav-links";
    const menuExtended = this.state.menuOpen ? "close" : "open";
    const menuFolded = !this.state.menuOpen ? "close" : "open";
    return (
      <>
        <nav>
          <div className="nav-mobile">
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
                <span id="spanOpen" className={menuExtended}>
                  ☰
                </span>
                <span id="spanClose" className={menuFolded}>
                  ×
                </span>{" "}
                Menu
              </button>
            </div>
          </div>
          <div
            className={menuStyles}
            onClick={() =>
              this.setState(prevState => ({
                menuOpen: !prevState.menuOpen
              }))
            }
          >
            <div className="left menu">
              <Link to="/home" className="ui item">
                HOME
              </Link>
              <Link to="/products" className="ui item">
                Products
              </Link>
            </div>
            <div className="right menu">
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
                    {/* {this.props.auth.user.local.username || this.props.auth.user.google.name} */}
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

/*


(<li className="ui item">
                <i className="address card icon"></i> Logged in as
              </li>

              <Link className="ui item" to="/home">
                <i className="address card icon"></i> Finish registration
              </Link>
<li>
<a className="ui item" href="/api/logout">
                <i className="sign out alternate icon"></i>
                Log Out
              </a>
</li>)

*/
