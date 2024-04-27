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
import AddCraftItem from './components/AddCraftItem/AddCraftItem.jsx';
import MyArtCraftList from './components/MyArtCraftList/MyArtCraftList.jsx';
import Details from './components/Details/Details.jsx';
import UpdateItem from './components/Update/UpdateItem.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import CraftDetails from './components/CraftDetails/CraftDetails.jsx';


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
        path: '/allArt&craftItems',
        element: <AllArt_craftItems></AllArt_craftItems>,
        loader: () => fetch(`http://localhost:5000/items`),
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
      {
        path: '/addCraftItem',
        element: <PrivateRoute><AddCraftItem></AddCraftItem></PrivateRoute>,
      },
      {
        path: '/myArt&craftList',
        element: <PrivateRoute><MyArtCraftList></MyArtCraftList></PrivateRoute>,
        loader: () => fetch(`http://localhost:5000/items`),
      },
      {
        path: 'details/:id',
        element: <PrivateRoute><Details></Details></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/items/${params.id}`),
      },
      {
        path: 'craftDetails/:id',
        element: <PrivateRoute><CraftDetails></CraftDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/craftItems/${params.id}`),
      },
      {
        path: 'update/:id',
        element: <UpdateItem></UpdateItem>,
        loader: ({params}) => fetch(`http://localhost:5000/items/${params.id}`)
      }
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