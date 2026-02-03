"use client";

import { WordRotate } from "@/components/ui/word-rotate";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { FadeIn } from "@/components/ui/fade-in";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-28 pb-12 md:py-20 overflow-hidden bg-paws">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-sky-100 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/4 animate-pulse duration-[10s]" />
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-teal-50 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/4" />

      <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="space-y-6 max-w-2xl">
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-3 mb-6">
               <div className="h-px w-12 bg-primary/50"></div>
               <span className="text-primary font-bold tracking-[0.2em] text-sm uppercase">COSWECARE</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Sincere Care for your <br />
              <span className="text-primary inline-block min-w-[200px]">
                <WordRotate words={["Fur Babies", "Family", "Best Friends", "Companions"]} />
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-lg text-slate-600 italic">
              "We treat them like family."
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              Transparent pricing. No surprise bills. Officially protected graduates.
              Experience veterinary care that truly cares.
            </p>
          </FadeIn>

          <FadeIn delay={0.4} className="flex flex-wrap gap-4 pt-4">
            <Link href="/appointment">
              {/* Using a standard button with clear styles to ensure readability */}
              <button className="px-8 py-4 rounded-full bg-primary hover:bg-teal-600 text-white font-bold text-lg shadow-xl shadow-primary/30 transform hover:-translate-y-1 transition-all duration-300">
                Book an Appointment
              </button>
            </Link>
            <Link href="/graduates">
              <button className="px-8 py-4 rounded-full border-2 border-slate-200 hover:border-primary/50 hover:bg-primary/5 text-slate-700 font-bold text-lg transition-all duration-300">
                View Graduates
              </button>
            </Link>
          </FadeIn>
        </div>

        {/* Hero Image - Enlarged */}
        <FadeIn direction="left" delay={0.4} className="relative hidden md:block h-[850px] w-full lg:-mr-32 mt-10">
           <div className="relative w-full h-full flex items-end justify-center">
              {/* Main Image Container */}
              <div className="relative w-full h-full"> 
                 <Image 
                    src="/images/heroimg.png" 
                    alt="Veterinary Professional" 
                    fill 
                    className="object-contain object-bottom drop-shadow-2xl transition-transform duration-700" 
                    priority
                    unoptimized
                 />
              </div>
           </div>
        </FadeIn>
      </div>
    </section>
  );
}
