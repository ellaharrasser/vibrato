import { createBrowserRouter } from 'react-router-dom';

import Layout from './Layout';
import HomePage from '../components/HomePage';
import ProductsPage from '../components/products/ProductsPage';
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
        element: <NewProductForm />,
      },
      // {
      //   path: '/products/:productId',
      //   element: <ProductDetailsPage />,
      // },
      {
        path: '/shops/new',
        element: <NewShopForm />,
      },
      {
        path: '/shops/:shopId',
        element: <ShopDetailsPage />,
      },
      {
        path: '/users/:userId',
        element: <AccountPage />,
      },
    ],
  },
]);
