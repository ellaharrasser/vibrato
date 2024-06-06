import { createBrowserRouter } from 'react-router-dom';

import Layout from './Layout';
import HomePage from '../components/HomePage';
import ProductsPage from '../components/products/ProductsPage';
import ShopDetailsPage from '../components/shops/ShopDetailsPage';
import AccountPage from '../components/users/AccountPage';
import NewShopForm from '../components/shops/NewShopForm';
import NewProductForm from '../components/products/NewProductForm/NewProductForm';

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
      // {
      //   path: '/products/:productId',
      //   element: <ProductDetailsPage />,
      // },
      {
        path: '/products/new',
        element: <NewProductForm />,
      },
      {
        path: '/shops/:shopId',
        element: <ShopDetailsPage />,
      },
      {
        path: '/shops/new',
        element: <NewShopForm />,
      },
      {
        path: '/users/:userId',
        element: <AccountPage />,
      },
    ],
  },
]);
