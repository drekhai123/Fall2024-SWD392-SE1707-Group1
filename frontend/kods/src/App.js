import {RouterProvider} from 'react-router-dom';

import {router} from './routes';
import Mapping from './components/customer/PlaceOrder';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
