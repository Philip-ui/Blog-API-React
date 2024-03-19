import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AddBlogPost from "./components/AddBlogPost";
import EditPost from "./components/EditPost";
import Logout from "./pages/Logout";


 export default function App() {
  return (
 
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/add" element={<AddBlogPost />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
 
  );
}

