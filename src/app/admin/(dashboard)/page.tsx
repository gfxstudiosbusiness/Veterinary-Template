"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { 
  Users, Calendar, Award, Plus, Upload, Trash2, 
  CheckCircle, XCircle, Clock, RefreshCw, PawPrint,
  Loader2, Settings, CalendarX, CalendarCheck
} from "lucide-react";

interface Graduate {
  id: string;
  name: string;
  owner: string;
  image: string;
  batch: string;
  story: string;
}

interface Appointment {
  id: string;
  petName: string;
  species: string;
  ownerName: string;
  phone: string;
  reason: string;
  date: string;
  time: string;
  status: string;
}

interface ClinicSettings {
  availableDays: number[];
  blockedDates: string[];
  timeSlots: string[];
  openTime: string;
  closeTime: string;
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [graduates, setGraduates] = useState<Graduate[]>([]);
  const [settings, setSettings] = useState<ClinicSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<"appointments" | "graduates" | "settings">("appointments");
  
  // Upload State
  const [newGrad, setNewGrad] = useState({ name: "", owner: "", story: "", file: null as string | null, batch: "2026" });
  const [isAdding, setIsAdding] = useState(false);
  
  // New blocked date input
  const [newBlockedDate, setNewBlockedDate] = useState("");
  // New time slot input
  const [newTimeSlot, setNewTimeSlot] = useState("");

  const refreshData = async () => {
    setLoading(true);
    try {
      const [s, a, g, set] = await Promise.all([
        api.stats.getDashboardStats(),
        api.appointments.getAll(),
        api.graduates.getAll(),
        api.settings.get()
      ]);
      setStats(s);
      setAppointments(a);
      setGraduates(g);
      setSettings(set);
    } catch (error) {
      console.error("Failed to load dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
     if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
           setNewGrad(prev => ({ ...prev, file: reader.result as string }));
        };
        reader.readAsDataURL(file);
     }
  };

  const handleAddGraduate = async () => {
     if (!newGrad.name || !newGrad.file) return alert("Please provide name and photo");
     setIsAdding(true);
     try {
       await api.graduates.add({
         name: newGrad.name,
         owner: newGrad.owner || "Fur Parent",
         image: newGrad.file,
         batch: newGrad.batch,
         story: newGrad.story || "Officially Protected!"
       });
       setNewGrad({ name: "", owner: "", story: "", file: null, batch: "2026" });
       refreshData();
     } finally {
       setIsAdding(false);
     }
  };

  const handleStatusChange = async (id: string, status: string) => {
     await api.appointments.updateStatus(id, status);
     refreshData();
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Approved":
        return <Badge className="bg-emerald-100 text-emerald-700 border-0"><CheckCircle className="w-3 h-3 mr-1" /> Approved</Badge>;
      case "Rejected":
        return <Badge className="bg-rose-100 text-rose-700 border-0"><XCircle className="w-3 h-3 mr-1" /> Declined</Badge>;
      default:
        return <Badge className="bg-amber-100 text-amber-700 border-0"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
    }
  };

  // Settings handlers
  const toggleDay = (dayIndex: number) => {
    if (!settings) return;
    const newDays = settings.availableDays.includes(dayIndex)
      ? settings.availableDays.filter(d => d !== dayIndex)
      : [...settings.availableDays, dayIndex].sort((a, b) => a - b);
    setSettings({ ...settings, availableDays: newDays });
  };

  const addBlockedDate = () => {
    if (!settings || !newBlockedDate) return;
    if (settings.blockedDates.includes(newBlockedDate)) {
      alert("This date is already blocked.");
      return;
    }
    setSettings({ 
      ...settings, 
      blockedDates: [...settings.blockedDates, newBlockedDate].sort() 
    });
    setNewBlockedDate("");
  };

  const removeBlockedDate = (date: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      blockedDates: settings.blockedDates.filter(d => d !== date)
    });
  };

  const addTimeSlot = () => {
    if (!settings || !newTimeSlot) return;
    if (settings.timeSlots.includes(newTimeSlot)) {
      alert("This time slot already exists.");
      return;
    }
    setSettings({
      ...settings,
      timeSlots: [...settings.timeSlots, newTimeSlot]
    });
    setNewTimeSlot("");
  };

  const removeTimeSlot = (slot: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      timeSlots: settings.timeSlots.filter(s => s !== slot)
    });
  };

  const saveSettings = async () => {
    if (!settings) return;
    setSavingSettings(true);
    try {
      await api.settings.update(settings);
      alert("Settings saved successfully!");
    } catch (error) {
      alert("Failed to save settings.");
    } finally {
      setSavingSettings(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <PawPrint className="w-6 h-6 text-primary" />
              Clinic Dashboard
            </h1>
            <p className="text-sm text-slate-500">Manage appointments, graduates, and clinic settings.</p>
          </div>
          <Button variant="outline" size="sm" onClick={refreshData} disabled={loading}>
            <RefreshCw className={cn("w-4 h-4 mr-2", loading && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </header>

      <div className="p-8 space-y-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white border-0 shadow-lg shadow-teal-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                   <CardTitle className="text-sm font-medium text-teal-100">Total Patients</CardTitle>
                   <Users className="w-5 h-5 text-teal-200" />
                </CardHeader>
                <CardContent>
                   <div className="text-3xl font-bold">{stats.totalPatients}</div>
                   <p className="text-xs text-teal-200">Served by COS Vet</p>
                </CardContent>
             </Card>
             <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white border-0 shadow-lg shadow-amber-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                   <CardTitle className="text-sm font-medium text-amber-100">Graduates</CardTitle>
                   <Award className="w-5 h-5 text-amber-200" />
                </CardHeader>
                <CardContent>
                   <div className="text-3xl font-bold">{stats.graduates}</div>
                   <p className="text-xs text-amber-200">Officially Protected 🎓</p>
                </CardContent>
             </Card>
             <Card className="bg-gradient-to-br from-sky-500 to-blue-600 text-white border-0 shadow-lg shadow-sky-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                   <CardTitle className="text-sm font-medium text-sky-100">Pending Bookings</CardTitle>
                   <Calendar className="w-5 h-5 text-sky-200" />
                </CardHeader>
                <CardContent>
                   <div className="text-3xl font-bold">{stats.appointmentsPending}</div>
                   <p className="text-xs text-sky-200">Awaiting your response</p>
                </CardContent>
             </Card>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 border-b border-slate-200 pb-4">
          <Button 
            variant={activeTab === "appointments" ? "default" : "ghost"}
            onClick={() => setActiveTab("appointments")}
          >
            <Calendar className="w-4 h-4 mr-2" /> Appointments
          </Button>
          <Button 
            variant={activeTab === "graduates" ? "default" : "ghost"}
            onClick={() => setActiveTab("graduates")}
          >
            <Award className="w-4 h-4 mr-2" /> Graduates
          </Button>
          <Button 
            variant={activeTab === "settings" ? "default" : "ghost"}
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="w-4 h-4 mr-2" /> Settings
          </Button>
        </div>

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Appointment Requests
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : appointments.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                  <p>No appointments yet.</p>
                  <p className="text-sm">Bookings from the website will appear here.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {appointments.map((apt) => (
                    <div key={apt.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                       <div className="flex gap-4 items-center">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-teal-100 to-sky-100 flex items-center justify-center font-bold text-teal-600 text-lg">
                             {apt.petName?.[0]?.toUpperCase() || "?"}
                          </div>
                          <div>
                             <div className="font-semibold text-slate-900">{apt.petName} <span className="text-slate-400 font-normal">({apt.species})</span></div>
                             <div className="text-sm text-slate-500">{apt.reason} • {apt.date} at {apt.time}</div>
                             <div className="text-xs text-slate-400">Owner: {apt.ownerName} • {apt.phone}</div>
                          </div>
                       </div>
                       <div className="flex gap-3 items-center">
                          {apt.status === "Pending" ? (
                             <>
                                <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600" onClick={() => handleStatusChange(apt.id, "Approved")}>
                                  <CheckCircle className="w-4 h-4 mr-1" /> Accept
                                </Button>
                                <Button size="sm" variant="outline" className="text-rose-600 border-rose-200 hover:bg-rose-50" onClick={() => handleStatusChange(apt.id, "Rejected")}>
                                  <XCircle className="w-4 h-4 mr-1" /> Decline
                                </Button>
                             </>
                          ) : (
                             getStatusBadge(apt.status)
                          )}
                       </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Graduates Tab */}
        {activeTab === "graduates" && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Add Graduate Form */}
            <Card className="border-slate-200 shadow-sm">
               <CardHeader>
                 <CardTitle className="text-lg flex items-center gap-2">
                   <Plus className="w-5 h-5 text-primary" />
                   Add New Graduate
                 </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center text-center cursor-pointer hover:bg-slate-50 hover:border-primary/50 transition-all relative">
                     <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleFileUpload} />
                     {newGrad.file ? (
                        <div className="relative h-32 w-32 rounded-xl overflow-hidden">
                           <img src={newGrad.file} alt="Preview" className="h-full w-full object-cover" />
                        </div>
                     ) : (
                        <>
                           <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-3">
                             <Upload className="w-7 h-7 text-teal-600" />
                           </div>
                           <p className="text-sm font-medium text-slate-600">Click to upload photo</p>
                           <p className="text-xs text-slate-400">JPG, PNG up to 5MB</p>
                        </>
                     )}
                  </div>
                  <Input placeholder="Pet Name *" value={newGrad.name} onChange={e => setNewGrad({...newGrad, name: e.target.value})} />
                  <Input placeholder="Owner Name" value={newGrad.owner} onChange={e => setNewGrad({...newGrad, owner: e.target.value})} />
                  <Input placeholder="Success Story (Optional)" value={newGrad.story} onChange={e => setNewGrad({...newGrad, story: e.target.value})} />
                  <Button className="w-full" onClick={handleAddGraduate} disabled={isAdding || !newGrad.name || !newGrad.file}>
                     {isAdding ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                     Add to Graduates Wall
                  </Button>
               </CardContent>
            </Card>

            {/* Graduates List */}
            <div className="lg:col-span-2">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    All Graduates ({graduates.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {graduates.map(g => (
                        <div key={g.id} className="group relative bg-slate-50 rounded-xl overflow-hidden hover:shadow-md transition-all">
                          <div className="aspect-square relative">
                            <Image 
                              src={g.image?.startsWith('/') || g.image?.startsWith('data:') ? g.image : '/placeholder-pet.jpg'} 
                              alt={g.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-3">
                            <div className="font-semibold text-slate-900">{g.name}</div>
                            <div className="text-xs text-slate-500">{g.owner} • Batch {g.batch}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && settings && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Available Days */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CalendarCheck className="w-5 h-5 text-primary" />
                  Available Days
                </CardTitle>
                <CardDescription>
                  Select which days of the week the clinic accepts appointments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {DAY_NAMES.map((day, index) => (
                    <button
                      key={day}
                      onClick={() => toggleDay(index)}
                      className={cn(
                        "p-3 rounded-lg border-2 text-sm font-medium transition-all",
                        settings.availableDays.includes(index)
                          ? "border-teal-500 bg-teal-50 text-teal-700"
                          : "border-slate-200 bg-white text-slate-400 hover:border-slate-300"
                      )}
                    >
                      {day.slice(0, 3)}
                      {settings.availableDays.includes(index) && (
                        <CheckCircle className="w-4 h-4 inline ml-2" />
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-4">
                  Currently open: {settings.availableDays.map(d => DAY_NAMES[d].slice(0, 3)).join(", ") || "None"}
                </p>
              </CardContent>
            </Card>

            {/* Blocked Dates */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CalendarX className="w-5 h-5 text-rose-500" />
                  Blocked Dates
                </CardTitle>
                <CardDescription>
                  Add specific dates when the clinic is closed (holidays, etc.).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    type="date" 
                    value={newBlockedDate} 
                    onChange={e => setNewBlockedDate(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={addBlockedDate} disabled={!newBlockedDate}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {settings.blockedDates.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-4">No blocked dates yet.</p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {settings.blockedDates.map(date => (
                      <div key={date} className="flex items-center justify-between bg-rose-50 text-rose-700 px-3 py-2 rounded-lg text-sm">
                        <span>{new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <button onClick={() => removeBlockedDate(date)} className="hover:text-rose-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Time Slots */}
            <Card className="border-slate-200 shadow-sm lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Available Time Slots
                </CardTitle>
                <CardDescription>
                  Manage the time slots available for booking.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="e.g. 09:00 AM" 
                    value={newTimeSlot} 
                    onChange={e => setNewTimeSlot(e.target.value)}
                    className="max-w-xs"
                  />
                  <Button onClick={addTimeSlot} disabled={!newTimeSlot}>
                    <Plus className="w-4 h-4 mr-2" /> Add Slot
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {settings.timeSlots.map(slot => (
                    <div key={slot} className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-lg text-sm font-medium">
                      <Clock className="w-4 h-4 text-slate-500" />
                      {slot}
                      <button onClick={() => removeTimeSlot(slot)} className="text-slate-400 hover:text-rose-500">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="lg:col-span-2">
              <Button 
                size="lg" 
                className="w-full md:w-auto" 
                onClick={saveSettings}
                disabled={savingSettings}
              >
                {savingSettings ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                Save Settings
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
