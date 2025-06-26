// src/app/hooks/useTeamCount.ts
import { useEffect, useState } from "react";
import { apiClient } from "../../../api";


const useFeedbackPendingReviewCount = () => {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await apiClient.request("GET", "feedback/pending/count/");
        setCount(response.feedback_pending_count)
        console.log(response)
      } catch (err: any) {
        setError(err?.response?.data?.detail || "Failed to fetch team count");
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  return { count, loading, error };
};

export default useFeedbackPendingReviewCount;
