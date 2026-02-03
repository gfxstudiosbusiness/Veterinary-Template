"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { FadeIn } from "@/components/ui/fade-in";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Graduate {
  id: string;
  name: string;
  owner: string;
  image: string;
  story: string;
}

export function GraduatesCarousel() {
  const [graduates, setGraduates] = useState<Graduate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  // Limit to 4 for carousel
  const displayGrads = graduates.slice(0, 4);

  return (
    <section id="graduates" className="py-24 bg-white bg-paws">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4 max-w-2xl">
             <FadeIn>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-medium mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                  </span>
                  Officially Protected
               </div>
             </FadeIn>
             <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">Our Graduates</h2>
              <p className="text-lg text-slate-600 mt-4">
                Celebrating the brave patients who have completed their vaccination journey.
              </p>
             </FadeIn>
          </div>
          <FadeIn delay={0.2}>
             <Link href="/graduates">
               <Button variant="outline" className="rounded-full gap-2 group border-primary/50 text-primary hover:bg-primary/5">
                 See All Graduates <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </Button>
             </Link>
          </FadeIn>
        </div>

        {/* Carousel / Horizontal Scroll */}
        <div className="relative">
           <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
              {loading ? (
                // Skeleton loading
                [1,2,3,4].map(i => (
                   <div key={i} className="min-w-[280px] md:min-w-[320px] h-[400px] bg-slate-100 rounded-2xl animate-pulse" />
                ))
              ) : (
                displayGrads.map((grad, index) => (
                   <FadeIn key={grad.id} delay={index * 0.1} className="min-w-[280px] md:min-w-[340px] snap-start">
                      <div className="group relative h-[420px] rounded-2xl overflow-hidden bg-white shadow-lg border border-slate-100 transition-transform hover:-translate-y-2 duration-500">
                         <Image 
                            src={grad.image} 
                            alt={grad.name} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                         
                         <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                            <h3 className="text-2xl font-bold">{grad.name}</h3>
                            <p className="text-slate-200">Owned by {grad.owner}</p>
                            <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                               <p className="text-sm text-slate-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100 line-clamp-2">
                                  {grad.story}
                               </p>
                            </div>
                         </div>
                      </div>
                   </FadeIn>
                ))
              )}
           </div>
        </div>
      </div>
    </section>
  );
}
