import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import { useCookies  } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBlogPost() {
  const { id: postId } = useParams(); // Get the postId from the URL
  const navigate = useNavigate();
  //const { id } = useParams(); // Get the post ID from the URL
  //const [post, setPost] = useState({}); // State to store post data
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState(''); 
  const [cookies, setCookies/*, removeCookie*/] = useCookies(['jwt']);
  var token = '';

  token = cookies.jwt;
  
  useEffect(() => {
   
    // Fetch post details when the component mounts
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://075588d3-6a91-4958-b560-4bf287cfade2-00-3aqtr78zcqhsa.picard.replit.dev/posts/${postId}`);
        const postData = response.data;
        setTitle(postData.title);
        setAuthor(postData.author);
        setContent(postData.content);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();   
    if (!token) {
      console.error('User is not authenticated');
      setCookies('jwt', null);
      return;
    }
    // Send updated post data to the backend
    try {
      await axios.put(`https://075588d3-6a91-4958-b560-4bf287cfade2-00-3aqtr78zcqhsa.picard.replit.dev/posts/${postId}`, {
      title: title,
      author: author,
      content: content
    },{
      headers: {
        Authorization: token // Attach JWT token to request headers
      }
    });
    navigate("/home");     
    }
    catch (error) {console.error('Error updating post:', error);
     }
  };
  
  //Edit and Update form
  return (
    <Container >
        <Row className="d-flex">
          <Col sm={4}></Col>
            <Col className="my-3 border border-success rounded m-2 p-2 bg-success-subtle bg-gradient text-grey" sm={4}>
                <h2>Edit Post</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={title} 
                      onChange={e => setTitle(e.target.value)} 
                    />
                  </Form.Group>
                  <Form.Group controlId="author">
                    <Form.Label>Author</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={author} 
                      onChange={e => setAuthor(e.target.value)} 
                    />
                  </Form.Group>
                  <Form.Group controlId="content">
                    <Form.Label>Content</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={5} 
                      value={content} 
                      onChange={e => setContent(e.target.value)} 
                    />
                  </Form.Group>
                  <br />
                  <Button variant="secondary" type="submit">
                    Update Post
                  </Button>
                </Form>
              </Col>
              <Col sm={4}></Col> 
            </Row>
        </Container>      
  );
}


