import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useTeam from "../hooks/useTeam";
import LoadingSpinner from "../../styledcomponents/loadingSpinner";
import styles from "../styles/Team.module.css";
import Navbar from "../../styledcomponents/navbar";

const Team = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState<number | null>(null);
    const [isManager, setIsManager] = useState<boolean>(false);
    const [user, setUser] = useState<string | null>(null)

    useEffect(() => {
        const userData = Cookies.get("user_data");
        if (userData) {
        try {
            const parsed = JSON.parse(userData);
            setUserId(parsed.id);
            setIsManager(parsed.is_manager);
            setUser(parsed.username)
        } catch {
            navigate("/login");
        }
        } else {
        navigate("/login");
        }
    }, [navigate]);

    const { team, loading, error, canJoinTeam, joinTeam } = useTeam(userId);

    if (loading) return <LoadingSpinner />;
    if (error) return <p className={styles.error}>{error}</p>;
    if (!team) return <p className={styles.message}>No team data available.</p>;

    return (
        <>
        <Navbar />
        <div className={styles.container}>
            <div className={styles.header}>
            <h2 className={styles.teamName}>🏢 Team: <span>{team.name}</span></h2>
            <p className={styles.manager}>
            <strong>Manager:</strong>{" "}
            <button
                className={styles.managerButton}
                onClick={() => {
                const managerMember = team.members.find(
                    (m: any) => m.employee_details?.is_manager
                );
                if (managerMember?.employee_details?.email) {
                    navigate(`/profile/${managerMember.employee_details.email}`);
                }
                }}
            >
                {team.manager}
            </button>
            </p>
            </div>

            {isManager &&  team.manager == user && (
            <button
                className={styles.joinButton}
                onClick={() => navigate("/team/add-members")}
            >
                ➕ Add Members
            </button>
            )}

            {canJoinTeam && team.manager != user && (
            <button className={styles.joinButton} onClick={() => joinTeam(team.id)}>
                🚀 Join Team
            </button>
            )}

            <h3 className={styles.subheading}>👥 Team Members</h3>
            <ul className={styles.memberList}>
            {Array.isArray(team.members) &&
                team.members.map((member: any) => (
                <li
                    key={member.id}
                    className={styles.memberCard}
                    onClick={() =>
                    member.employee_details?.email &&
                    navigate(`/profile/${member.employee_details.email}`)
                    }
                >
                    <button className={styles.memberButton}>
                    <div className={styles.memberInfo}>
                        <span className={styles.username}>
                        {member.employee_details?.username}
                        </span>
                        {isManager && team.manager == user && (
                        <div className={styles.meta}>
                            <span className={styles.status}>
                            {member.is_accepted ? "✅ Accepted" : "⏳ Pending"}
                            </span>
                            <span className={styles.date}>
                            Invited At: {new Date(member.invited_at).toLocaleString()}
                            </span>
                        </div>
                        )}
                    </div>
                    </button>
                </li>
                ))}
            </ul>
        </div>
        </>
    );
};

export default Team;
