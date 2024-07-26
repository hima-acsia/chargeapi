
import axios from 'axios';

const account_id = "100408";                                           
const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwYWNYR0t1X1JkcHpoN0pRaGFOY3AzNmNQYktYbTI5X2FBZV9WSkhrczdrIn0.eyJleHAiOjE3MjE5MDA2MjEsImlhdCI6MTcyMTg5NzAyMSwianRpIjoiMTc5MjU3NmQtZmY3NC00OTBkLTlkNTItNTM5NDI5MjJhNzI2IiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmRldmVsb3Auc3ZjLmNsdXN0ZXIubG9jYWwvcmVhbG1zL1NDSE9OIiwiYXVkIjpbInJlYWxtLW1hbmFnZW1lbnQiLCJhY2NvdW50Il0sInN1YiI6ImRkODkwNzRmLWE2ODUtNGE1ZC1iZWM5LTI2YzhiOGRlOTViZSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFkbWluX3dlYl9jaGFyZ2luZ19saXRlIiwic2Vzc2lvbl9zdGF0ZSI6IjdhMjhmYjdmLTVkZWItNDM4OC04MTJlLTE4YmYxYzFkN2MzOSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiQ09ORklHX0FDQ0VTUyIsIlNVUEVSX0FETUlOIiwiQUNDT1VOVF9BRE1JTiIsIlNZU1RFTV9QQVlNRU5UIiwiR1VFU1QiLCJTWVNURU1fRU1BSUxfTk9USUZZIiwiU1lTVEVNX0FVRElUIiwiTk9USUZJQ0FUSU9OIiwiU1lTVEVNX1BVU0hfTk9USUZZIiwiU1lTVEVNX1VTQUdFX0FVRElUIiwiZGVmYXVsdC1yb2xlcy1TQ0hPTiIsIkNPTlRFTlRfTUFOQUdFUiIsIkJVU0lORVNTX0FETUlOIiwiQ09OVEVOVF9DVVJBVE9SIiwiUExBVEZPUk1fQURNSU4iLCJTWVNURU1fU01TX05PVElGWSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJ2aWV3LXJlYWxtIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiN2EyOGZiN2YtNWRlYi00Mzg4LTgxMmUtMThiZjFjMWQ3YzM5IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiS3Jpc2huYSBLYWxlc2ggQmFsYWtyaXNobmFuIiwicHJlZmVycmVkX3VzZXJuYW1lIjoia3Jpc2huYS5iYWxha3Jpc2huYW5AYWNzaWF0ZWNoLmNvbSIsImdpdmVuX25hbWUiOiJLcmlzaG5hIEthbGVzaCIsImZhbWlseV9uYW1lIjoiQmFsYWtyaXNobmFuIiwiZW1haWwiOiJrcmlzaG5hLmJhbGFrcmlzaG5hbkBhY3NpYXRlY2guY29tIn0.aDT4hGnHH3zZqBNzhdo5SLW8Rag3PsPWQX5YmQvMQ5sJt6cEz4QJ_m0vI-KK1oAvLbztzCjOhhbpsMdsdRGq5ZEcYOnkYpfkQdWBTPpzzj-DSJxV_bp7m5DTp9wSqqzxLOyPxNjkjGHwGuVnoNFUNubnJcZ3CMAxG0NZBRpeC1T0hmj2x6WQDy0yi2XqTwUD1kjwgHMB3GNMdbbWXACM2JwkiYdkLgPvwVWEev8xobN9wAwUgPz5vjqhClE6Qbbi90VSHfi2-3ODMsJaCqgCneOEXy3gSuRbQ7WIPIfUVDLRPVvKZjWvJkE2t_QkSu6iX2B7caXkaQVRyQOC-5eqKQ";
const url = "https://onprem.digital.acsiatech.com/csmsadmin/v1/charge/rate";


const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    Accountid: account_id,
};

export const postmethod = async (data) =>{
   try {
       const response =  await axios.post(url, data, {headers});
       return response.data;       
       } catch (error) {console.error("POST Error:", error); 
        throw error;
      }
};

   
export const getmethod = async()=>
    {
        try {
            const response =  await axios.get(url, {headers});
            return response.data.data;       
            } catch (error) {console.error("POST Error:", error); 
            throw error;
           }
      };
  
 