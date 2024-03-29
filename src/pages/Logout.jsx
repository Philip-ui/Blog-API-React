import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from "use-local-storage";
import { useEffect } from "react";

export default function Logout() {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useLocalStorage("authToken", "");
  
      
  useEffect(() => {
    if (!authToken) navigate("/login");
  }, [authToken, navigate]);  
  const handleLoginClick = () => setAuthToken("");
    

  return (
    <Container>
        <h1 className="my-3">Logged Out</h1>
        <Row>
            <Col md={4}>
                <Card className='my-3'>
                    <Card.Body>                             
                    <Card.Text>You are logged out</Card.Text>      
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Button variant="primary" onClick={handleLoginClick}>Login</Button>
    </Container>
    
  )
}