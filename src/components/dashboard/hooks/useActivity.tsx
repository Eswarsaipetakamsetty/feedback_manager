// src/app/hooks/useActivity.ts
import { useEffect, useState } from "react";
import { apiClient } from "../../../api";

type Activity = {
  id: number;
  user: string;
  action: string;
  timestamp: string;
};

const useActivity = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await apiClient.request("GET", "/activity/");
        setActivities(res);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to fetch activities");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return { activities, loading, error };
};

export default useActivity;
