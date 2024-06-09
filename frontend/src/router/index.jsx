import { createBrowserRouter } from 'react-router-dom';

import Layout from './Layout';
import AuthRequiredRoute from './AuthRequiredRoute';
import HomePage from '../components/HomePage';
import ProductsPage from '../components/products/ProductsPage';
import ProductDetailsPage from '../components/products/ProductDetailsPage';
import ShopDetailsPage from '../components/shops/ShopDetailsPage';
import AccountPage from '../components/users/AccountPage';
import NewShopForm from '../components/shops/NewShopForm';
import NewProductForm from '../components/products/NewProductForm';

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
        element: <ProductsPage />,
      },
      {
        path: '/products/new',
        element: (
          <AuthRequiredRoute>
            <NewProductForm />
          </AuthRequiredRoute>
        ),
      },
      {
        path: '/products/:productId',
        element: <ProductDetailsPage />,
      },
      {
        path: '/shops/new',
        element: (
          <AuthRequiredRoute>
            <NewShopForm />
          </AuthRequiredRoute>
        ),
      },
      {
        path: '/shops/:shopId',
        element: <ShopDetailsPage />,
      },
      {
        path: '/users/:userId',
        element: (
          <AuthRequiredRoute>
            <AccountPage />
          </AuthRequiredRoute>
        ),
      },
    ],
  },
]);
