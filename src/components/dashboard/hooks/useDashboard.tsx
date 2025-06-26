import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { apiClient } from "../../../api";

const useDashboard = () => {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const cachedUser = Cookies.get("user_data")
        if (cachedUser) {
            try {
                setUser(JSON.parse(cachedUser))
                setLoading(false)
                return
            }
            catch {
                Cookies.remove("user_data")
            }
        }
        
        const getUser = async () => {
            setLoading(true)

            try {
                const userData = await apiClient.request("GET", "auth/user/")
                Cookies.set("user_data", JSON.stringify(userData), {
                    expires: 1,
                    secure: true,
                    sameSite: "Lax",
                })

                setUser(userData)
            }

            catch (err:any){
                setError(err.response?.data?.message || "Failed to fetch user")
            } finally {
                setLoading(false)
            }
        }

        getUser()
    }, [])

    return {user, loading, error}
}

export default useDashboard