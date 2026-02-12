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

const router = createBrowserRouter([
  {
    // The main path starts at the root
    path: '/',
    element: <App />,
    // If there is a big error, show the 404 page
    errorElement: <NotFound />,
    children: [
      {
        // the Home page
        index: true,
        element: <ProductList />,
      },
      {
        // The colon :id 
        path: 'Product/:id',
        element: <ProductDetail />,
      },
      {
        // The shopping cart page
        path: 'Cart',
        element: <Cart />,
      },
      {
        // The final checkout page
        path: 'CheckOut',
        element: <Checkout />,
      },
      {
        // The asterisk * means "anything else" 
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;