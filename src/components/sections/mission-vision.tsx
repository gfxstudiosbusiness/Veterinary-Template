"use client";

import { FadeIn } from "@/components/ui/fade-in";
import Image from "next/image";
import { Heart, Stethoscope, PawPrint } from "@phosphor-icons/react";

export function MissionVision() {
  return (
    <section className="py-12 md:py-24 bg-slate-50/50 bg-paws overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 space-y-12 md:space-y-16">
        
        {/* VISION SECTION */}
        <FadeIn className="bg-white rounded-3xl p-6 md:p-12 shadow-xl border border-slate-100 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Left Column: Text */}
            <div className="w-full md:w-1/2 space-y-6">
                <div className="flex items-center gap-4">
                   <div className="relative flex items-center justify-center w-14 h-14 bg-teal-50 rounded-2xl text-primary">
                      <Heart className="w-8 h-8 fill-current opacity-20 absolute" />
                      <PawPrint className="w-6 h-6 z-10" />
                   </div>
                   <h2 className="text-3xl font-bold uppercase tracking-wider text-slate-900">Our Vision</h2>
                </div>
                
                <p className="text-slate-600 leading-relaxed text-lg">
                   Our vision is to provide quality and affordable health care for companion animals by medical innovation, continued education and advancement of veterinary practice. We will be reinforcing communication and interaction to client and pets by promoting wellness and proper health care. Through our community involvement and support we will encourage strong and healthy pet human bond.
                </p>
                
                <div className="pt-6 border-t border-slate-100">
                   <div className="text-slate-900 font-bold text-lg">Cherrymay Samaniego-Vergaño</div>
                   <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Senior Veterinarian / Owner</div>
                </div>
            </div>

            {/* Right Column: Image */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden shadow-lg group">
                    <div className="absolute inset-0 bg-orange-50 mix-blend-multiply opacity-20 pointer-events-none" /> {/* Warm/Soft Filter */}
                    <Image 
                       src="/images/owner.png" 
                       alt="Dr. Cherrymay Samaniego-Vergaño" 
                       fill
                       className="object-contain group-hover:scale-105 transition-transform duration-700"
                       unoptimized
                    />
                </div>
            </div>
        </FadeIn>

        {/* MISSION SECTION */}
        <FadeIn className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 flex flex-col md:flex-row items-center gap-12">
            {/* Left Column: Text */}
            <div className="w-full md:w-1/2 space-y-6">
                <div className="flex items-center gap-4">
                   <div className="relative flex items-center justify-center w-14 h-14 bg-teal-50 rounded-2xl text-primary">
                      <Stethoscope className="w-8 h-8" />
                      <Heart className="w-3 h-3 absolute top-1 right-1 fill-current" />
                   </div>
                   <h2 className="text-3xl font-bold uppercase tracking-wider text-slate-900">Our Mission</h2>
                </div>
                
                <ul className="space-y-4">
                  {[
                    "To provide quality and affordable veterinary services for companion animal.",
                    "To promote pet wellness by client education.",
                    "To encourage the community to seek help in Veterinary Professionals for longevity and health care of their pets."
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start text-slate-600">
                      <div className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-6 border-t border-slate-100">
                   <div className="text-slate-900 font-bold text-lg">Paul Rovin Vergaño</div>
                   <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Co-Owner</div>
                </div>
            </div>

            {/* Right Column: Image */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                 <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden shadow-lg group">
                    <div className="absolute inset-0 bg-blue-50 mix-blend-multiply opacity-20 pointer-events-none" /> {/* Subtle Cool/Soft Filter for Paul */}
                    <Image 
                       src="/images/coowner.png" 
                       alt="Paul Rovin Vergaño" 
                       fill
                       className="object-contain group-hover:scale-105 transition-transform duration-700"
                       unoptimized
                    />
                </div>
            </div>
        </FadeIn>

      </div>
    </section>
  );
}
