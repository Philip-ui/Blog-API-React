import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import BlogPosts from "../components/BlogPosts";

export default function HomePage() {
  const [authToken, setAuthToken] = useLocalStorage("authToken", ""); 
  const navigate = useNavigate();
  console.log(authToken);
  useEffect(() => {
    if (!authToken) navigate("/login");
  }, [authToken, navigate]);  
  const handleLogout = () => setAuthToken("");

  return (
    <>
      <Container>
        <Row>          
          <BlogPosts handleLogout={handleLogout}/>
        </Row>
      </Container>
    </>
  );
}

