import { useState, useEffect } from "react";
import { apiClient } from "../../../api";

export type Feedback = {
  id: number;
  manager: string;
  employee: number;
  thoughts: string;
  further_action: string;
  sentiment: string;
  reviewed: boolean;
  score: number;
  manager_comment: string;
  created_at: string;
  updated_at: string;
};

const useReviewedFeedbacks = () => {
  const [items, setItems] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviewed = async () => {
      try {
        const res = await apiClient.request("GET", "feedback/reviewed/");
        setItems(res);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Could not fetch reviewed feedbacks.");
      } finally {
        setLoading(false);
      }
    };
    fetchReviewed();
  }, []);

  return { items, loading, error };
};

export default useReviewedFeedbacks;
