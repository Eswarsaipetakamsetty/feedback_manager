import { useState } from "react";
import { apiClient } from "../../../api";

type FeedbackData = {
  //employee: number;
  thoughts: string;
  further_action: string;
  sentiment: "positive" | "neutral" | "negative";
}

const useSubmitFeedback = () => {
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [response, setResponse] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    const submitFeedback = async (data: FeedbackData) => {
        setLoading(true)
        setError(null)
        setSubmitted(false)
        try {
            const res = await apiClient.request("POST", "feedback/create/", undefined, data)
            if (res) {
                setResponse(res)
                setSubmitted(true)
            }
        } catch (err:any) {
            setError(err.response?.data?.detail || "Submission failed")
        } finally {
            setLoading(false)
        }
    }

    return {submitFeedback, loading, submitted, response, error}
}

export default useSubmitFeedback