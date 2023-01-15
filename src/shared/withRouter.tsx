import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

/**
 * This wrapper was necessary to use navigation inside a class component in the latest version of react-router
 *
 * @param {typeof React.Component<T>} Component - Component to wrap with navigation capability.
 *  <br> Must accept a navigate prop of type @type {NavigateFunction} that will be injected in
 * @returns The wrapped component
 */
export const withRouter = <T extends { navigate: NavigateFunction }>(
  Component: typeof React.Component<T>
) => {
  const Wrapper = (props: Omit<T, "navigate">) => {
    const navigate = useNavigate();

    // TS won't accept the type Omit<T, "navigate"> & {navigate: NavigateFunction} as props for the
    // component, so we have to do some hinting here
    const propsWithNavigate = { ...props, navigate } as T;

    return <Component {...propsWithNavigate} />;
  };

  return Wrapper;
};
