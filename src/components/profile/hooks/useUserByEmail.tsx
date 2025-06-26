import { useEffect, useState } from "react";
import { apiClient } from "../../../api";

export interface UserProfile {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_manager: boolean;
  manager_id: number | null;
  profile_photo: string;
}

const useUserByEmail = (email: string | null) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const data = await apiClient.request("GET", `auth/user/by_email/?email=${email}`);
        setUser(data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [email]);

  return { user, loading, error };
};

export default useUserByEmail;
