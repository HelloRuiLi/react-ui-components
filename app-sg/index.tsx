import { css } from 'glamor';
import createBrowserHistory from 'history/createBrowserHistory';
import { map } from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Route,
  RouteProps,
  Router,
  Switch,
} from 'react-router';
import { Link } from 'react-router-dom';

const req = (require as any).context('../app-components', true, /\/__examples__\/.*.tsx$/);

const renderComponent = (Examples: React.Component[]) => {
  return class extends React.Component<any, any> {
    render() {
      return [
        <aside key='aside'>aside</aside>,
        map(Examples, (Example: any, idx: number) => (
          <Example key={idx}/>
        )),
      ];
    }
  };
};

const browserHistory = createBrowserHistory();
const routesConfig = req.keys().map((key: string) => {
  return {
    path: `/${key.split('/').reverse()[2]}`,
    component: renderComponent(req(key)),
  };
});

const getRouterRoutes = (routes: RouteProps[]) => {
  return routes.map((route: RouteProps, idx: number) => {
    return <Route path={route.path} component={route.component} key={idx}/>;
  });
};

const navItemStyles = css({
  fontSize: '1rem',
  color: '#222',
});

class App extends React.Component<any, any> {
  render() {
    return (
      <Router history={browserHistory}>
        <div>
          <aside>
            {
              map(routesConfig, (routeConfig: any, idx: number) => (
                <Link to={routeConfig.path} key={idx} {...navItemStyles}>{routeConfig.path.split('/')[1]}</Link>
              ))
            }
          </aside>
          <Switch>
            {getRouterRoutes(routesConfig)}
          </Switch>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
