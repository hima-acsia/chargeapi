import React, { useState } from "react";
import axios from "axios";
import "./UserForm.css";
const ChargeRateForm = () => {
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState(0);
  const [category, setCategory] = useState(2);
  const [submittedData, setSubmittedData] = useState(null);
  const account_id = "100408";
  const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwYWNYR0t1X1JkcHpoN0pRaGFOY3AzNmNQYktYbTI5X2FBZV9WSkhrczdrIn0.eyJleHAiOjE3MjEyOTk4MDMsImlhdCI6MTcyMTI5NjIwMywianRpIjoiYTY5YWQ0YjQtNzA0My00OTlhLWJjY2QtZTViZTU3ZmFlZjBjIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmRldmVsb3Auc3ZjLmNsdXN0ZXIubG9jYWwvcmVhbG1zL1NDSE9OIiwiYXVkIjpbInJlYWxtLW1hbmFnZW1lbnQiLCJhY2NvdW50Il0sInN1YiI6IjMyOWJhNjE5LTczMzMtNGRhOC04YmIwLTQ5Yjg2YjhiZWQ4NyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFkbWluX3dlYl9jaGFyZ2luZ19saXRlIiwic2Vzc2lvbl9zdGF0ZSI6ImFkZDdkYWM1LWE1NzYtNDhmMS04ZjQ3LTI0OGJjYjU2NjhmYiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiQ09ORklHX0FDQ0VTUyIsIk5PVElGSUNBVElPTiIsIk9QRVJBVE9SIiwiU1lTVEVNX1BVU0hfTk9USUZZIiwiU1lTVEVNX1VTQUdFX0FVRElUIiwiZGVmYXVsdC1yb2xlcy1TQ0hPTiIsIlNZU1RFTV9QQVlNRU5UIiwiR1VFU1QiLCJTWVNURU1fRU1BSUxfTk9USUZZIiwiU1lTVEVNX0FVRElUIiwiU1lTVEVNX1NNU19OT1RJRlkiXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwidmlldy1yZWFsbSIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwicmVhbG0tYWRtaW4iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsInNpZCI6ImFkZDdkYWM1LWE1NzYtNDhmMS04ZjQ3LTI0OGJjYjU2NjhmYiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkVsc2EgU3RhbmV5IiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZWxzYS5zdGFuZXlAYWNzaWF0ZWNoLmNvbSIsImdpdmVuX25hbWUiOiJFbHNhIiwiZmFtaWx5X25hbWUiOiJTdGFuZXkiLCJlbWFpbCI6ImVsc2Euc3RhbmV5QGFjc2lhdGVjaC5jb20ifQ.a6DIExyfPIocq7skevNVXt50w9wkfaE3O-wqoDrMicN3YQ0BeFf5QJ_EQuPAuV7XArSUrQcCrlmaC5rmwFFiMfWCCrmGqoOIgePZjhT5bCGEaqzg61ag-o29g4KmYeRMY3kazvHK-lnUzC853aQkOZZT4_u8iBRBREInVvGikZoj3f9-XCYs8tT01QPz7PzILnD5_rI_24geyap_PGD61eyDFzCC4Ppp5A2e6sJXE4bYJExr2g3X3D5rntLH7iaHj9vgoTrVF8ljh6FT9xmmTBHxJS9iZZU4F0jDNuK9kXusCcihLnrcsmLq9QMLN3gbbuP73SfgtAQuB4qrb1akHQ";
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      axios
        .post(
          "https://onprem.digital.acsiatech.com/csmsadmin/v1/charge/rate",
          {
            quantity: quantity,
            unit: unit,
            category: category,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              Accountid: account_id,
            },
          }
        )
        .then((result) => {
          alert("Success");
        });
      console.log('POST Success:', response.data);

      setSubmittedData(response.data);
    } catch (error) {
      console.error("POST Error:", error);
    }
  };

  const handleGetRate = () => {
    const response = axios.get(
      "https://onprem.digital.acsiatech.com/csmsadmin/v1/charge/rate",
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwYWNYR0t1X1JkcHpoN0pRaGFOY3AzNmNQYktYbTI5X2FBZV9WSkhrczdrIn0.eyJleHAiOjE3MjEyOTk4MDMsImlhdCI6MTcyMTI5NjIwMywianRpIjoiYTY5YWQ0YjQtNzA0My00OTlhLWJjY2QtZTViZTU3ZmFlZjBjIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmRldmVsb3Auc3ZjLmNsdXN0ZXIubG9jYWwvcmVhbG1zL1NDSE9OIiwiYXVkIjpbInJlYWxtLW1hbmFnZW1lbnQiLCJhY2NvdW50Il0sInN1YiI6IjMyOWJhNjE5LTczMzMtNGRhOC04YmIwLTQ5Yjg2YjhiZWQ4NyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFkbWluX3dlYl9jaGFyZ2luZ19saXRlIiwic2Vzc2lvbl9zdGF0ZSI6ImFkZDdkYWM1LWE1NzYtNDhmMS04ZjQ3LTI0OGJjYjU2NjhmYiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiQ09ORklHX0FDQ0VTUyIsIk5PVElGSUNBVElPTiIsIk9QRVJBVE9SIiwiU1lTVEVNX1BVU0hfTk9USUZZIiwiU1lTVEVNX1VTQUdFX0FVRElUIiwiZGVmYXVsdC1yb2xlcy1TQ0hPTiIsIlNZU1RFTV9QQVlNRU5UIiwiR1VFU1QiLCJTWVNURU1fRU1BSUxfTk9USUZZIiwiU1lTVEVNX0FVRElUIiwiU1lTVEVNX1NNU19OT1RJRlkiXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwidmlldy1yZWFsbSIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwicmVhbG0tYWRtaW4iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsInNpZCI6ImFkZDdkYWM1LWE1NzYtNDhmMS04ZjQ3LTI0OGJjYjU2NjhmYiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkVsc2EgU3RhbmV5IiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZWxzYS5zdGFuZXlAYWNzaWF0ZWNoLmNvbSIsImdpdmVuX25hbWUiOiJFbHNhIiwiZmFtaWx5X25hbWUiOiJTdGFuZXkiLCJlbWFpbCI6ImVsc2Euc3RhbmV5QGFjc2lhdGVjaC5jb20ifQ.a6DIExyfPIocq7skevNVXt50w9wkfaE3O-wqoDrMicN3YQ0BeFf5QJ_EQuPAuV7XArSUrQcCrlmaC5rmwFFiMfWCCrmGqoOIgePZjhT5bCGEaqzg61ag-o29g4KmYeRMY3kazvHK-lnUzC853aQkOZZT4_u8iBRBREInVvGikZoj3f9-XCYs8tT01QPz7PzILnD5_rI_24geyap_PGD61eyDFzCC4Ppp5A2e6sJXE4bYJExr2g3X3D5rntLH7iaHj9vgoTrVF8ljh6FT9xmmTBHxJS9iZZU4F0jDNuK9kXusCcihLnrcsmLq9QMLN3gbbuP73SfgtAQuB4qrb1akHQ`,
          Accountid: 100408,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("GET Success:", response.data);

    setSubmittedData(response.data);
  };
  return (
    <div className="charge-rate-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="text"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
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
          <button type="submit">Submit </button>
        </div>
      </form>
      <button type="submit" onClick={handleGetRate}>
        Get data
      </button>
      {submittedData && (
        <div className="submitted-data">
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
