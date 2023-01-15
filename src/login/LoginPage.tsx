import React from "react";
import { NavigateFunction } from "react-router-dom";
import { withRouter } from "../shared/withRouter";

interface LoginPageProps {
  navigate: NavigateFunction;
}
class LoginPageInternal extends React.Component<LoginPageProps> {
  handleSubmit() {
    this.props.navigate("/dashboard");
  }

  render() {
    return (
      <form onSubmit={() => this.handleSubmit()}>
        <label>
          Username:
          <input type="username" name="username" placeholder="Username" />
        </label>
        <label>
          Password:
          <input type="password" name="password" placeholder="Password" />
        </label>
        <input type="submit" value="Login" />
      </form>
    );
  }
}

export const LoginPage = withRouter(LoginPageInternal);
