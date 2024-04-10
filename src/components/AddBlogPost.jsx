import axios from "axios";
import { useState } from "react";
import { Button, Form, Container, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCookies  } from "react-cookie";

export default function AddBlogPost() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [cookies, setCookie] = useCookies(['jwt']);

  var token = '';
  const navigate = useNavigate();

  // Saving blog post to back end database
  const handleSave = async (e) => {
    e.preventDefault();    
    token = cookies.jwt;
       
    if (!token) {
      console.error('User is not authenticated');
      setCookie('jwt', null);
      return;
    }

    //Make your API call here and inserting new post
    try {
      const response = await axios.post('https://075588d3-6a91-4958-b560-4bf287cfade2-00-3aqtr78zcqhsa.picard.replit.dev/posts', {
        title: title,
        author: author,
        content: content,        
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token // Set the JWT token in the request headers
        }
      });
      console.log("token", token);
      console.log('New blog post created:', response.data);
      
      // Clear the form after successful submission and route to home page
      setTitle("");
      setAuthor("");
      setContent("");
      navigate("/home");
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  };
  
  // Adding blog post form
  return (
    <>
    <Container>
     <Row className="d-flex">
      <Col sm={3}></Col> 
      <Col className="my-3 border border-primary rounded m-2 p-2 bg-primary-subtle bg-gradient text-grey" sm={6}>
        <h1 className="my-3 ">Add Blog Post</h1>
          <Form onSubmit={handleSave}>
              <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
                <Form.Control 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Type Title"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="author">
              <Form.Label>Author</Form.Label>
              <Form.Control
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                type="text"
                placeholder="Type Author"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                value={content}
                onChange={(e) => setContent(e.target.value)}
                as="textarea"
                rows={3}
                placeholder="Contents"
                required
              />
            </Form.Group>
            <Button
            variant="primary"
            className="rounded-pill"
            type="submit"
            >
            Submit
          </Button>
          </Form>
        </Col>
        <Col sm={3}></Col> 
      </Row>      
    </Container> 
    </>
  )

}