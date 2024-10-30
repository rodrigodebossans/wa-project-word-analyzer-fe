import { Outlet } from 'react-router-dom';
import { GlobalStyle } from './global';
import { Component } from 'react';

/**
 * The `App` component serves as the root component for the application.
 * It includes global styles and renders the current route's component using `Outlet`.
 *
 * @component
 * @example
 * return (
 *   <App />
 * )
 */
class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <Outlet />
      </>
    );
  }
}

export default App;
