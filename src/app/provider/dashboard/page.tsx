/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import Dashboard from './Dashboard';
import { headers } from 'next/headers'; // Import headers utility

export default async function ProviderDashboardPage() {
   try {
      // Access cookies from the request headers
      const headersList = await headers();
      const cookies = headersList.get('cookie'); // Get the 'cookie' header

      const providerResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/userdata`, {
         headers: {
            Cookie: cookies || "", 
         },
      });
      const providerId = providerResponse.data.data._id;
      
      const announcedServiceResponse = await axios.get(
         `${process.env.NEXT_PUBLIC_API_URL}/api/users/provider/services/getAnnouncedService`,
         {
            params: { providerId },
         }
      );

      const announcedService = announcedServiceResponse.data.data
         ? {
            serviceType: announcedServiceResponse.data.data.serviceType,
            description: announcedServiceResponse.data.data.description,
            startTime: announcedServiceResponse.data.data.startTime,
            endTime: announcedServiceResponse.data.data.endTime,
         }
         : null; // Set to null if no service exists;

      const notifications =  0;

      return (
         <Dashboard
            providerId={providerId}
            initialService={announcedService}
            notifications={notifications}
         />
      );
   } catch (error: any) {
      console.log("Failed to fetch data:", error.message);
      console.log("Full Error:", error);
      return <Dashboard providerId="" initialService={null} error={error.message} />;
   }
}
