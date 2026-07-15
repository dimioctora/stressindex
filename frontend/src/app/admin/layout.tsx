import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/admin/app-sidebar"
import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { HeaderUserMenu } from "@/components/admin/header-user-menu"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#f8fafc]">
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-slate-200/70 bg-white/80 backdrop-blur-md px-6 shadow-[0_2px_10px_0_rgba(0,0,0,0.02)] z-10 sticky top-0">
          <div className="flex items-center gap-4">
             <SidebarTrigger className="-ml-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-lg p-2 transition-all" />
             <div className="relative hidden md:block w-64 lg:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input type="text" placeholder="Cari data proyek, kuesioner, responden..." className="w-full bg-slate-100/70 border-transparent pl-9 rounded-full h-10 text-sm focus-visible:ring-blue-500/20 focus-visible:border-blue-500 focus-visible:bg-white transition-all shadow-none" />
             </div>
          </div>
          
          <div className="flex items-center gap-4">
             <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-2 h-2.5 w-2.5 rounded-full bg-rose-500 border-2 border-white"></span>
             </button>
             
             <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
             
             <HeaderUserMenu />
          </div>
        </header>
        <div className="flex flex-1 flex-col p-6 lg:p-10 max-w-[1600px] w-full mx-auto min-h-0 overflow-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
