import { createBrowserRouter } from 'react-router-dom';

import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      }
    ],
  },
]);
