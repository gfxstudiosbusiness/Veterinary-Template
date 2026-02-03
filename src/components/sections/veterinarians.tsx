"use client";

import { FadeIn } from "@/components/ui/fade-in";
import Image from "next/image";
import { PawPrint } from "lucide-react";

const VETS = [
  {
    name: "Doc CC",
    role: "Senior Veterinarian",
    image: "/images/vet3.jpg",
    color: "bg-teal-100 text-teal-700"
  },
  {
    name: "Doc Bel",
    role: "Veterinarian",
    image: "/images/vet1.jpg",
    color: "bg-sky-100 text-sky-700"
  },
  {
    name: "Doc James",
    role: "Veterinarian",
    image: "/images/vet2.jpg",
    color: "bg-indigo-100 text-indigo-700"
  }
];

export function Veterinarians() {
  return (
    <section className="py-12 md:py-24 bg-slate-50 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">Resident Veterinarians</h2>
            <p className="text-lg text-slate-600">
              Meet the dedicated professionals who treat your pets like family.
            </p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-8 justify-items-center">
          {VETS.map((vet, index) => (
            <FadeIn key={vet.name} delay={index * 0.1} className="w-full max-w-sm">
               <div className="group relative flex flex-col items-center">
                  {/* Circular Image Container with Ring */}
                  <div className="relative w-64 h-64 mb-6">
                     <div className="absolute inset-0 rounded-full border-[6px] border-primary/20 group-hover:border-primary/50 transition-colors duration-500 scale-110" />
                     <div className="absolute inset-0 rounded-full border-[2px] border-white shadow-xl overflow-hidden bg-white">
                        <Image 
                           src={vet.image} 
                           alt={vet.name} 
                           fill 
                           className="object-cover"
                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                     </div>
                     
                     {/* Decorative Paw */}
                     <div className="absolute bottom-0 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary">
                        <PawPrint className="w-6 h-6 fill-current" />
                     </div>
                  </div>

                  {/* Text */}
                  <div className="text-center space-y-1">
                     <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors">{vet.name}</h3>
                     <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${vet.color}`}>
                        {vet.role}
                     </span>
                  </div>
               </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
