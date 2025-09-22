"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";


export default function ProfilePage() {
   const router = useRouter();
   const [data, setData] = useState("nothing");
   const logout = async () => {
      try {
         await axios.get("/api/users/logout");
         toast.success("Logout successful");
         router.push("/login");

      } catch (error) {
         if(error instanceof Error) toast.error(error.message);
         console.log("Logout error occured", error);
      }

   }

   const getUserDetails = async () => {
      const response = await axios.get("/api/users/userdata");
      console.log(response.data);
      setData(response.data.data.username);

   }

   return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-y-1">
         <Toaster position="top-right" reverseOrder={false}/>
         <h1 className="text-3xl">Profile</h1>
         <hr />
         <p className="text-2xl">Profile page</p>
         <h2>{data === "nothing" ? "No data" : <Link href={`/provider/profile/${data}`}>Visit Profile</Link>}</h2>
         <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={getUserDetails}
         >Get user details</button>

         <hr />
         <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            onClick={logout}
         >Logout</button>

      </div>
   )
}