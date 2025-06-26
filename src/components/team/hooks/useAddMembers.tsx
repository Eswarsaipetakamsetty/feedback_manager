import { useState } from "react";
import { apiClient } from "../../../api"; // adjust path based on your structure

const useAddMembers = () => {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addMembers = async (teamId: number, emails: string[]) => {
    setLoading(true);
    setError(null);
    try {
        const payload = {members: emails}
        const res = await apiClient.request("POST", `team/add_members/${teamId}/`, undefined,
            payload
      );
      setAdded(res.added_members || []);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to add members");
    } finally {
      setLoading(false);
    }
  };

  return { addMembers, loading, added, error };
};

export default useAddMembers;
