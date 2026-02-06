"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SquaresFour as LayoutDashboard, Users, SignOut as LogOut, Image as FileImage } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Simple client-side protection
    if (!document.cookie.includes("admin_session=true")) {
       router.push("/admin/login");
    } else {
       setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900/95 backdrop-blur-xl text-slate-300 border-r border-slate-800/50 hidden md:flex flex-col relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-teal-500/5 to-transparent pointer-events-none" />
        <div className="p-6 border-b border-slate-800/50">
           <div className="flex items-center gap-3 font-bold text-xl text-white">
             <div className="h-10 w-10 rounded-xl overflow-hidden bg-white flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/20">
              <img src="/images/logo.jpg" alt="COS Logo" className="w-full h-full object-cover" />
             </div>
             <div className="flex flex-col">
               <span className="leading-none text-teal-400">COS Vet</span>
               <span className="text-xs text-slate-500 font-medium mt-1">Admin Portal</span>
             </div>
           </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
           <Link href="/admin">
             <div className={cn("flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group", 
               pathname === "/admin" 
                 ? "bg-teal-500/10 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.1)] border border-teal-500/20" 
                 : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
             )}>
                <LayoutDashboard className={cn("w-5 h-5 transition-transform group-hover:scale-110", pathname === "/admin" && "text-teal-400")} />
                <span className="font-medium">Overview</span>
             </div>
           </Link>
           {/* Add more links as features grow */}
        </nav>

        <div className="p-4 border-t border-slate-800/50">
          <button 
             onClick={() => {
                document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                router.push("/admin/login");
             }}
             className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-200 group"
          >
             <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
             <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
         {children}
      </main>
    </div>
  );
}
