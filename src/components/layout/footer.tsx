import Link from "next/link";
import Image from "next/image";
import { Facebook, MapPin, Phone, Clock, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 border-t-4 border-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white/10 shadow-lg">
                 <Image 
                   src="/images/logo.jpg" 
                   alt="COS VET" 
                   width={48} 
                   height={48} 
                   className="object-cover w-full h-full"
                 />
               </div>
               <div>
                 <h3 className="font-bold text-white text-lg leading-none">COS</h3>
                 <p className="text-xs text-primary font-bold tracking-wider uppercase">Veterinary Clinic</p>
               </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm">
              Providing sincere, affordable, and transparent veterinary care for your beloved fur babies. We treat them like family.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/COSVet/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-[#1877F2] text-white flex items-center justify-center transition-all duration-300 group shadow-lg ring-1 ring-white/10 hover:ring-transparent"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 fill-current" />
              </a>
            </div>
          </div>
          
          {/* Links Column */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span> Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span> Services
                </Link>
              </li>
              <li>
                <Link href="/graduates" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span> The Graduates
                </Link>
              </li>
              <li>
                <Link href="/appointment" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span> Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
             <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
             <ul className="space-y-4 text-sm">
               <li className="flex items-start gap-3">
                 <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                 <span className="leading-relaxed">Unit 5, V&C Bldg, Trece Martires City, Cavite (Near Waltermart Trece)</span>
               </li>
               <li className="flex items-center gap-3">
                 <Phone className="w-5 h-5 text-primary shrink-0" />
                 <span>0923 587 8065</span>
               </li>
             </ul>
          </div>

          {/* Hours Column */}
          <div>
             <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Clinic Hours</h4>
             <ul className="space-y-4 text-sm">
               <li className="flex items-start gap-3">
                 <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                 <div className="space-y-1">
                   <p className="font-medium text-white">Tuesday - Sunday</p>
                   <p className="text-slate-500">9:00 AM - 5:00 PM</p>
                 </div>
               </li>
                <li className="flex items-start gap-3">
                 <div className="w-5 flex justify-center text-rose-500 font-bold">•</div>
                 <div className="space-y-1">
                   <p className="font-medium text-slate-400">Monday</p>
                   <p className="text-rose-500/80 text-xs uppercase font-bold tracking-wide">Closed</p>
                 </div>
               </li>
             </ul>
          </div>

        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
           <p>© {new Date().getFullYear()} COS Veterinary Clinic. All rights reserved.</p>
           <p className="flex items-center gap-2">
             <span>Sincere Care.</span>
             <span className="w-1 h-1 rounded-full bg-slate-700"></span>
             <span>Transparent Pricing.</span>
           </p>
        </div>
      </div>
    </footer>
  );
}
