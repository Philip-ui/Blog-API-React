import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AddBlogPost from "./components/AddBlogPost";
import EditBlogPost from "./components/EditBlogPost";
import Logout from "./pages/Logout";
import { useCookies } from 'react-cookie'; // Import Cookies
import axios from 'axios'; // Import axios

export default function App() {
  
  const [cookies] = useCookies(['jwt']);
  const token = cookies.jwt; // Retrieve JWT token from cookies
  
  if (token) {
    // Set the default Authorization header for axios requests    
    axios.defaults.headers.common['Authorization'] = token;
  }
  return (
 
    <BrowserRouter>      
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/add" element={<AddBlogPost />} />
          <Route path="/edit-post/:id" element={<EditBlogPost />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<AuthPage />} />
        </Routes>      
    </BrowserRouter>
 
  );
}


