"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { FadeIn } from "@/components/ui/fade-in";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { CircleNotch as Loader2, Heart as SearchHeart } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// Types
interface Graduate {
  id: string;
  name: string;
  owner: string;
  image: string;
  batch: string;
  story: string;
}

export function GraduatesWall() {
  const [graduates, setGraduates] = useState<Graduate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch graduates from our mock API
    const fetchGraduates = async () => {
      try {
        const data = await api.graduates.getAll();
        setGraduates(data);
      } catch (error) {
        console.error("Failed to fetch graduates", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGraduates();
  }, []);

  const filteredGraduates = graduates.filter(grad => 
    grad.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    grad.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    grad.batch.includes(searchQuery)
  );

  return (
    <section id="graduates" className="py-12 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 space-y-4">
           <FadeIn>
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-medium mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                Officially Protected
             </div>
           </FadeIn>
           <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">The Graduates Wall</h2>
           </FadeIn>
           <FadeIn delay={0.2}>
            <p className="text-lg text-slate-600 mb-8">
              Celebrating our brave patients who have completed their vaccination journey.
              Class of 2025 & 2026.
            </p>
           </FadeIn>
           
           {/* Cute Search Bar */}
           <FadeIn delay={0.3}>
             <div className="relative max-w-md mx-auto transform hover:scale-105 transition-transform duration-300">
               <div className="relative group">
                 <div className="absolute inset-0 bg-gradient-to-r from-teal-200 to-primary/30 rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
                 <div className="relative flex items-center bg-white rounded-full shadow-lg border-2 border-slate-100 focus-within:border-primary/50 overflow-hidden">
                   <div className="pl-6 text-slate-400">
                     <SearchHeart className="w-5 h-5 text-primary animate-pulse" />
                   </div>
                   <input 
                     type="text" 
                     placeholder="Search for a cutie..." 
                     className="w-full py-4 px-4 outline-none text-slate-600 placeholder:text-slate-400 font-medium"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                   />
                   {searchQuery && (
                     <button onClick={() => setSearchQuery("")} className="pr-4 text-slate-400 hover:text-rose-500">
                        <span className="sr-only">Clear</span>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                     </button>
                   )}
                 </div>
               </div>
             </div>
           </FadeIn>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          /* Masonry Grid via CSS Columns */
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredGraduates.map((grad, index) => (
              <FadeIn key={grad.id} delay={index * 0.1} className="break-inside-avoid">
                <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-500 border border-slate-100">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* Use a placeholder if image logic isn't fully wired or image is missing */}
                    <div className="absolute inset-0 bg-slate-200 animate-pulse" /> 
                    <Image 
                       src={grad.image && grad.image.startsWith('/') ? grad.image : '/placeholder-pet.jpg'} // Fallback logic
                       alt={grad.name}
                       fill
                       className="object-cover transition-transform duration-700 group-hover:scale-110"
                       // Need to handle missing images gracefully in real app
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Badge */}
                    <div className="absolute top-4 right-4">
                       <Badge variant="secondary" className="bg-white/90 text-slate-900 backdrop-blur-sm shadow-sm border-0">
                          Batch {grad.batch}
                       </Badge>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                       <h3 className="text-2xl font-bold mb-1">{grad.name}</h3>
                       <p className="text-sm text-slate-200 font-medium mb-2">Owned by {grad.owner}</p>
                       <p className="text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-2">
                          "{grad.story}"
                       </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
        
        {/* Placeholder if empty */}
        {!loading && filteredGraduates.length === 0 && (
           <div className="text-center py-20 bg-slate-100 rounded-3xl border border-dashed border-slate-300">
              <p className="text-slate-500">No graduates found matching "{searchQuery}".</p>
           </div>
        )}
      </div>
    </section>
  );
}
