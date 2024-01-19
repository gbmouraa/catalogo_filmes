import { AuthProvider } from "./authContext";
import RoutesApp from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <ToastContainer />
        <RoutesApp />
      </div>
    </AuthProvider>
  );
}

export default App;
