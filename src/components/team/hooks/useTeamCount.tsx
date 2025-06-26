// src/app/hooks/useTeamCount.ts
import { useEffect, useState } from "react";
import { apiClient } from "../../../api";

type TeamSummary = {
  team_id: number;
  team_name: string;
  total_accepted_members: number;
};

type TeamCountResponse = {
  total_teams: number;
  teams: TeamSummary[];
};

const useTeamCount = () => {
  const [data, setData] = useState<TeamCountResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamCount = async () => {
      try {
        const response = await apiClient.request("GET", "team/count/");
        setData(response);
      } catch (err: any) {
        setError(err?.response?.data?.detail || "Failed to fetch team count");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamCount();
  }, []);

  return { data, loading, error };
};

export default useTeamCount;
