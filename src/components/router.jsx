import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';

// --- LAZY LOADING SECTION ---

const ProductList = lazy(function() {
  return import('./ProductList');
});

const ProductDetail = lazy(function() {
  return import('./ProductDetails');
});

const Cart = lazy(function() {
  return import('./Cart');
});

const Checkout = lazy(function() {
  return import('./CheckOut');
});

const NotFound = lazy(function() {
  return import('./NotFound');
});

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <ProductList /> },
        { path: 'Product/:id', element: <ProductDetail /> },
        { path: 'Cart', element: <Cart /> },
        { path: 'CheckOut', element: <Checkout /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  {
    basename: '/ShoppyGlobe-E-commerce-Application',
  }
);

export default router;