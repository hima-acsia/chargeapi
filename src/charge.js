
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./charge.css";
const ChargeForm = () => {
  const [data, setData] = useState();
  const [status, setStatus] = useState();
  const [type, setType] = useState();
  const [limit, setLimit] = useState();
  const [offset, setOffset] = useState();
  const [station, setStation] = useState();
  const [submittedData, setSubmittedData] = useState(null);
  const account_id = "100408";
  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwYWNYR0t1X1JkcHpoN0pRaGFOY3AzNmNQYktYbTI5X2FBZV9WSkhrczdrIn0.eyJleHAiOjE3MjE4MDA4NDAsImlhdCI6MTcyMTc5NzI0MCwianRpIjoiMzkzMmVkMTctYmQ2Ny00OTExLThiYmItYjhkM2Q5YzU3ZTQ0IiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmRldmVsb3Auc3ZjLmNsdXN0ZXIubG9jYWwvcmVhbG1zL1NDSE9OIiwiYXVkIjpbInJlYWxtLW1hbmFnZW1lbnQiLCJhY2NvdW50Il0sInN1YiI6ImRkODkwNzRmLWE2ODUtNGE1ZC1iZWM5LTI2YzhiOGRlOTViZSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFkbWluX3dlYl9jaGFyZ2luZ19saXRlIiwic2Vzc2lvbl9zdGF0ZSI6IjNmZWZjYTI3LTM3MDctNGIyZi05ZTkxLWQ2MjcxMDljZTdlYiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiQ09ORklHX0FDQ0VTUyIsIlNVUEVSX0FETUlOIiwiQUNDT1VOVF9BRE1JTiIsIlNZU1RFTV9QQVlNRU5UIiwiR1VFU1QiLCJTWVNURU1fRU1BSUxfTk9USUZZIiwiU1lTVEVNX0FVRElUIiwiTk9USUZJQ0FUSU9OIiwiU1lTVEVNX1BVU0hfTk9USUZZIiwiU1lTVEVNX1VTQUdFX0FVRElUIiwiZGVmYXVsdC1yb2xlcy1TQ0hPTiIsIkNPTlRFTlRfTUFOQUdFUiIsIkJVU0lORVNTX0FETUlOIiwiQ09OVEVOVF9DVVJBVE9SIiwiUExBVEZPUk1fQURNSU4iLCJTWVNURU1fU01TX05PVElGWSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJ2aWV3LXJlYWxtIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiM2ZlZmNhMjctMzcwNy00YjJmLTllOTEtZDYyNzEwOWNlN2ViIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiS3Jpc2huYSBLYWxlc2ggQmFsYWtyaXNobmFuIiwicHJlZmVycmVkX3VzZXJuYW1lIjoia3Jpc2huYS5iYWxha3Jpc2huYW5AYWNzaWF0ZWNoLmNvbSIsImdpdmVuX25hbWUiOiJLcmlzaG5hIEthbGVzaCIsImZhbWlseV9uYW1lIjoiQmFsYWtyaXNobmFuIiwiZW1haWwiOiJrcmlzaG5hLmJhbGFrcmlzaG5hbkBhY3NpYXRlY2guY29tIn0.ktkeotxAVjh3ter_8_vGyzyxD1yempoSbB01enZ8SiN-bCpBHtm78uJA9iUXmvG3mI0DX24aK4ZI1YQtMdXBD0Smi4QMHVShnNt4DZgtJm8_WqJwWNS7mJnr_daBTQqR4Q_ZaGu23lyrQc1GqmdIlk2wMY8uqHRQtG_SFxi-k2SDx5S0_yWONjHmQguYOLaonckTGVS8eOT3UKHOrFQUYoRPTO-GDCU_cwDRWdmuZctEiEDxrLYjmjdViRDUFZIeVdvbmUyTvKPMmtVuM8gu30yVFQryxdSzDiPWvBYqMqvsFruu6PFr3Z_WMg4tPYD_xeOTcyo37efSph_S4-t4-w";
    
    const handleSubmitdata = async (event) => {
    event.preventDefault();
    try {
      axios
        .post(
          "https://onprem.digital.acsiatech.com/csmsadmin/v1/charging/customer/onboarding",
          [
            {
              status: status,
              type: type,
              limit: limit,
              offset: offset,
              station: station,
            },
          ],
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
              Accountid: account_id,
            },
          }
        )
        .then((response) => {
          console.log("POST Success:", response.data);
          setSubmittedData(response.data.data);
        });
    } catch (error) {
      console.error("POST Error:", error);
    }
  };
  const handleGetRate = async () => {
    try {
      const response = await axios
        .get("https://onprem.digital.acsiatech.com/csmsadmin/v1/charging/customer/onboarding?status=1&type=1&limit=10&offset=1&station=79", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accountid: account_id,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("GET Success:", response.data);
          setData(response.data.data);
        });
    } catch (error) {
      console.error("GET Error:", error);
    }
  };

  return (
    <div className="charge-rate-form">
      <form onSubmit={handleSubmitdata}>
        <div>
          <label htmlFor="status">status:</label>
          <input
            type="number"
            id="status"
            value={status}
            onChange={(e) => setStatus(parseInt(e.target.value))}
           
          />
        </div>
        <div>
          <label htmlFor="type">type:</label>
          <input
            type="number"
            id="type"
            value={type}
            onChange={(e) => setType(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="limit">limit:</label>
          <input
            type="number"
            id="limit"
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="offset">offset:</label>
          <input
            type="number"
            id="offset"
            value={offset}
            onChange={(e) => setOffset(parseInt(e.target.value))}
          />
         </div>
          <div>
            <label htmlFor="station">station:</label>
            <input
              id="station"
              value={station}
              onChange={(e) => setStation(parseInt(e.target.value))}
          />
            
        </div>
        <div className="submit-button">
          <button type="submit">Submit </button>
        </div>
      </form>
        <button type="submit" onClick={handleGetRate}>
         Get data
        </button>
        {console.log("subitted data-->", submittedData)}
        {submittedData && Array.isArray(submittedData)&&(
          <div className="submitted-data">
            <h2>Submitted Data:</h2>
            <p>status: {submittedData[0].status}</p>
            <p>type: {submittedData[0].type}</p>
            <p>limit: {submittedData[0].limit}</p>
            <p>offset: {submittedData[0].offset}</p>
            <p>station: {submittedData[0].station}</p>
                                  
          </div>
        )}
       <h2>User information</h2>
            <table>
                  <td>status:</td> 
                  <td>type: </td> 
                  <td>charging_station_id </td> 
                  <td>card_id: </td> 
                  <td>reservation_id: </td> 
                  <td>discount_amount:</td> 
                  <td>discount_percent:</td> 
                  <td>account_id: </td>          
            </table>
      {console.log("data--->", data)}
      <div className="display-chargedata">
      {data && Array.isArray(data)&&(
        <div className="display-data">
           <h2>Charge rate data</h2>
            {data.map((item1) => {
              return (
                <>
                  <table>
                  <td>{item1.status}</td> 
                  <td>{item1.type}</td> 
                  <td>{item1.charging_station_id}</td> 
                  <td>{item1.card_id}</td> 
                  <td>{item1.reservation_id}</td> 
                  <td>{item1.discount_amount}</td> 
                  <td>{item1.discount_percent}</td> 
                  <td>{item1.account_id}</td> 
                  
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
export default ChargeForm;
