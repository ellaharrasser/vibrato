import { createBrowserRouter } from 'react-router-dom';

import Layout from './Layout';
import HomePage from '../components/HomePage';
import ProductsPage from '../components/ProductsPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/products',
        element: <ProductsPage />
      }
    ],
  },
]);
