/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"

export default function ForgotPasswordPage() {
   const [password, setPassword] = useState("")
   const [confirmPassword, setConfirmPassword] = useState("")
   const [token, setToken] = useState("")
   const [reset, setReset] = useState(false)

   const resetPassword = useCallback(async () => {
      if(password !== confirmPassword) return toast.error("password doesn't match");
      try {
         await axios.post("/api/users/forgotpassword", {
            token,
            password
         })
         setReset(true)
         toast.success("Password reset successful");
         
      } catch (error: any) {
         toast.error(error.message)
         console.log(error);
         
      }

   }, [confirmPassword, password, token])

   useEffect(() => {
      const urlToken = window.location.search.split("=")[1];
      setToken(urlToken || "");
   }, [])



   return (
      <div className="flex flex-col justify-center items-center min-h-screen">
         <Toaster position="top-right" reverseOrder={false} />

         {!reset && (
            <div className="flex flex-col justify-center items-center min-h-screen">
               <h1 className="text-2xl">Forgot password</h1>
               <label className="mt-2" htmlFor="password">New password</label>
               <input
                  type="text"
                  className="p-1 text-black rounded"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}

               />

               <label className="mt-2" htmlFor="confirmPassword">Confirm password</label>
               <input
                  type="password"
                  className="p-1 text-black"
                  placeholder="confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}

               />

               <button
                  className="bg-yellow-300 mt-2 text-black p-1 rounded"
                  onClick={resetPassword}

               >Confirm</button>
            </div>
         )}

         {reset && (
            <h1 className="text-4xl">Your password has been reset successfully!</h1>
         )}

      </div>
   )
}