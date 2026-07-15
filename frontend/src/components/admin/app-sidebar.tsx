"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboard, Users, Settings, LogOut, BarChart3, FolderKanban, FileQuestion, PieChart, Shield } from "lucide-react"
import { fetchApi } from "@/lib/api";

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      if (token) {
        await fetchApi("/logout", {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear storage and cookies
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      
      router.push('/login');
      router.refresh();
    }
  };
  
  return (
    <Sidebar className="border-r border-slate-200 bg-slate-50 shadow-sm shadow-slate-200/50">
      <SidebarHeader className="border-b border-slate-200 p-5">
         <div className="flex items-center gap-3 font-extrabold text-xl tracking-tight text-slate-900">
           <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl shadow-md shadow-blue-500/20 flex-shrink-0">
               <BarChart3 className="w-5 h-5 text-white" strokeWidth={2.5} />
           </div>
           <span className="truncate">Stress<span className="text-blue-600">Index</span></span>
         </div>
      </SidebarHeader>
      <SidebarContent className="px-3 mt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              <SidebarMenuItem>
                <SidebarMenuButton isActive={pathname === '/admin'} render={<Link href="/admin" />} className={`rounded-xl py-5 transition-all font-medium group ${pathname === '/admin' ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}>
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={pathname.startsWith('/admin/projects')} render={<Link href="/admin/projects" />} className={`rounded-xl py-5 transition-all font-medium group ${pathname.startsWith('/admin/projects') ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}>
                  <FolderKanban className="w-5 h-5" />
                  <span>Manajemen Proyek</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={pathname.startsWith('/admin/questionnaires')} render={<Link href="/admin/questionnaires" />} className={`rounded-xl py-5 transition-all font-medium group ${pathname.startsWith('/admin/questionnaires') ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}>
                  <FileQuestion className="w-5 h-5" />
                  <span>Kuesioner & Dimensi</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={pathname.startsWith('/admin/administrators')} render={<Link href="/admin/administrators" />} className={`rounded-xl py-5 transition-all font-medium group ${pathname.startsWith('/admin/administrators') ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}>
                  <Shield className="w-5 h-5" />
                  <span>Manajemen Akses</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-slate-200 p-4">
        <SidebarMenu className="space-y-1.5">
          <SidebarMenuItem>
            <SidebarMenuButton isActive={pathname === '/admin/settings'} render={<Link href="/admin/settings" />} className={`rounded-xl py-5 transition-all font-medium group ${pathname === '/admin/settings' ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}>
              <Settings className={`w-5 h-5 ${pathname !== '/admin/settings' && 'group-hover:rotate-45 transition-transform duration-300'}`} />
              <span>Pengaturan</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} className="rounded-xl py-5 text-rose-500 hover:text-rose-700 hover:bg-rose-100 font-medium transition-all group w-full justify-start cursor-pointer">
              <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Keluar ke Beranda</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
