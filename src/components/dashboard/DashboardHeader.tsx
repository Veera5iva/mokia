import React from 'react';
import { Bell, User } from 'lucide-react';
import Link from 'next/link';

interface DashboardHeaderProps {
  role: "provider" | "consumer"
  notifications?: number
}


 
 export default function DashboardHeader({ role, notifications = 0 }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          {role === "provider" ? "Service Provider Dashboard" : "Consumer Dashboard"}
        </h1>
        <div className="flex items-center space-x-4">
          <button className="relative rounded-full p-2 hover:bg-gray-100 focus:outline-none">
            <Bell className="h-6 w-6 text-gray-600" />
            {notifications > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {notifications}
              </span>
            )}
          </button>
          <Link href="/profile" className="rounded-full hover:bg-gray-100">
            <button className="p-2 focus:outline-none">
              <User className="h-6 w-6 text-gray-600" />
            </button>
          </Link>
        </div>
      </div>
    </header>
    
  );
};

