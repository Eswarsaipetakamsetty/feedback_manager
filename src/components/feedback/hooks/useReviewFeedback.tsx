import { apiClient } from "../../../api";
import { useState } from "react";

const useReviewFeedback = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const reviewFeedback = async (id:number, data: { score:number ; manager_comment:string}) => {
        setLoading(true)
        setError(null)

        try {
            const response = await apiClient.request("PATCH", `feedback/review/${id}/`, undefined, data)
            return response
        }
        catch (err:any) {
            setError(err.response?.data?.message || "Review failed")
        }
        finally {
            setLoading(false)
        }
    }

    return {reviewFeedback, loading, error}
}

export default useReviewFeedback