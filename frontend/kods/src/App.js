import { RouterProvider } from "react-router-dom";
import Tailwind from 'primereact/passthrough/tailwind';
import { router } from "./routes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PrimeReactProvider } from 'primereact/api';
import './index.css'
import "react-toastify/dist/ReactToastify.css";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import './flags.css';
function App() {
  return (
    <GoogleOAuthProvider clientId="544702329959-p56keu2ubbma3tqe8929dvfnvlrm4g5d.apps.googleusercontent.com">
       <PrimeReactProvider>
      <RouterProvider router={router} />
      </PrimeReactProvider>
    </GoogleOAuthProvider>
  )
}

export default App;
