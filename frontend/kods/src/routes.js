import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './components/common/LoginPage';
import SignupPage from './components/common/SignupPage';
import ProfilePage from './components/customer/ProfilePage';
import OrderHistoryPage from './components/customer/OrderHistoryPage';
<<<<<<< HEAD:frontend/koifish_delivery_system/src/routes.js
import Homepage from './components/common/Homepage';
=======
import Homepage from './components/common/Homepages';
>>>>>>> main:frontend/kods/src/routes.js
import Feedback from './components/customer/Feedback';
import FeedbackList from './components/customer/FeedbackList';
import OrderForm from './components/customer/OrderForm';
import OrderStatusTracking from './components/customer/OrderStatusTracking';
import TrackingStaff from './components/admin/TrackingStaff';

<<<<<<< HEAD:frontend/koifish_delivery_system/src/routes.js

=======
>>>>>>> main:frontend/kods/src/routes.js
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/order-history',
    element: <OrderHistoryPage />,
  },
  {
    path: '/feedback',
    element: <Feedback />,
  },
  {
    path: '/orderform',
    element: <OrderForm />,
  },
  {
    path: '/feedback-list',
    element: <FeedbackList />,
  },

  {
    path: '/ordertracking',
    element: <OrderStatusTracking />,
  },
  {
    path: '/trackingstaff',
    element: <TrackingStaff />,
  },

]);
