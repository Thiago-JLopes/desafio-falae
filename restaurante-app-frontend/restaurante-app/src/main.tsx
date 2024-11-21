import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './index.css'
import Root from './routes/root';
import ErrorPage from './error-page';
import Products from './routes/products';
import Users from './routes/users';
import Menu from './routes/menu';
import { Orders } from './routes/orders';
import Index from './routes';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {index:true, element: <Index/>},
      {
        path:"menu/",
        element: <Menu />,
      },
      {
        path: "users/",
        element: <Users />,
      },
      {
        path: "products/",
        element: <Products />,
      },
      {
        path: "orders/",
        element: <Orders />
      }
    ]
  },

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
