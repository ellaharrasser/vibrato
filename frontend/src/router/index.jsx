import { createBrowserRouter } from 'react-router-dom';

import Layout from './Layout';
import HomePage from '../components/HomePage';
import ProductsPage from '../components/products/ProductsPage';
import ShopDetailsPage from '../components/shops/ShopDetailsPage';
import AccountPage from '../components/users/AccountPage';
import NewShopForm from '../components/shops/NewShopForm';
import EditShopForm from '../components/shops/EditShopForm';
import NewProductForm from '../components/products/NewProductForm';
import EditProductForm from '../components/products/EditProductForm';

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
        path: '/products/:productId/edit',
        element: <EditProductForm />,
      },
      {
        path: '/shops/new',
        element: <NewShopForm />,
      },
      {
        path: '/shops/:shopId',
        element: <ShopDetailsPage />,
      },
      {
        path: '/shops/:shopId/edit',
        element: <EditShopForm />,
      },
      {
        path: '/users/:userId',
        element: <AccountPage />,
      },
    ],
  },
]);
