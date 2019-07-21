import React, { Component } from "react";
import { Link } from "react-router-dom";

class AppLogin extends Component {
  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }


  handleLogin = e => {
    e.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    // const loginRequest = {
    //   query: `{
    //     login(email:"${email}",password:"${password}"){
    //       userId
    //       accessToken
    //     }
    //   }
    // `};

    // fetch("http://localhost:5000/graphql", {
    //   method: "POST",
    //   body: JSON.stringify(loginRequest),
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept":"application/json"
    //   }
    // })
    //   .then(res => {
    //     if (res.status !== 200 && res.status !== 201) {
    //       throw new Error("Failed!");
    //     }
    //     return res.json();
    //   })
    //   .then(resData => {
    //     console.log(resData);
    //     this.setState({
    //       token: resData.data.login.accessToken,
    //       userId: resData.data.login.userId
    //     })
    //   })
    //   .catch();

  };
  render() {

    return (
      <React.Fragment>
        <div className="login-container">
          <div className="d-flex justify-content-center h-100">
            <div className="card login-card">
              <div className="card-header">
                <h3 className="float-left">Sign In</h3>
                <div className="d-flex justify-content-end social_icon">
                  <span>
                    <i className="fab fa-facebook-square" />
                  </span>
                  <span>
                    <i className="fab fa-google-plus-square" />
                  </span>
                  <span>
                    <i className="fab fa-twitter-square" />
                  </span>
                </div>
              </div>
              <div className="card-body">
                <form onSubmit={this.handleLogin}>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-at" />
                      </span>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="email"
                      ref={this.emailEl}
                    />
                  </div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-key" />
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="password"
                      ref={this.passwordEl}
                    />
                  </div>
                  <div className="row align-items-center remember">
                    <input type="checkbox" />
                    Remember Me
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Login"
                      className="btn float-right login_btn bg-dark text-white"
                    />
                  </div>
                </form>
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-center links">
                  Don't have an account?<Link to="/register">Sign Up</Link>
                </div>
                <div className="d-flex justify-content-center">
                  <a href='google.com'>Forgot your password?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AppLogin;
