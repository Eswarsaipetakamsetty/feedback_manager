import { useCallback, useEffect, useState } from "react";
import { apiClient } from "../../../api";

const useTeam = (userId: number | null) => {
    const [team, setTeam] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const refreshTeam = useCallback(async () => {
        setLoading(true);
        try {
        const data = await apiClient.request("GET", "team/viewteam/");
        setTeam(data);
        } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch team");
        } finally {
        setLoading(false);
        }
    }, []);

    const joinTeam = async (teamId: number) => {
        await apiClient.request("PATCH", `team/accept/${teamId}/`);
        await refreshTeam();
    };

    useEffect(() => {
        refreshTeam();
    }, [refreshTeam]);

    const isUserInTeam = !!(
        userId &&
        team?.members?.some(
        (m: any) => m.employee_details?.id === userId && m.is_accepted
        )
    );

    const isUserManager = !!(
        userId &&
        team?.manager_id === userId
    );

    const canJoinTeam = !isUserInTeam && !isUserManager;

    return {
        team,
        loading,
        error,
        isUserInTeam,
        isUserManager,
        canJoinTeam,
        joinTeam,
        refreshTeam,
    };
};

export default useTeam;
