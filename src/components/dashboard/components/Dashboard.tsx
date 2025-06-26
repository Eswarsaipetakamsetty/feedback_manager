import { useNavigate } from "react-router-dom";
import styles from "../styles/Dashboard.module.css";
import Navbar from "../../styledcomponents/navbar";
import useDashboard from "../hooks/useDashboard";
import LoadingSpinner from "../../styledcomponents/loadingSpinner";
import useTeamCount from "../../team/hooks/useTeamCount";
import useFeedbackCount from "../../feedback/hooks/useFeedbackCount";
import useFeedbackPendingReviewCount from "../../feedback/hooks/useFeedbackReviewPendingCount";
import useActivity from "../hooks/useActivity";

type StatCard = {
  title: string;
  count: number;
  icon: string;
  route: string;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading, error } = useDashboard();
  const {data: teamData} = useTeamCount()
  const {count} = useFeedbackCount()
  const {count: pendingCount} = useFeedbackPendingReviewCount()
  const {activities} = useActivity()

  const isManager = user?.is_manager;

  const stats: StatCard[] = [
    ...(isManager
      ? [{ title: "Pending Reviews", count: pendingCount ?? 0, icon: "📝", route: "/reviewfeedback" }]
      : []),
    { title: "My Teams", count: teamData?.total_teams ?? 0, icon: "👥", route: "/team" },
    { title: "Submit Feedback", count: count ?? 0, icon: "💬", route: "/write-feedback" },
    { title: "Reports", count: 3, icon: "📊", route: "/reports" },
  ];

  if (loading) return <LoadingSpinner />;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!user) return <p className={styles.error}>Please log in</p>;

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.greeting}>
          Welcome back, {user.first_name || user.username}!
        </h1>

        <div className={styles.statsGrid}>
          {stats.map((s) => (
            <div
              key={s.title}
              className={styles.statCard}
              onClick={() => navigate(s.route)}
            >
              <div className={styles.icon}>{s.icon}</div>
              <div>
                <h3>{s.count}</h3>
                <p>{s.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.shortcutSection}>
          <h2>Quick Actions</h2>
          <div className={styles.shortcuts}>
            <button onClick={() => navigate("/write-feedback")}>📝 Submit Feedback</button>
            {isManager && (
              <button onClick={() => navigate("/reviewfeedback")}>📩 Review Feedback</button>
            )}
            <button onClick={() => navigate("/team")}>👥 View Team</button>
            {isManager && (
              <button onClick={() => navigate("/createteam")}>➕ Create Team</button>
            )}
          </div>
        </div>

        <div className={styles.activitySection}>
          <h2>Recent Activity</h2>
          {activities.length === 0 ? (
            <p className={styles.noActivity}>No recent activity available.</p>
          ) : (
            <ul>
              {activities.slice(0, 5).map((activity) => (
                <li key={activity.id}>
                  <strong>{activity.user}</strong> {activity.action} —{" "}
                  {new Date(activity.timestamp).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </>
  );
};

export default Dashboard;
