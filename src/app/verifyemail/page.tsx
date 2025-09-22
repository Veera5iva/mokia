/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmail() {
   const [token, setToken] = useState("");
   const [verified, setVerified] = useState(false);
   const [error, setError] = useState(false);

   const verifyEmail = useCallback(async () => {
      try {
         await axios.post("/api/users/verifyemail", { token });
         setVerified(true);
         
      } catch (error: any) {
         setError(true);
         toast.error(error.message);
         console.log(error.response.data);
      }
   }, [token]);

   useEffect(() => {
      const urlToken = window.location.search.split("=")[1];
      setToken(urlToken || "");
   }, [])

   useEffect(() => {
      if(token.length > 0) verifyEmail();
   }, [token, verifyEmail]);

   return (
      <div className="h-screen flex flex-col items-center justify-center">
         <h1 className="text-4xl">Verify email</h1>
         <h2 className="text-2xl bg-orange-600 text-black">{token ? `${token}` : "No token"}</h2>
         {verified && (
            <div>
               <p className="text-2xl">Email verified successfully</p>
               <Link href = "/login">Go to login page</Link>
            </div>
         )}
         {error && (
            <div>
               <p className="text-2xl">Error verifying email</p>
               <Link href="/login">Go to login page</Link>
            </div>

         )}

      </div>

   )


}
