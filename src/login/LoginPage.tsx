import React from "react";
import { NavigateFunction } from "react-router-dom";
import { withRouter } from "../shared/withRouter";
import styles from "./LoginPage.module.scss";

interface LoginPageProps {
  navigate: NavigateFunction;
}

interface LoginPageState {
  username: string;
  password: string;
}

class LoginPageInternal extends React.Component<
  LoginPageProps,
  LoginPageState
> {
  constructor(props: LoginPageProps) {
    super(props);
    this.state = { username: "", password: "" };
  }
  handleSubmit() {
    this.props.navigate("/dashboard");
  }

  render() {
    return (
      <section className={styles.page}>
        <form className={styles.form} onSubmit={() => this.handleSubmit()}>
          <h2>Lorem Ipsum</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <label>
            <input
              type="username"
              name="username"
              placeholder="Username"
              onChange={(e) =>
                this.setState((state) => ({
                  ...state,
                  username: e.target.value,
                }))
              }
            />
          </label>
          <label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) =>
                this.setState((state) => ({
                  ...state,
                  password: e.target.value,
                }))
              }
            />
          </label>
          <input type="submit" value="Log in" />
        </form>
      </section>
    );
  }
}

export const LoginPage = withRouter(LoginPageInternal);
