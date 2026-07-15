"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { UserCircle, LogOut } from "lucide-react"
import { fetchApi } from "@/lib/api"

export function HeaderUserMenu() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetchApi('/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      
      router.push('/login');
      router.refresh();
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
           <p className="text-sm font-bold text-slate-700 leading-tight">Admin ROE</p>
           <p className="text-xs text-slate-500 font-medium">Administrator</p>
        </div>
        <UserCircle className="h-9 w-9 text-blue-600" />
      </div>
      
      <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
      
      <button 
        onClick={handleLogout}
        className="flex items-center gap-2 text-sm font-medium text-rose-500 hover:text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-full transition-all"
        title="Keluar"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Keluar</span>
      </button>
    </div>
  )
}
