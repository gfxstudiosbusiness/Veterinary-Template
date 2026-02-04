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
      <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800">
           <div className="flex items-center gap-2 font-bold text-xl text-white">
             <div className="h-8 w-8 rounded-lg bg-primary text-slate-900 flex items-center justify-center">
              C+S
             </div>
             <span>Admin</span>
           </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
           <Link href="/admin">
             <div className={cn("flex items-center gap-3 px-4 py-3 rounded-lg transition-colors", pathname === "/admin" ? "bg-primary/10 text-primary" : "hover:bg-slate-800")}>
                <LayoutDashboard className="w-5 h-5" />
                <span>Overview</span>
             </div>
           </Link>
           {/* Add more links as features grow */}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
             onClick={() => {
                document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                router.push("/admin/login");
             }}
             className="flex items-center gap-3 px-4 py-3 rounded-lg w-full hover:bg-red-900/20 hover:text-red-400 transition-colors"
          >
             <LogOut className="w-5 h-5" />
             <span>Logout</span>
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
