import { css } from "glamor";
import { createBrowserHistory } from "history";
import React from "react";
import { render } from "react-dom";
import { Router, Switch } from "react-router";
import { Nav } from "./components/Nav";
import { getRouterRoutes } from "./getRouterRoutes";
import { routesConfig } from "./getRoutesConfig";
import { ThemeContext } from "./ThemeContext";

const browserHistory = createBrowserHistory();

const containerStyles = css({
  position: "absolute",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  display: "flex",
});

const mainStyles = css({
  padding: "1rem",
  flex: 1,
  overflow: "scroll",
});

class App extends React.Component<any, any> {
  state = {
    theme: "light",
  };

  render() {
    return (
      <Router history={browserHistory}>
        <div {...containerStyles}>
          <ThemeContext.Provider
            value={{
              theme: this.state.theme,
              toggleTheme: () => {
                this.setState({
                  theme: this.state.theme === "light" ? "dark" : "light",
                });
              },
            }}
          >
            <Nav routesConfig={routesConfig} />
          </ThemeContext.Provider>
          <main {...mainStyles}>
            <Switch>{getRouterRoutes(routesConfig)}</Switch>
          </main>
        </div>
      </Router>
    );
  }
}

render(<App />, document.getElementById("app"));
