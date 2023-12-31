import React from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios';

const EditBlog = () => {
  const location = useLocation();
  const blog = location.state;
  const storedData = localStorage.getItem('userdata')
  const userdata = storedData ? JSON.parse(storedData) : {};
  const token = userdata.token
  const navigate = useNavigate();

  // State for title and body
  const [title, setTitle] = useState(blog ? blog.title : '');
  const [body, setBody] = useState(blog ? blog.body : '');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };
 
  const handleDeleteOnClick = async(e) =>
  {
    e.preventDefault();
    try {

      await axios.delete(`http://localhost:3000/api/home/blogs/${blog._id}`, { headers: {
        'Authorization': `Bearer ${token}`
    }});
     
      alert("Blog deleted")

      navigate(-1)
    
    } catch (error) {
      alert("Error Updating Blog")
      
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const updatedBlog = {
      email: blog.email,
      title: title,
      body: body,
    };

    try {

      await axios.patch(`http://localhost:3000/api/home/blogs/${blog._id}`, updatedBlog, { headers: {
        'Authorization': `Bearer ${token}`
    }});
 

      alert("Blog updated")
      navigate(-1)
    } catch (error) {
      alert("Error Updating Blog")
      
    }
   
  };
  
   return (
    <div className="container-fluid bg-dark min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card text-white bg-secondary mb-3" style={{ width: '100vh', height: '100vh' }}>
        <div className="card-body p-4 align-items-center" >
      
            <br />

          <h3 className="card-title text-center mb-4">Blog</h3>
          {blog && (
            <div className="text-white mb-3">
              <strong>Written by:</strong> {blog.email}
            </div>
          )}
          {blog && (
            <div className="text-white mb-3">
              <strong>Posted on:</strong> {new Date(blog.createdAt).toLocaleDateString()}
            </div>
          )}
         <div className="text-center">
  <button className="btn btn-link text-decoration-none">
    <FontAwesomeIcon icon={faHeart} className="text-danger" />
  </button>
  <p>{blog.likes.length} Likes</p>

 
</div>
<div className="text-center">
    <button className="btn btn-link text-decoration-none" onClick={handleDeleteOnClick}>
     <FontAwesomeIcon icon={faTrash } className="text-danger" />
     <p className="text-white"> {"Delete Blog"}</p>

  </button>
  </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="blogTitle" className="form-label">Blog Title</label>
              <input type="text" className="form-control" id="blogTitle" placeholder="Enter title"  value={title} onChange={handleTitleChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="blogBody" className="form-label">Blog Body</label>
              <textarea className="form-control" id="blogBody" rows="6" placeholder="Write your blog here..." value={body} onChange={handleBodyChange}></textarea>
            </div>    
           
            <br />
            <br />
            
            <div className="text-center">
              <button type="submit" className="btn btn-primary" style ={{ width: '40%'}}>Update Blog</button>
            </div>

          </form>
        </div>
      
      </div>
    </div>
  );
};

export default EditBlog;
