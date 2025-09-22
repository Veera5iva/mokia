"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { PasswordInput } from "@/components";

export default function LoginPage() {
   const router = useRouter();
   const [user, setUser] = useState({
      email: "",
      password: "",
   });

   const [buttonDisabled, setButtonDisabled] = useState(true);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if(user.email.trim().length > 5 && user.password.trim().length > 6) {
         setButtonDisabled(false);
      }
      else setButtonDisabled(true);
   }, [user])

   const onLogin = async () => {
      try {
         setLoading(true);
         const response = await axios.post('/api/users/login', user);

         if (response.data.success) {
            const token = response.data.token;
            localStorage.setItem("token", token);

            const role = response.data.role;
            if (role === "consumer") {
               router.push("/consumer/dashboard");
            } else if (role === "provider") {
               router.push("/provider/dashboard");
            }
            toast.success("Login successful");
         }
      } catch (error) {
         if(error instanceof Error) return toast.error(error.message);
         console.log("Login error occurred", error);
      } finally {
         setLoading(false)
      }
   };

   return (
      <div className="flex flex-col items-center justify-center py-2 min-h-screen gap-y-4 max-w-[280px] mx-auto">
         <Toaster position="top-right" reverseOrder={false}/>
         <h1 className="text-3xl text-center">{loading ? "Processing" : "Login"}</h1>
         
         <div className="w-full space-y-4">
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
               onClick={onLogin}
               disabled={buttonDisabled}
            >
               {buttonDisabled ? "Complete all fields" : "Login"}
            </button>
            
            <div className="text-center space-y-2">
               <Link href="/resetpasswordemail" className="text-blue-500 hover:underline block">
                  Forgot password?
               </Link>
               <Link href="/signup" className="text-blue-500 hover:underline block">
                  Dont have an account? Sign up
               </Link>
            </div>
         </div>
      </div>
   )
}