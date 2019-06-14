import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Cookies from "js-cookie";
import { setCookie } from "../actions";
import { connect } from "react-redux";
import Button from "./elements/Button";
import Header from "./elements/Header";
import SignupContainer from "../containers/SignupContainer";
import LoginContainer from "../containers/LoginContainer";

class LoginCheck extends Component {
  componentWillMount() {
    const { setCookieInfo } = this.props;
    //If cookie
    if (Cookies.get("key")) {
      //Check with server
      fetch("http://10.0.0.10:3001/cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          signature: Cookies.get("key")
        })
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error with api");
          }
        })
        .then(isGood => {
          if (isGood.data.match) {
            setCookieInfo(Cookies.get("key"));
          } else {
            Cookies.remove("key");
            setCookieInfo("");
          }
        })
        .catch(e => {
          console.log("What?", e.stack);
        });
    }
  }

  render() {
    const { cookie, logout, user } = this.props;
    let routes = (
      <Switch>
        <Route exact path="/" component={LoginContainer} />
        <Route exact path="/signup" component={SignupContainer} />
        <Route component={LoginContainer} />
      </Switch>
    );
    if (cookie) {
      routes = (
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      );
    }
    return (
      <Router>
        <div>
          <header>
            <Header left="Djello" right={cookie ? "Welcome " + user : ""}>
              {cookie ? (
                <Button color="danger" onClick={logout}>
                  Logout
                </Button>
              ) : (
                ""
              )}
            </Header>
          </header>
          {routes}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    cookie: state.cookie,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCookieInfo: cookie => {
      dispatch(setCookie(cookie));
    },
    logout: e => {
      Cookies.remove("key");
      dispatch(setCookie(""));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginCheck);
