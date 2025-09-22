import axios from "axios";
import { headers } from "next/headers";
import  Dashboard from "./Dashboard";
/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function ConsumerDashboardPage() {
   try {
      const headerList = await headers();
      const cookie = headerList.get('cookie');

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/userdata`, {
         headers: {
            cookie: cookie || ""
         }
      })
      
      const consumerId = response.data.data._id;
      const notifications = 2;
      return (
         <Dashboard
            consumerId={consumerId}
            notifications={notifications}
            />
      )
      
   } catch (error: any) {
      console.log(error);
      <div>Error occured {error.message}</div>
   }
}