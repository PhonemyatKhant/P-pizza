import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Profile } from "@/assets/types";

type authData = {
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  profile: Profile | null;
};

const AuthContext = createContext<authData>({
  session: null,
  loading: true,
  isAdmin: false,
  profile: null,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUserSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        // fetch profile
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setProfile(data || null);
      }
      setLoading(false);
    };
    getUserSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, loading, isAdmin: profile?.group === "ADMIN", profile }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
