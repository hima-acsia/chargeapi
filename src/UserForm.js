
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserForm.css";

const ChargeRateForm = () => {

  const [quantity, setQuantity] = useState();
  const [unit, setUnit] = useState();
  const [category, setCategory] = useState(0); 

  const [submittedData, setSubmittedData] = useState(null); // post/submit data
  const [data, setData] = useState();  // get/display data

  const account_id = "100408";
  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJTeTBRVU1jSGpsOFhsbVlDV09PLWpQbG9FOGhMRm1tZUE2Ykt2dlU1WWZBIn0.eyJleHAiOjE3MjE3MzQyMzcsImlhdCI6MTcyMTczMDYzNywianRpIjoiODZiZjc2ODUtZjFjNi00ODMzLTk3MzktZjBkMGIxYTQ0Mzc1IiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmRldmVsb3Auc3ZjLmNsdXN0ZXIubG9jYWwvcmVhbG1zL0NBU0lPIiwiYXVkIjpbInJlYWxtLW1hbmFnZW1lbnQiLCJhY2NvdW50Il0sInN1YiI6Ijk0NjJkMDJiLTBjOTgtNDE1OS05MTQ2LTI0Yjc0NzY2NGE3ZSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFkbWluX3dlYl9jaGFyZ2luZ19saXRlIiwic2Vzc2lvbl9zdGF0ZSI6ImZmYmQxMWM1LWM5ZTYtNGQzZi05ZDMxLTRiZTYzNTU0ZWMwOSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiQ09ORklHX0FDQ0VTUyIsIlNVUEVSX0FETUlOIiwiQUNDT1VOVF9BRE1JTiIsIlNZU1RFTV9QQVlNRU5UIiwiR1VFU1QiLCJTWVNURU1fRU1BSUxfTk9USUZZIiwiU1lTVEVNX0FVRElUIiwiTk9USUZJQ0FUSU9OIiwiZGVmYXVsdC1yb2xlcy1DQVNJTyIsIlNZU1RFTV9VU0FHRV9BVURJVCIsIlNZU1RFTV9QVVNIX05PVElGWSIsIkNPTlRFTlRfTUFOQUdFUiIsIkJVU0lORVNTX0FETUlOIiwiQ09OVEVOVF9DVVJBVE9SIiwiUExBVEZPUk1fQURNSU4iLCJTWVNURU1fU01TX05PVElGWSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsidmlldy1yZWFsbSIsInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiZmZiZDExYzUtYzllNi00ZDNmLTlkMzEtNGJlNjM1NTRlYzA5IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiS3Jpc2huYSBLYWxlc2ggQmFsYWtyaXNobmFuIiwicHJlZmVycmVkX3VzZXJuYW1lIjoia3Jpc2huYS5iYWxha3Jpc2huYW5AYWNzaWF0ZWNoLmNvbSIsImdpdmVuX25hbWUiOiJLcmlzaG5hIEthbGVzaCIsImZhbWlseV9uYW1lIjoiQmFsYWtyaXNobmFuIiwiZW1haWwiOiJrcmlzaG5hLmJhbGFrcmlzaG5hbkBhY3NpYXRlY2guY29tIn0.GlBpCZmQo0DlSyANuHxy4XNfXPM363VRgrE_3bpf0ljn1pczjodfgUpkZaN75aCElxYxZVxcGXiWttRsZTainnflU_Pk7DRrncZPl7boQvxrZA4bGef4d5wmlzbgmkcDE5dGvYeAlKzib9fanYHf2tlzdsmoUizBrr5W02ujF5Kqfy3qADY1jVmslKD7syBcYJaONSOF3r7AaW51yGssXguWZ9M4rL20Bs7OTi50nnQRdThdk8jgXp0hcCvwvIK2nSjl6wwmSBagg6ST2kUUAjP2WfPSN83thzdE1BBwifHyH1IZHmQ_xnnjFhbTX4BHmEPX96pVemdLWshFMGPanQ";
    
    // update token

    const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      axios
        .post(
          "https://onprem.digital.acsiatech.com/csmsadmin/v1/charge/rate",
          [                                                                 
            {                                             //assign input values
              quantity: quantity,
              unit: unit,
              category: category,
            },
          ],
          {
            headers: {                                     //pass credentials to header
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              Accountid: account_id,
            },
          }
        )
        .then((response) => {
          console.log("POST Success:", response.data);         //display status on console
          setSubmittedData(response.data.data);                //pass post values to data
        });
        
    } catch (error) {
      console.error("POST Error:", error);                      //display error
    }
  };

  const handleGetRate = async () => {
    try {
      const response = await axios
        .get("https://onprem.digital.acsiatech.com/csmsadmin/v1/charge/rate", {
          headers: {                                           //pass credentials to header
            Authorization: `Bearer ${token}`,
            Accountid: account_id,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("GET Success:", response.data);            //display status on console
          setData(response.data.data);                           //pass get values to data
        });
    } catch (error) {
      console.error("GET Error:", error);                        //display error
    }
  };
  
  return (
    <div className="charge-rate-form">
      <div className="charge-rate">
      <form onSubmit={handleSubmit}>                            {/* form submit handle */}
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="text"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}  
          />
        </div>
        <div>
          <label htmlFor="unit">Unit:</label>
          <input
            type="number"
            id="unit"
            value={unit}
            onChange={(e) => setUnit(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(parseInt(e.target.value))}
          >
            <option value={0}>Category 0 </option>
            <option value={1}>Category 1 </option>
            <option value={2}>Category 2 </option>
          </select>
        </div>
        <div className="submit-button">
          <button type="submit">Submit </button>
        </div>
      </form>
      <button type="submit" onClick={handleGetRate}>
        Get data
      </button>
      </div>
      {console.log("subitted data-->", submittedData)}
      {submittedData && (                                        //display submitted data
        <div className="submitted-data">
          <h2>Submitted Data:</h2>
          <p>Quantity: {submittedData[0].quantity}</p>
          <p>Unit: {submittedData[0].unit}</p>
          <p>Category: {submittedData[0].category}</p>
                    <td>{submittedData[0].unit}</td>      
                    <td>{submittedData[0].quantity}</td>     
                    <td>{submittedData[0].category}</td>     
                    <td>{submittedData[0].account_id}</td>     
                    <td>{submittedData[0].created_by}</td>
                    <td>{submittedData[0].created_on}</td>
                    <td>{submittedData[0].updated_on}</td>
                    <td>{submittedData[0].account_id}</td>
        </div>
      )}
      {console.log("data--->", data)}
      <div className="display-chargedata">
        
      {data&& Array.isArray(data)&&(                        //display all data
        <div className="display-data">
          <h2>User information</h2>
      
          {data.map((item) => {                             //maping data to item
            return (
              <>
                <table>
                  <tr>
                    <td>{item.unit}</td>      
                    <td>{item.quantity}</td>     
                    <td>{item.category}</td>     
                    <td>{item.account_id}</td>     
                    <td>{item.created_by}</td>
                    <td>{item.created_on}</td>
                    <td>{item.updated_on}</td>
                    <td>{item.account_id}</td>
                    </tr>
                </table>
              </>
            );
          })}
        </div>
      )}
      </div>
    </div>
    
  );
};
export default ChargeRateForm;                               //exporting the form
