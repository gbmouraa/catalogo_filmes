import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./authContext";
import RoutesApp from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer autoClose={1400} />
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
