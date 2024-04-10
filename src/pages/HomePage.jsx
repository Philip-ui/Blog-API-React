import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BlogPosts from "../components/BlogPosts";
import { useCookies } from "react-cookie";

export default function HomePage() {
  const [cookies, setCookie] = useCookies(['jwt']);  
  const authToken = cookies.jwt; // Retrieve JWT token from cookies
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) navigate("/login");
  }, [authToken, navigate]);

  const handleLogout  =  () => {
    if (cookies.jwt) {
      // set the JWT cookie to null
      setCookie('jwt', null);
    }   
    navigate("/login");
  };
  // Display Home page route to BlogPosts
  return (
    <Container>
      <Row>          
        <BlogPosts handleLogout={handleLogout}/>
      </Row>
    </Container>
  );
}


