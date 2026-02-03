"use client";

import { FadeIn } from "@/components/ui/fade-in";
import { Stethoscope, Syringe, HeartPulse, Microscope, ShoppingBag, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Consultation",
    description: "Expert veterinary advice and comprehensive health assessments for your pet.",
    icon: Stethoscope,
    color: "bg-teal-100 text-teal-600",
  },
  {
    title: "Deworming",
    description: "Essential protection against internal parasites to keep them healthy.",
    icon: ShieldCheck,
    color: "bg-sky-100 text-sky-600",
  },
  {
    title: "Vaccination",
    description: "Core immunizations to prevent common and deadly diseases.",
    icon: Syringe,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Laboratory Test",
    description: "Advanced diagnostics including CBC, Blood Chem, and microscopic analysis.",
    icon: Microscope,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Surgery",
    description: "Safe surgical procedures performed by experienced veterinarians.",
    icon: HeartPulse,
    color: "bg-rose-100 text-rose-600",
  },
  {
    title: "Pharmacy & Pet Supplies",
    description: "Fully stocked pharmacy and essential supplies for your pet's needs.",
    icon: ShoppingBag,
    color: "bg-orange-100 text-orange-600",
  },
];

export function Services() {
  return (
    <section id="services" className="py-12 md:py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-slate-50 opacity-50 bg-paws pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <FadeIn>
            <div className="inline-block px-8 py-3 rounded-full bg-teal-400 text-white font-black text-2xl tracking-widest uppercase shadow-lg shadow-teal-200 transform -rotate-2">
              Services
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
             <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
               Everything Your Pet Needs
             </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-slate-600">
              We provide a full range of veterinary care to ensure a long, happy, and healthy life for your companions.
            </p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <FadeIn key={service.title} delay={0.1 * index} direction="up">
              <div className="group h-full p-8 bg-white rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                {/* Hover Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                   <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${service.color} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-md`}>
                      <service.icon className="w-10 h-10" />
                   </div>
                   
                   <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors">{service.title}</h3>
                      <p className="text-slate-600 leading-relaxed">
                        {service.description}
                      </p>
                   </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
