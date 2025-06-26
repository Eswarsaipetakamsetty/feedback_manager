import { useState } from "react";
import { apiClient } from "../../../api";

const useRegister = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleRegister = async ( data: {
        email: string;
        username: string;
        firstname: string;
        lastname: string;
        password: string;
        password2: string;
    }
    ) => {
        setLoading(true)
        setError(null)

        try {
            const response = await apiClient.request("POST", "auth/register/", undefined, data)
            return response
        } catch(err: any) {
            setError(err.response?.data?.message || "Registration failed")
        } finally {
            setLoading(false)
        }
    }

    return {handleRegister, loading, error}
}

export default useRegister