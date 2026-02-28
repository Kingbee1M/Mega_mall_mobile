import { supabase } from "@/lib/superbase";
import { sendGreetingIfNewUser } from "@/services/notificationServices";
import { Session, User } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export interface Profile {
  user_id: string;
  userName: string;
  firstName: string;
  lastName: string | null;
  email: string;
  role: 'seller' | 'buyer';
  profilePicture: string | null;
  phone: number;
  new_user: boolean;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;          // Supabase auth user
  profile: Profile | null;    // Your custom users table row
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  // 1️⃣ Handle Supabase session and user state
  useEffect(() => {
    const initSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);
    };

    initSession();

    // Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // 2️⃣ Fetch profile whenever session.user changes
  useEffect(() => {
    if (!session?.user) {
      setProfile(null);
      return;
    }

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("mega-mall-users")
        .select("*")
        .eq("user_id", session.user!.id)
        .single();

      if (!error && data) {
        setProfile(data);

        // Send greeting if the user is new
        if (data.new_user) {
          await sendGreetingIfNewUser(data.user_id);
        }
      } else {
        console.error("Profile fetch error:", error?.message);
        setProfile(null);
      }
    };

    fetchProfile();
  }, [session]);

  const logout = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!session, user, profile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};