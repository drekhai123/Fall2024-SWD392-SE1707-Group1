import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './components/common/LoginPage';
import SignupPage from './components/common/SignupPage';
import ProfilePage from './components/customer/ProfilePage';
import OrderHistoryPage from './components/customer/OrderHistoryPage';
import Homepage from './components/common/Homepage';
import Feedback from './components/customer/Feedback';
import FeedbackList from './components/customer/FeedbackList';

import OrderStatusTracking from './components/customer/OrderStatusTracking';
import TrackingStaff from './components/admin/TrackingStaff';



export const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage/>,
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
