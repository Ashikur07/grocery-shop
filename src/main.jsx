import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root/Root.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import AuthProvider from './AuthProvider/AuthProvider.jsx';
import ErrorPage from './components/ErrorPage/ErrorPage.jsx';
import Home from './components/Home/Home.jsx';
import AllArt_craftItems from './components/AllArt&craftItems/AllArt_craftItems.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch(`http://localhost:5000/users`),
      },
      {
        path:'/allArt&craftItems',
        element: <AllArt_craftItems></AllArt_craftItems>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </>,
)