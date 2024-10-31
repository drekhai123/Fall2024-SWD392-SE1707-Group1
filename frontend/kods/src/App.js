import { RouterProvider } from "react-router-dom";

import { router } from "./routes";
import Mapping from "./components/customer/PlaceOrder";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
function App() {
  return (
    <GoogleOAuthProvider clientId="544702329959-p56keu2ubbma3tqe8929dvfnvlrm4g5d.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  )
}

export default App;
