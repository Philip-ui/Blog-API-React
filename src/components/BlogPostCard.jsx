import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Row, Card, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 

export default function BlogPostCard({ postId }) {
   const[post, setPost] = useState([]);
   const [show, setShow] = useState(false);
   const navigate = useNavigate(); // Create a history object for navigation

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
//  Decoding to get the userId
//  const token = localStorage.getItem("authToken");
//  const decode = jwtDecode(token)
//  const userId = decode.id;
  
  const BASE_URL = "https://075588d3-6a91-4958-b560-4bf287cfade2-00-3aqtr78zcqhsa.picard.replit.dev";
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPost();
  }, [postId]);
 
  const deletePost = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${BASE_URL}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPost(null);
      handleClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-post/${postId}`); // Navigate to the edit post page
  };

  if (!post) {
    return null; // Post has been deleted or not found
  }

  return (
    <Row 
      className="p-3" 
      style={{ 
        borderTop: "1px solid #D3D3D3", 
        borderBottom: "1px solid #D3D3D3" 
      }}
    >
     <Card className="my-3">
        <Card.Header></Card.Header>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Title>{post.author}</Card.Title>
          <Card.Text>{post.description}</Card.Text>         
          
          <Button variant="secondary" onClick={handleEdit} className="ms-2">
            <i className="bi bi-pencil"></i>
          </Button>
          <Button variant="danger" onClick={handleShow} className="ms-2">
            <i className="bi bi-trash3"></i>
          </Button>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this todo?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deletePost} className="ms-2">
            <i className="bi bi-trash3"></i>
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  )
}

