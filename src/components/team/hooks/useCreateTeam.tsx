import { useState } from "react";
import { apiClient } from "../../../api";

export interface CreateTeamPayload {
  name: string;
  member_emails: string[];
}

const useCreateTeam = () => {
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const createTeam = async (payload: CreateTeamPayload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.request("POST", "team/create/", undefined, payload);
      setTeam(response);
    } catch (err: any) {
      setError(err?.detail || "Failed to create team");
    } finally {
      setLoading(false);
    }
  };

  return { createTeam, loading, team, error };
};

export default useCreateTeam;
