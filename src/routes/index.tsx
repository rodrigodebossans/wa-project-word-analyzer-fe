import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home';

export const routers = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />
      },
    ],
  },
]);
