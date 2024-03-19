import {jwtDecode}  from "jwt-decode";
import { useEffect, useState } from "react";
import { Button, Col, Image, Nav, Row, } from "react-bootstrap";
//import { useDispatch, useSelector } from "react-redux";
import BlogPostCard from "./BlogPostCard";
//import AddBlogPost from "./AddBlogPost";
//import { fetchPostsByUser } from "../features/posts/postsSlice";

export default function BlogPosts({handleLogout}) {
  const [posts, setPosts] = useState([]);
 
  const url = "https://foodseekerdude.com/images/gallery/australia/perth/perth-08.jpg";
  const pic = "https://foodseekerdude.com/images/logo.jpg";

  //const dispatch = useDispatch();
  //const posts = useSelector((state) => state.posts.posts);
  //const loading = useSelector((state) => state.posts.loading); 

  //Fetch posts based on post id
  const fetchPosts = () => {
    fetch(`https://075588d3-6a91-4958-b560-4bf287cfade2-00-3aqtr78zcqhsa.picard.replit.dev/posts`)
    .then((response) => response.json())
    .then((data) => setPosts(data))
    .catch((error) => console.error("Error:", error));
  }

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      fetchPosts(userId);
    }
  }, []);


  return (
    <Col sm={6} className="bg-light" style={{ border: "1px solid lightgrey" }}>
      <Nav variant="underline" defaultActiveKey="/home" justify>
        <Nav.Item>
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/add">Add Post</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/logout">Logout</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3"></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-4"></Nav.Link>
        </Nav.Item>
      </Nav>
      <Image src={url} fluid />
      <br />
      <Image 
        src={pic}
        roundedCircle
        style={{
          width: 150,
          position: "absolute",
          top: "140px",
          border: "4px solid #F8F9FA",
          marginLeft: 15,
        }}
      />

      <Row className="justify-content-end">
        <Col xs="auto">
          <Button className="rounded-pill mt-2" variant="outline-secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>

      <p className="mt-5" style={{ margin: 0, fontWeight: "bold", fontSize: "15px" }}>
        Haris
      </p>

      <p style={{ marginBottom: "2px"}}>@haris.samingan</p>

      <p>I help people switch careers to be a software developer at sigmaschool.co</p>

      <p>Entrepreneur</p>

      <p>
        <strong>271</strong> Following <strong>610</strong> Followers
      </p>

      
      
      {posts.length > 0 && posts.map((post) => (
        <BlogPostCard 
          key={post.id} 
          title={post.title}
          author={post.author}
          content={post.content} 
          postId={post.id}
         />
      ))}
    </Col>
  )
}