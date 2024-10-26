import { RouterProvider } from "react-router-dom";

import { router } from "./routes";
import Mapping from "./components/customer/PlaceOrder";
import "primereact/resources/themes/saga-blue/theme.css"; 
import "primereact/resources/primereact.min.css"; 
import "primeicons/primeicons.css";
function App() {
  return <RouterProvider router={router} />;
}

export default App;
