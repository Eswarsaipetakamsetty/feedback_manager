import { useState } from "react";
import { apiClient } from "../../../api";
import Cookies from "js-cookie";

const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async ( data: {
        email: string;
        password: string;
    }
    ) => {
        setLoading(true)
        setError(null)

        try {
            const response = await apiClient.request("POST", "auth/login/", undefined, data)
            const access_token = response.access
            const refresh_token = response.refresh

            if (access_token) {
                Cookies.set("access_token", access_token, {
                    expires: 7,
                    secure: true,
                    sameSite: "Lax",
                })
            }

            if (refresh_token) {
                Cookies.set("refresh_token", refresh_token, {
                    expires: 7,
                    secure: true,
                    sameSite: "Lax",
                })
            }

            return response
        } catch(err: any) {
            setError(err.response?.data?.message || "Login failed")
        } finally {
            setLoading(false)
        }
    }

    return {handleLogin, loading, error}
}

export default useLogin