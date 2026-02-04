"use client";

import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Calendar, CaretRight as ChevronRight, CaretLeft as ChevronLeft, Check, Dog, User, CalendarBlank as CalendarDays, CircleNotch as Loader2, WarningCircle as AlertCircle, XCircle } from "@/components/icons";
// const Calendar = () => <span />;
// const ChevronRight = () => <span />;
// const ChevronLeft = () => <span />;
// const Check = () => <span />;
// const Dog = () => <span />;
// const User = () => <span />;
// const CalendarDays = () => <span />;
// const Loader2 = () => <span />;
// const AlertCircle = () => <span />;
// const XCircle = () => <span />;
import { api } from "@/services/api";
import { FadeIn } from "@/components/ui/fade-in";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Types
interface FormData {
  ownerName: string;
  phone: string;
  petName: string;
  species: "Dog" | "Cat" | "Other";
  reason: string;
  date: string;
  time: string;
}

interface ClinicSettings {
  availableDays: number[];
  blockedDates: string[];
  timeSlots: string[];
  openTime: string;
  closeTime: string;
}

interface FormErrors {
  ownerName?: string;
  phone?: string;
  petName?: string;
  date?: string;
  time?: string;
  general?: string;
}

const INITIAL_DATA: FormData = {
  ownerName: "",
  phone: "",
  petName: "",
  species: "Dog",
  reason: "Wellness Check-up",
  date: "",
  time: ""
};

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function AppointmentPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [settings, setSettings] = useState<ClinicSettings | null>(null);
  const [loadingSettings, setLoadingSettings] = useState(true);

  // Fetch clinic settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await api.settings.get();
        setSettings(data);
      } catch (error) {
        console.error("Failed to load settings", error);
      } finally {
        setLoadingSettings(false);
      }
    };
    fetchSettings();
  }, []);

  const updateData = (fields: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
    // Clear errors for updated fields
    const clearedErrors = { ...errors };
    Object.keys(fields).forEach(key => {
      delete clearedErrors[key as keyof FormErrors];
    });
    setErrors(clearedErrors);
  };

  // Validation functions
  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.ownerName.trim()) {
      newErrors.ownerName = "Please enter your name";
    } else if (formData.ownerName.trim().length < 2) {
      newErrors.ownerName = "Name must be at least 2 characters";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    } else if (!/^[\d\s+-]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.petName.trim()) {
      newErrors.petName = "Please enter your pet's name";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.date) {
      newErrors.date = "Please select a date";
    } else if (settings) {
      const selectedDate = new Date(formData.date);
      const dayOfWeek = selectedDate.getDay();
      
      if (!settings.availableDays.includes(dayOfWeek)) {
        newErrors.date = `Clinic is closed on ${DAY_NAMES[dayOfWeek]}s`;
      }
      
      if (settings.blockedDates.includes(formData.date)) {
        newErrors.date = "This date is not available for booking";
      }
      
      // Check if date is in the past
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Cannot book a date in the past";
      }
    }
    
    if (!formData.time) {
      newErrors.time = "Please select a time slot";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    let isValid = true;
    
    if (step === 1) isValid = validateStep1();
    if (step === 2) isValid = validateStep2();
    if (step === 3) isValid = validateStep3();
    
    if (isValid) {
      setStep(s => Math.min(s + 1, 4));
    }
  };
  
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors({});
    
    try {
      await api.appointments.create(formData);
      setIsSuccess(true);
    } catch (error) {
      console.error("Booking failed", error);
      setErrors({ general: "Failed to book appointment. Please try again or call us directly." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if a date is available
  const isDateAvailable = (dateString: string): boolean => {
    if (!settings) return true;
    
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    
    // Check if day is available
    if (!settings.availableDays.includes(dayOfWeek)) return false;
    
    // Check if date is blocked
    if (settings.blockedDates.includes(dateString)) return false;
    
    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return false;
    
    return true;
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get maximum date (3 months from now)
  const getMaxDate = () => {
    const future = new Date();
    future.setMonth(future.getMonth() + 3);
    return future.toISOString().split('T')[0];
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  // Error display component
  const ErrorMessage = ({ message }: { message?: string }) => {
    if (!message) return null;
    return (
      <p className="text-sm text-rose-600 flex items-center gap-1 mt-1">
        <AlertCircle className="w-4 h-4" />
        {message}
      </p>
    );
  };

  if (loadingSettings) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-500">Loading booking options...</p>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-slate-50">
        <FadeIn>
          <Card className="w-full max-w-md mx-auto text-center border-teal-100 shadow-xl">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-teal-600" />
              </div>
              <CardTitle className="text-2xl text-teal-900">Appointment Requested!</CardTitle>
              <CardDescription>
                We'll contact you to confirm your appointment with {formData.petName}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 p-4 rounded-lg text-left space-y-2 text-sm text-slate-600">
                <p><strong>Owner:</strong> {formData.ownerName}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
                <p><strong>Pet:</strong> {formData.petName} ({formData.species})</p>
                <p><strong>Date:</strong> {formData.date} at {formData.time}</p>
                <p><strong>Service:</strong> {formData.reason}</p>
              </div>
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                <strong>Note:</strong> Your appointment is pending confirmation. We will call or text you to confirm.
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Link href="/">
                <Button>Back to Home</Button>
              </Link>
            </CardFooter>
          </Card>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 relative overflow-hidden bg-slate-50 bg-paws">
       {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-sky-100 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2 animate-pulse duration-[10s]" />
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-teal-50 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/3" />

      <div className="container max-w-2xl mx-auto relative z-10">
        <div className="mb-12 text-center">
           <FadeIn>
             <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Book an Appointment</h1>
             <p className="text-slate-600">Schedule a visit for your furry friend in just a few steps.</p>
           </FadeIn>
           
           <FadeIn delay={0.2} className="flex justify-center gap-3 mt-8">
             {[1, 2, 3, 4].map((i) => (
               <div 
                 key={i} 
                 className={cn(
                   "h-2.5 rounded-full transition-all duration-500 ease-out", 
                   i <= step ? "w-10 bg-teal-500 shadow-teal-200 shadow-md" : "w-2.5 bg-slate-200"
                 )}
               />
             ))}
           </FadeIn>
        </div>

        <FadeIn delay={0.3}>
          <Card className="overflow-hidden border-white/50 shadow-2xl bg-white/90 backdrop-blur-md ring-1 ring-slate-900/5">
          <CardContent className="p-0">
             <div className="p-8 min-h-[400px]">
               {/* General Error */}
               {errors.general && (
                 <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-3 text-rose-700">
                   <XCircle className="w-5 h-5 mt-0.5 shrink-0" />
                   <div>
                     <p className="font-medium">Booking Failed</p>
                     <p className="text-sm">{errors.general}</p>
                   </div>
                 </div>
               )}

               {/* <AnimatePresence mode="wait" custom={step}> */}
                 {step === 1 && (
                   <div 
                     key="step1" 
                    //  custom={step} variants={variants} initial="enter" animate="center" exit="exit"
                    //  transition={{ duration: 0.3 }}
                     className="space-y-4"
                   >
                     <div className="flex items-center gap-2 mb-6 text-primary">
                       <User className="w-6 h-6" />
                       <h2 className="text-xl font-semibold">Owner Information</h2>
                     </div>
                     <div className="space-y-2">
                       <label className="text-sm font-medium">Full Name <span className="text-rose-500">*</span></label>
                       <Input 
                         placeholder="e.g. Juan dela Cruz" 
                         value={formData.ownerName}
                         onChange={(e) => updateData({ ownerName: e.target.value })}
                         className={cn(errors.ownerName && "border-rose-300 focus:ring-rose-500")}
                       />
                       <ErrorMessage message={errors.ownerName} />
                     </div>
                     <div className="space-y-2">
                       <label className="text-sm font-medium">Phone Number <span className="text-rose-500">*</span></label>
                       <Input 
                         placeholder="0912 345 6789" 
                         value={formData.phone}
                         onChange={(e) => updateData({ phone: e.target.value })}
                         className={cn(errors.phone && "border-rose-300 focus:ring-rose-500")}
                       />
                       <ErrorMessage message={errors.phone} />
                     </div>
                   </div>
                 )}

                 {step === 2 && (
                   <div 
                     key="step2"
                    //  custom={step} variants={variants} initial="enter" animate="center" exit="exit"
                    //  transition={{ duration: 0.3 }}
                     className="space-y-4"
                   >
                     <div className="flex items-center gap-2 mb-6 text-primary">
                       <Dog className="w-6 h-6" />
                       <h2 className="text-xl font-semibold">Pet Details</h2>
                     </div>
                     <div className="space-y-2">
                       <label className="text-sm font-medium">Pet's Name <span className="text-rose-500">*</span></label>
                       <Input 
                         placeholder="e.g. Bantay" 
                         value={formData.petName}
                         onChange={(e) => updateData({ petName: e.target.value })}
                         className={cn(errors.petName && "border-rose-300 focus:ring-rose-500")}
                       />
                       <ErrorMessage message={errors.petName} />
                     </div>
                     <div className="space-y-2">
                       <label className="text-sm font-medium">Species</label>
                       <div className="flex gap-4">
                         {["Dog", "Cat", "Other"].map((type) => (
                           <button
                             key={type}
                             onClick={() => updateData({ species: type as "Dog" | "Cat" | "Other" })}
                             className={cn(
                               "flex-1 py-3 rounded-lg border text-sm font-medium transition-all",
                               formData.species === type 
                                 ? "border-primary bg-primary/10 text-primary" 
                                 : "border-slate-200 hover:border-primary/50"
                             )}
                           >
                             {type}
                           </button>
                         ))}
                       </div>
                     </div>
                   </div>
                 )}

                 {step === 3 && (
                   <div 
                     key="step3"
                    //  custom={step} variants={variants} initial="enter" animate="center" exit="exit"
                    //  transition={{ duration: 0.3 }}
                     className="space-y-4"
                   >
                     <div className="flex items-center gap-2 mb-6 text-primary">
                       <CalendarDays className="w-6 h-6" />
                       <h2 className="text-xl font-semibold">Date & Reason</h2>
                     </div>
                     
                     {/* Info about available days */}
                     {settings && (
                       <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-sm text-teal-700 mb-4">
                         <strong>📅 Available:</strong> {settings.availableDays.map(d => DAY_NAMES[d]).join(", ")}
                         <br />
                         <strong>⏰ Hours:</strong> {settings.openTime} - {settings.closeTime}
                       </div>
                     )}

                     <div className="space-y-2">
                       <label className="text-sm font-medium">Reason for Visit</label>
                       <select 
                         className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                         value={formData.reason}
                         onChange={(e) => updateData({ reason: e.target.value })}
                       >
                         <option>Wellness Check-up</option>
                         <option>Vaccination</option>
                         <option>Sick Consultation</option>
                         <option>Surgery</option>
                         <option>Confinement</option>
                         <option>Deworming</option>
                         <option>Laboratory Test</option>
                       </select>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <label className="text-sm font-medium">Date <span className="text-rose-500">*</span></label>
                         <Input 
                           type="date"
                           value={formData.date}
                           onChange={(e) => updateData({ date: e.target.value })}
                           min={getMinDate()}
                           max={getMaxDate()}
                           className={cn(errors.date && "border-rose-300 focus:ring-rose-500")}
                         />
                         <ErrorMessage message={errors.date} />
                       </div>
                       <div className="space-y-2">
                         <label className="text-sm font-medium">Time <span className="text-rose-500">*</span></label>
                         <select 
                             className={cn(
                               "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                               errors.time && "border-rose-300"
                             )}
                             value={formData.time}
                             onChange={(e) => updateData({ time: e.target.value })}
                         >
                            <option value="" disabled>Select Time</option>
                            {settings?.timeSlots.map(slot => (
                              <option key={slot} value={slot}>{slot}</option>
                            ))}
                         </select>
                         <ErrorMessage message={errors.time} />
                       </div>
                     </div>
                   </div>
                 )}

                 {step === 4 && (
                   <div 
                     key="step4"
                    //  custom={step} variants={variants} initial="enter" animate="center" exit="exit"
                    //  transition={{ duration: 0.3 }}
                     className="space-y-6"
                   >
                     <div className="flex items-center gap-2 mb-6 text-primary">
                       <Check className="w-6 h-6" />
                       <h2 className="text-xl font-semibold">Confirm Appointment</h2>
                     </div>
                     
                     <div className="bg-slate-50 p-6 rounded-xl space-y-4 text-sm">
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-slate-500">Owner</span>
                          <span className="font-medium">{formData.ownerName}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-slate-500">Phone</span>
                          <span className="font-medium">{formData.phone}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-slate-500">Pet</span>
                          <span className="font-medium">{formData.petName} ({formData.species})</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-slate-500">Service</span>
                          <span className="font-medium">{formData.reason}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Schedule</span>
                          <span className="font-medium">{formData.date} at {formData.time}</span>
                        </div>
                     </div>

                     <div className="text-xs text-slate-500 text-center">
                       By clicking confirm, you agree to our policies. We will contact you to confirm the appointment.
                     </div>
                   </div>
                 )}
               {/* </AnimatePresence> */}
             </div>
          </CardContent>
          <CardFooter className="bg-slate-50 p-6 flex justify-between">
            <Button 
              variant="ghost" 
              onClick={prevStep} 
              disabled={step === 1 || isSubmitting}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            
            {step < 4 ? (
              <Button onClick={nextStep}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting} className="w-32">
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Confirm"}
              </Button>
            )}
          </CardFooter>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
