import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './index.css'
import Root from './routes/root';
import ErrorPage from './error-page';
import Home from './routes/home';
import Products from './routes/products';
import Users from './routes/users';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path:"home/",
        element: <Home />,
      },
      {
        path: "users/",
        element: <Users />,
      },
      {
        path: "products/",
        element: <Products />,
      }
    ]
  },

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
