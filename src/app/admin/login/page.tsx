"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { KeyRound, Loader2 } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock Auth delay
    await new Promise(r => setTimeout(r, 1000));

    if (username === "admin" && password === "cosvet123") {
      // Set session (mock)
      if (typeof window !== "undefined") {
        document.cookie = "admin_session=true; path=/";
      }
      router.push("/admin");
    } else {
      alert("Invalid credentials (try: admin / cosvet123)");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <FadeIn>
        <Card className="w-full max-w-md border-slate-700 bg-slate-800 text-white shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary mb-2">
              <KeyRound className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <CardDescription className="text-slate-400">
              COS Veterinary Clinic Management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input 
                  placeholder="Username" 
                  className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Input 
                  type="password" 
                  placeholder="Password" 
                  className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button className="w-full font-bold" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : "Enter Dashboard"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
