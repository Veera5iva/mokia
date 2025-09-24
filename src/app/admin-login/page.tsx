"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function AdminLoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.role === "admin") {
      router.replace("/admin"); // redirect to admin dashboard if already logged in
    }
  }, [session, router]);

  if (session?.user?.role === "admin") {
    return <p>Redirecting to admin dashboard...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <button
        onClick={() => signIn("google", { callbackUrl: "/admin" })}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Login with Google
      </button>
    </div>
  );
}
