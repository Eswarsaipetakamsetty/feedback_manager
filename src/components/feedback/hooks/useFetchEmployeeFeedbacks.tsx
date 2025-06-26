import { useEffect, useState } from "react";
import { apiClient } from "../../../api";

const useFetchEmployeeFeedback = () => {
    const [feedbacks, setFeedbacks] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchFeedbacks = async () => {
        setLoading(true);
        try {
            const res = await apiClient.request("GET", "feedback/view/employee/")
            setFeedbacks(res);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to load feedbacks")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFeedbacks()
    }, [])

    return { feedbacks, loading, error }
};

export default useFetchEmployeeFeedback
