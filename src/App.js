// import logo from './logo.svg';
import './App.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './components/HomePage/HomePage';
import User from './components/HomePage/User/User'
import Home from './components/HomePage/Home/Home'

import Admin from './components/Admin/Admin';
import DashBoard from './components/Admin/DashBoard/DashBoard'
import UserManagement from './components/Admin/UserManagement/UserManagement'

import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/",
        element: <Home />,
      }
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "/admin",
        element: <DashBoard />,
      },
      {
        path: "/admin/user",
        element: <UserManagement />,
      }
    ],
  },
]);


const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
