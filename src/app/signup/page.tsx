"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import PasswordInput from "@/components/PasswordInput"; 

export default function SignupPage() {
   const router = useRouter();

   const [user, setUser] = useState({
      username: "",
      email: "",
      phone: "",
      role: "",
      password: "",
   });
   const [buttonDisabled, setButtonDisabled] = useState(true);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if(
         user.username.trim().length > 0 && 
         user.email.trim().length > 0 && 
         user.password.trim().length > 6
      ) {
         setButtonDisabled(false);
      }
      else setButtonDisabled(true);
   }, [user])

   const onSignup = async () => {
      if(!user.role) {
         toast.error("Please select a role");
         return;
      }
      try {
         setLoading(true);
         console.log(user);
         const response = await axios.post("/api/users/signup", user)
         console.log("User signed up successfully", response.data);
         toast.success("Signup Successful!");
         router.push("/login")
         
      } catch (error : unknown) {
         console.log("Signup failed", error);
         
         if (error instanceof Error ) toast.error(error.message);
         
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="flex flex-col items-center justify-center py-2 min-h-screen gap-y-4 max-w-[330px] mx-auto">
         <Toaster position="top-right" reverseOrder={false}/>
         <h1 className="text-3xl text-center">{loading ? "Processing" : "Signup"}</h1>
         
         <div className="w-full space-y-4">
            <div>
               <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
               <input
                  className="w-full p-2 rounded-md text-black"
                  type="text"
                  id="username"
                  value={user.username}
                  onChange={(e) => setUser({...user, username: e.target.value})}
                  placeholder="Enter your username"
               />
            </div>
            
            <div>
               <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
               <input
                  className="w-full p-2 rounded-md text-black"
                  type="email"
                  id="email"
                  value={user.email}
                  onChange={(e) => setUser({...user, email: e.target.value})}
                  placeholder="Enter your email"
               />
            </div>

            <div>
               <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
               <input
                  className="w-full p-2 rounded-md text-black"
                  type="phone"
                  id="phone"
                  value={user.phone}
                  onChange={(e) => setUser({...user, phone: e.target.value})}
                  placeholder="Enter your phone number"
               />
            </div>

            <div className="w-full ">
               <label htmlFor="role" className="block text-sm font-medium mb-1">Role</label>
               <select
                  className="w-full p-2 rounded-md text-black"
                  name="role"
                  id="role"
                  value={user.role}
                  onChange={(e) => setUser({ ...user, role: e.target.value })}
               >
                  <option value="" disabled>
                     Select Role
                  </option>
                  <option value="consumer">Consumer</option>
                  <option value="provider">Provider</option>
               </select>
            </div>
            
            <div>
               <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
               <PasswordInput
                  password={user.password}
                  onPasswordChange={(password) => {
                     setUser({ ...user, password });
                  }}
               />
            </div>
            
            <button
               className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
               onClick={onSignup}
               disabled={buttonDisabled}
            >
               {buttonDisabled ? "Complete all fields" : "Signup"}
            </button>
            
            <div className="text-center">
               <Link href="/login" className="text-blue-500 hover:underline">
                  Already have an account? Go to login
               </Link>
            </div>
         </div>
      </div>
   )
}