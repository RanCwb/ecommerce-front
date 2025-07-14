import "./App.css";
import AppRoutes from "./routes/routes";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth/AuthContext";
import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" duration={5000} closeButton={false} />{" "}
      <AuthProvider>
        <Navbar />
        <AppRoutes />
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
