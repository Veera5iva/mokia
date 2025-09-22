"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface UserDetails {
   username: string,
   phone: string,
   email: string,
   location: boolean
}


export default function ProfilePage() {
   const router = useRouter();
   const [userData, setUserData] = useState<UserDetails>({ username: "", phone: "", email: "", location: false });
   const logout = async () => {
      try {
         await axios.get("/api/users/logout");
         toast.success("Logout successful");
         router.push("/login");

      } catch (error) {
         if (error instanceof Error) toast.error(error.message);
         console.log("Logout error occured", error);
      }

   }
   useEffect(() => {
      getUserDetails();
   }, [])

   const getUserDetails = async () => {
      const response = await axios.get("/api/users/userdata");
      console.log(response.data);
      const { username, phone, email, location } = response.data.data;
      setUserData({
         username,
         phone,
         email,
         location: location?.coordinates?.length > 0 ? true : false
      });
   }

   return (
      <div className="min-h-screen bg-gray-50 py-12">
         <Toaster position="top-right" reverseOrder={false} />

         {/* Main Container */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="text-center mb-8">
               <h1 className="text-4xl font-bold text-gray-900">Profile</h1>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
               {/* Left Column - Basic Info */}
               <div className="bg-white rounded-xl shadow-md p-8">
                  <div className="flex items-center justify-between mb-6">
                     <h2 className="text-2xl font-semibold text-black">Personal Information</h2>
                  </div>

                  <div className="space-y-6">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                           type="text"
                           id="username"
                           className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                           value={userData.username}
                           readOnly
                        />
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                           type="email"
                           id="email"
                           className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-black"
                           value={userData.email}
                           readOnly
                        />
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                           type="text"
                           id="phone"
                           className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                           placeholder="Enter phone number"
                           value={userData.phone}
                           readOnly
                        />
                     </div>
                  </div>
               </div>

               {/* Right Column - Location & Preferences */}
               <div className="space-y-8">
                  {/* Location Card */}
                  <div className="bg-white rounded-xl shadow-md p-8">
                     <h3 className="text-2xl font-semibold mb-4 text-black">Location</h3>
                     {/* <p id="locationText" className="text-gray-500 mb-4">No location set</p> */}
                     <div className="flex gap-4">
                        {userData.location ? (
                           <button
                              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition duration-200"
                              id="updateLocation"
                              onClick={() => router.push(`/consumer/location`)}
                           >
                              Update Location
                           </button>

                        ) : (
                           <button
                              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200"
                              onClick={() => router.push(`/consumer/location`)}
                           >
                              Set Location
                           </button>
                        )}

                     </div>
                  </div>

                  {/* Preferences Card */}
                  <div className="bg-white rounded-xl shadow-md p-8">
                     <h3 className="text-2xl font-semibold mb-4 text-black">Preferences</h3>
                     <label className="flex items-center space-x-3 text-gray-700">
                        <input
                           type="checkbox"
                           id="notifications"
                           className="w-5 h-5 rounded text-blue-500 focus:ring-blue-500 border-gray-300"
                           readOnly
                        />
                        <span>Enable Notifications</span>
                     </label>
                  </div>
               </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
               <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition duration-200">
                  Save Changes
               </button>
               <button
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition duration-200"
                  onClick={logout}
                  >Logout
               </button>
            </div>
         </div>
      </div>
   );
}