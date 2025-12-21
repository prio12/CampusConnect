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

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />}></Route>
      <Route path="/admission" element={<Admission />}></Route>
      <Route path="/collegeDetails" element={<CollegeDetails />}></Route>
      <Route path="/colleges" element={<Colleges />}></Route>
      <Route path="/myCollege" element={<MyCollege />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/resetPassword" element={<ResetPassword />}></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
