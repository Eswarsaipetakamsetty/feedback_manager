import { useEffect, useState } from "react";
import { apiClient } from "../../../api";

const useFetchFeedbacks = () => {
    const [feedbacks, setFeedbacks] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchFeedbacks = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await apiClient.request("GET", "feedback/view/")
            setFeedbacks(response)
        } catch (err:any) {
            setError(err.response?.data?.detail || "Failed to fetch feedbacks")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFeedbacks();
    }, [])

    return {feedbacks, loading, error, refresh: fetchFeedbacks}
}

export default useFetchFeedbacks