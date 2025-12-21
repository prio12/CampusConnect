import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Admission from '../pages/Admission';
import CollegeDetails from '../pages/CollegeDetails';
import Colleges from '../pages/Colleges';
import MyCollege from '../pages/MyCollege';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import Login from '../pages/Login';
import ResetPassword from '../pages/ResetPassword';
import NotFound from '../pages/NotFound';
import UserLayOut from '../layout/UserLayOut';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayOut />}>
        <Route index element={<Home />} />
        <Route path="/colleges" element={<Colleges />} />

        {/* Private Routes */}
        <Route
          path="/college/:id"
          element={
            <PrivateRoute>
              <CollegeDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/admission"
          element={
            <PrivateRoute>
              <Admission />
            </PrivateRoute>
          }
        />
        <Route
          path="/myCollege"
          element={
            <PrivateRoute>
              <MyCollege />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Route>

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
