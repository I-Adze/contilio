import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const withRouter = <T extends { navigate: NavigateFunction }>(
  Component: typeof React.Component<T>
) => {
  const Wrapper = (props: Omit<T, "navigate">) => {
    const navigate = useNavigate();

    return <Component {...props} navigate={navigate} />;
  };

  return Wrapper;
};
