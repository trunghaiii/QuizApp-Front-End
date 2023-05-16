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

import Login from "./components/Auth/Login/Login"
import Register from './components/Auth/Register/Register';

import QuizList from './components/HomePage/User/QuizList/QuizList';
import DetailQuiz from './components/HomePage/User/DetailQuiz/DetailQuiz';

import QuizManagement from './components/Admin/QuizManagement/QuizManagement';
import Questions from './components/Admin/QuestionManagement/Questions';

import PrivateRoute from './routes/PrivateRoute';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const NotFound = () => {
  return (
    <div className='alert alert-danger container mt-3'>
      Can not find the route
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "/user",
        element: <PrivateRoute><QuizList /></PrivateRoute>,
      },
      {
        path: "/",
        element: <Home />,
      }
    ],
  },
  {
    path: "/admin",
    element: <PrivateRoute><Admin /></PrivateRoute>,
    children: [
      {
        path: "/admin",
        element: <DashBoard />,
      },
      {
        path: "/admin/user",
        element: <UserManagement />,
      },
      {
        path: "/admin/manage-quiz",
        element: <QuizManagement />,
      },
      {
        path: "/admin/manage-question",
        element: <Questions />,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/user/:id",
    element: <DetailQuiz />,
  },
  {
    path: "*",
    element: <NotFound />,
  }
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
