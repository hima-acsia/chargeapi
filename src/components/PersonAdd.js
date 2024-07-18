import React, { useState } from 'react';
 
const ChargeRateForm = () => {
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState(0); // Assuming default unit value
  const [category, setCategory] = useState(2); // Assuming default category value
  const [submittedData, setSubmittedData] = useState(null); // State to hold submitted data
 
  // Function to handle form submission (POST)
  const handleSubmit = async (event) => {
    event.preventDefault();
 
    try {
const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: quantity,
          unit: unit,
          category: category,
        }),
      });
 
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
 
      const responseData = await response.json();
      console.log('POST Success:', responseData);
 
      // Update state with submitted data for display
      setSubmittedData(responseData);
    } catch (error) {
      console.error('POST Error:', error);
    }
  };
 
  // Function to handle fetching data (GET)
  const handleGetRate = async () => {
    try {
const response = await fetch('https://jsonplaceholder.typicode.com/posts');
 
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
 
      const responseData = await response.json();
      console.log('GET Success:', responseData);
 
      // Update state with fetched data for display
      setSubmittedData(responseData);
    } catch (error) {
      console.error('GET Error:', error);
    }
  };
 
  return (
    <div className='charge-rate-form'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input type="text" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="unit">Unit:</label>
          <input type="number" id="unit" value={unit} onChange={(e) => setUnit(parseInt(e.target.value))} />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select id="category" value={category} onChange={(e) => setCategory(parseInt(e.target.value))}>
            <option value={1}>Category 1</option>
            <option value={2}>Category 2</option>
            <option value={3}>Category 3</option>
          </select>
        </div>
        <button type="submit">Submit (POST)</button>
      </form>
      
      <button onClick={handleGetRate}>Get Rate (GET)</button>
 
      {submittedData && (
        <div className='submitted-data'>
          <h2>Submitted Data:</h2>
          <p>Quantity: {submittedData.quantity}</p>
          <p>Unit: {submittedData.unit}</p>
          <p>Category: {submittedData.category}</p>
        </div>
      )}
    </div>
  );
};
 
export default ChargeRateForm;