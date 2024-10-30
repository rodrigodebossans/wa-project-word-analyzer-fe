import { createBrowserRouter } from 'react-router-dom';
import App from '../app';
import Home from '../pages/home';

/**
 * Defines the routes for the application using `createBrowserRouter`.
 *
 * - The root path (`'/'`) renders the `App` component.
 * - The child route with an empty path (`''`) renders the `Home` component.
 *
 * @constant
 * @type {Router}
 */
export const routers = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
    ],
  },
]);
