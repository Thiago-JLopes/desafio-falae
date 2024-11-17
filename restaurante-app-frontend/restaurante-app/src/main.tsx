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
import Clientes, { loader as clientesLoader } from "./routes/clientes";
import Products, { loader as productsLoader } from './routes/products';

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
        element: <Clientes />,
        loader: clientesLoader,
      },
      {
        path: "products/",
        element: <Products />,
        loader: productsLoader,
      }
    ]
  },

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
