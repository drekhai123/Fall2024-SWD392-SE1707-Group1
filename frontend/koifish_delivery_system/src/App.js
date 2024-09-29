
import './App.css';
import Homepage from './components/common/homepage';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes';

function App() {
  return <RouterProvider router={router} />;
  return (
    <Homepage/>
  );
}

export default App;
