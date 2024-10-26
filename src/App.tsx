import { Outlet } from 'react-router-dom';
import { GlobalStyle } from './global';
import { Component } from 'react';

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
