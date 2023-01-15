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
  errors: {
    username: string | undefined;
    password: string | undefined;
  };
}

const userNameError = "Please enter a username";
const passwordError = "please enter a password";

class LoginPageInternal extends React.Component<
  LoginPageProps,
  LoginPageState
> {
  state = {
    username: "",
    password: "",
    errors: {
      username: userNameError,
      password: passwordError,
    },
  };

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
              placeholder="Username (*)"
              onChange={(e) =>
                this.setState((state) => ({
                  ...state,
                  username: e.target.value,
                  errors: {
                    ...state.errors,
                    username:
                      e.target.value.length > 0 ? undefined : userNameError,
                  },
                }))
              }
            />
          </label>
          <label>
            <input
              type="password"
              name="password"
              placeholder="Password (*)"
              onChange={(e) =>
                this.setState((state) => ({
                  ...state,
                  password: e.target.value,
                  errors: {
                    ...state.errors,
                    password:
                      e.target.value.length > 0 ? undefined : passwordError,
                  },
                }))
              }
            />
          </label>
          <input
            disabled={
              !!this.state.errors.password || !!this.state.errors.username
            }
            type="submit"
            value="Log in"
          />
        </form>
      </section>
    );
  }
}

export const LoginPage = withRouter(LoginPageInternal);
