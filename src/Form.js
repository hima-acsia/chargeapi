import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

 
const PostForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitted, setSubmitted] = useState(false); // State to track form submission
 
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
          title: title,
          body: body,
          userId: 1, // Example user ID
         
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      if (response.status === 201) { // Assuming status 201 for successful creation
        console.log('Post submitted successfully:', response.data);
        // Reset form fields after successful submission
        setTitle('');
        setBody('');
        
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error state if needed
    }
  };
  

  const handleGetData = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      console.log('GET Success:', response.data);
     // setSubmitted(response.data);
      // Handle the received data here, e.g., setPosts(response.data) if you have a state for posts
    } catch (error) {
      console.error('GET Error:', error);
      // Handle error state if needed
    }
  };
  
 
  return (
    <div>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="body">Body:</label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        
      ) : (
        <p>Form submitted successfully!</p>
      )}
      <button type="submit" onClick={handleGetData}>diaplay</button>
    </div>
  );
};
 
export default PostForm;