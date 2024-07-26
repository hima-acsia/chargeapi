import React from "react";
import reducer from './reducer';
import initialState from './initialState';

import "./charge-rate-form.css";
import { postmethod, getmethod} from './post_get.js';

const ChargeRateForm = () => {

  const [state, dispatch] = React.useReducer(reducer, initialState);  
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = [{
        quantity: state.quantity,
        unit: state.unit,
        category: state.category,
      }];
      await postmethod(data);
       
    }catch (error) {console.error("POST Error:", error); }
  };

  const handleGetRate = async () => {
    try {
       const data = await getmethod();
       dispatch({ type: 'SET_DATA', data});
    } catch (error) {console.error("GET Error:", error); }
  };


  return (
    <div className="charge-rate-form">
      <div className="charge-rate">
        <form onSubmit={handleSubmit}>

          <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="text"
              id="quantity"
              value={state.quantity}
              onChange={(e) => dispatch({type: 'SET_QUANTITY', quantity: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="unit">Unit</label>
            <input
              type="number"
              id="unit"
              value={state.unit}
              onChange={(e) => dispatch({
                type: 'SET_UNIT', 
                unit: parseInt(e.target.value) 
              })}
            />
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={state.category}
              onChange={(e) => dispatch({
                type: 'SET_CATEGORY', 
                category: parseInt(e.target.value) 
              })}>
              <option value={0}>Category 0</option>
              <option value={1}>Category 1</option>
              <option value={2}>Category 2</option>
            </select>
          </div>

          <div className="submit-button">
            <button type="submit">Submit</button>
          </div>

        </form>

        <div className="display-submit">
          <button type="submit" onClick={handleGetRate}>
            Get data
          </button>
        </div>
      </div>

      {console.log("subitted data-->", state.submittedData)}

      {state.submittedData && (
        <div className="submitted-data">
          <h2>Submitted Data:</h2>
          <p>Quantity: {state.submittedData[0].quantity}</p>
          <p>Unit: {state.submittedData[0].unit}</p>
          <p>Category: {state.submittedData[0].category}</p>                  
        </div>
      )}

      {console.log("data--->", state.data)}

      {(Array.isArray(state.data) && state.data.length === 0) ? (
  <p></p>
) : (
        <div className="display-data">
          <table>
            <thead>
              <tr>
                <th>ACCOUNT ID </th>
                <th>CATEGORY</th>
                <th>CREATED BY</th>
                <th>CREATED ON</th>
                <th>ID</th>
                <th>QUANTITY</th>
                <th>UNIT</th>
                <th>UPDATED BY</th>
                <th>UPDATED ON</th>
              </tr>
            </thead>

          {state.data.map((item) => {
            return (
              <>
                <tbody>
                  <tr>
                    <td>{item.account_id}</td>
                    <td>{item.category}</td>   
                    <td>{item.created_by}</td>
                    <td>{item.created_on}</td>
                    <td>{item.id}</td>  
                    <td>{item.quantity}</td>
                    <td>{item.unit}</td>
                    <td>{item.updated_by}</td>  
                    <td>{item.updated_on}</td>
                    
                  </tr>
                </tbody>
                
              </>
            );
          })}
          </table>
        </div>
      )}
    </div>
  )};

export default ChargeRateForm;