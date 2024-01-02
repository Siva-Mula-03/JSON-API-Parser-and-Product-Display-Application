/*Create a basic frontend of a login dashboard with the below mentioned functionality
The user name field should only accept an email format. The validation should happen
through Javascript.
● The password field must be a masked field i.e. should not reveal what's being entered.
● The password field should not accept any special character other than @ and must
contain an uppercase letter and a number.*/

import React, { Component } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { login } from "../../services/login";
import { withRouter } from "react-router-dom";

const useStyles = {
  root: {
    "& .MuiTextField-root": {
      margin: "10px 0",
      width: "100%",
    },
    "& .MuiButton-root": {
      margin: "10px 0",
      width: "100%",
    },
  },
};
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
    };
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  login = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      const { data } = await login({ email, password });
      localStorage.setItem("token", data.token);
      this.props.history.push("/dashboard");
    } catch (error) {
      this.setState({ errorMessage: error.response.data.message });
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="login-container">
        <div className="login-form">
          <h1>LOGIN</h1>
          <form onSubmit={this.login} className={classes.root}>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              variant="outlined"
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              variant="outlined"
            />
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
            {this.state.errorMessage && (
              <p style={{ color: "red" }}>{this.state.errorMessage}</p>
            )}
            <Link to="/register">Register</Link>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(useStyles)(Login));
