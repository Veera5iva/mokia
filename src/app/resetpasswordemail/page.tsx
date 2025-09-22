/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react"
import axios from "axios"
import toast, {Toaster} from "react-hot-toast"
// import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
   const [emailSent, setEmailSent] = useState(false);
   const [user, setUser] = useState({
      email: ""
   })
   const forgotPassword = async () => {
      try {
         console.log("here coming");
         const response = await axios.post("/api/users/resetpasswordemail", user)
         console.log("response", response);
         setUser({ email: "" });
         setEmailSent(true);
         
      } catch (error: any) {
         toast.error(error.message);
         console.log(error);
         
      }
   }
   
   return (
      <div className="flex flex-col justify-center items-center min-h-screen">
         <Toaster position="top-right" reverseOrder={false} />
         <label className="text-2xl" htmlFor="email">Email</label>
         <div className="flex flex-row gap-2">
            <input
               type="text"
               className="p-2 text-black"
               placeholder="email"
               value={user.email}
               onChange={(e) => setUser({ email: e.target.value })}

            />
            <button
               className="bg-green-500 rounded-sm p-2 text-black"
               onClick={forgotPassword}
            >Continue</button>
         </div>
         {emailSent && <h1 className="text-lg mt-2">Email sent. Check your inbox</h1>}
      </div>
   )
}