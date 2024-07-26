import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  axios  from 'axios';


const ChargeRateForm = () => {
  const dispatch = useDispatch();
  const submittedData = useSelector((state) => state.submittedData);
  const data = useSelector((state) => state.data);

  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [category, setCategory] = useState(0);

  const account_id = "100408";
  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwYWNYR0t1X1JkcHpoN0pRaGFOY3AzNmNQYktYbTI5X2FBZV9WSkhrczdrIn0.eyJleHAiOjE3MjE4ODgyMzksImlhdCI6MTcyMTg4NDYzOSwianRpIjoiMTQ0Njc4NTUtNjcxNi00NzBmLTkyYjQtNTZkOGI4OWI5YTRiIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmRldmVsb3Auc3ZjLmNsdXN0ZXIubG9jYWwvcmVhbG1zL1NDSE9OIiwiYXVkIjpbInJlYWxtLW1hbmFnZW1lbnQiLCJhY2NvdW50Il0sInN1YiI6ImRkODkwNzRmLWE2ODUtNGE1ZC1iZWM5LTI2YzhiOGRlOTViZSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFkbWluX3dlYl9jaGFyZ2luZ19saXRlIiwic2Vzc2lvbl9zdGF0ZSI6IjA5MjY5NmZmLTdjMjAtNGEwZi1iNzNmLTUxNGJjNjkxZjk0OCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiQ09ORklHX0FDQ0VTUyIsIlNVUEVSX0FETUlOIiwiQUNDT1VOVF9BRE1JTiIsIlNZU1RFTV9QQVlNRU5UIiwiR1VFU1QiLCJTWVNURU1fRU1BSUxfTk9USUZZIiwiU1lTVEVNX0FVRElUIiwiTk9USUZJQ0FUSU9OIiwiU1lTVEVNX1BVU0hfTk9USUZZIiwiU1lTVEVNX1VTQUdFX0FVRElUIiwiZGVmYXVsdC1yb2xlcy1TQ0hPTiIsIkNPTlRFTlRfTUFOQUdFUiIsIkJVU0lORVNTX0FETUlOIiwiQ09OVEVOVF9DVVJBVE9SIiwiUExBVEZPUk1fQURNSU4iLCJTWVNURU1fU01TX05PVElGWSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJ2aWV3LXJlYWxtIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiMDkyNjk2ZmYtN2MyMC00YTBmLWI3M2YtNTE0YmM2OTFmOTQ4IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiS3Jpc2huYSBLYWxlc2ggQmFsYWtyaXNobmFuIiwicHJlZmVycmVkX3VzZXJuYW1lIjoia3Jpc2huYS5iYWxha3Jpc2huYW5AYWNzaWF0ZWNoLmNvbSIsImdpdmVuX25hbWUiOiJLcmlzaG5hIEthbGVzaCIsImZhbWlseV9uYW1lIjoiQmFsYWtyaXNobmFuIiwiZW1haWwiOiJrcmlzaG5hLmJhbGFrcmlzaG5hbkBhY3NpYXRlY2guY29tIn0.NZCi6C9Z-yZ7tRNcvKBOgRwVzbe2Cykisx6g8hLzwF8F1HaQ_zoYFTDphEXQduEJ3fLBJgcOXo5k333b5NfzOFEOZDtWbpelsvZpOY-vPpf-vwS2ry9xdNpCFDQHEcesRK3uTyGE3Xl5nRmf3HHJRzErUr14ATktm9bPcD3_GCtz6CBUITnx5AkdxRvEK780_nbMxA_zGeupeOulhZksnLkxH7BUPUjxtpGiGa2smGydef1ztC1KGjqnPa40h-nJBa_BwrQRGv8NHVBYDesKZrhAgJnnXfiVHB3-R4PeWxZwytj90O9YI0546J08pIlh-NAnVbzOeWkqJLaBMyF6mw";
    
  useEffect(() => {
    dispatch({ type: 'DATA_FETCHED', data: [] });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://onprem.digital.acsiatech.com/csmsadmin/v1/charge/rate',{headers: {
        Authorization: `Bearer ${token}`,
        Accountid: account_id,
        'Content-Type': 'application/json',
    }}, { quantity, unit, category });
      dispatch({ type: 'SUBMITTED_DATA', data: response.data });
    } catch (error) {
      console.error('POST Error:', error);
    }
  };

  const handleGetRate = async () => {
    try {
      const response = await axios.get('https://onprem.digital.acsiatech.com/csmsadmin/v1/charge/rate', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accountid: account_id,
          'Content-Type': 'application/json',
        },
      });
      dispatch({ type: 'DATA_FETCHED', data: response.data });
    } catch (error) {
      console.error('GET Error:', error);
    }
  };

  return (
    <div className="charge-rate-form">
      <div className="charge-rate">
        <form onSubmit={handleSubmit}>
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
              <option value={0}>Category 0</option>
              <option value={1}>Category 1</option>
              <option value={2}>Category 2</option>
            </select>
          </div>
          <div className="submit-button">
            <button type="submit">Submit</button>
          </div>
        </form>
        <button type="submit" onClick={handleGetRate}>
          Get data
        </button>
      </div>

      {submittedData && (
        <div className="submitted-data">
          <h2>Submitted Data:</h2>
          <p>Quantity: {submittedData.quantity}</p>
          <p>Unit: {submittedData.unit}</p>
          <p>Category: {submittedData.category}</p>
        </div>
      )}

      {data && (
        <div className="display-data">
          <h2>User information</h2>

          {data.map((item) => (
            <table key={item.id}>
              <tr>
                <td>{item.unit}</td>
                <td>{item.quantity}</td>
                <td>{item.category}</td>
              
              </tr>
            </table>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChargeRateForm;