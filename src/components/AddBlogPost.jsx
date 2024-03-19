import axios from "axios";
import { useState } from "react";
import { Button, Form, Container, Col, Row } from "react-bootstrap";
//import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
//import useLocalStorage from "use-local-storage";

export default function AddBlogPost() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  //const [authToken, setAuthToken] = useLocalStorage("authToken", "");
  const navigate = useNavigate(); 

  const handleSave = async (e) => {
    e.preventDefault();
    //Get stored JWT Token
    const token = localStorage.getItem("authToken");
    //Decode the token to fetch user id
    //const decode = jwtDecode(token);
    //const userId = decode.id // May change depending on how the server encode the token
    console.log(token);
    if (!token) {
      console.error('User is not authenticated');
      return;
    }

    //Decode the token to fetch user id
    //const decode = jwtDecode(token);
    //const userId = decode.id // May change depending on how the server encode the token

    //Prepare data to be sent
    //const data = {
     // title: "Post Title",  //Add functionality to set this properly
     // content: postContent,
     // user_id: userId, 
    //};

    //Make your API call here
    try {
      const response = await axios.post('https://075588d3-6a91-4958-b560-4bf287cfade2-00-3aqtr78zcqhsa.picard.replit.dev/posts', {
        title: title,
        author: author,
        content: content,        
      }, {
        headers: {
          Authorization: token // Set the JWT token in the request headers
        }
      });

      console.log('New blog post created:', response.data);
      // Clear the form after successful submission
      setTitle("");
      setAuthor("");
      setContent("");
      navigate("/home");
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  };
  

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