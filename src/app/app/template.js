"use client"

import React from "react"
import { supabase } from "@/lib/supabase"
import { redirect } from "next/navigation"
import CenteredCircularProgress from "@/components/CenteredCircularProgress"
import Header from "@/components/Header";

export const userContext = React.createContext(null);

export default function AppTemplate({ children }) {

  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const getCurrentUserInfo = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        return redirect('/auth/login');
      }
      if (!data?.session) {
        return;
      }
      const profile = await supabase.from("profile").select("name").eq("id", data.session.user.id).single();
    
      setUser({
        email: data.session.user.email, 
        phone: data.session.user.phone,
        id: data.session.user.id,
        ...profile.data,
      });
    }
    getCurrentUserInfo();
  }, []);

  if (user) {
    return (
        <userContext.Provider value={user}>
            <Header />
            <div className="p-6">
                {children}
            </div>
        </userContext.Provider>
    );
  }

  return <CenteredCircularProgress/>;
}
