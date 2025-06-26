import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AddMembers.module.css";
import Cookies from "js-cookie";
import useTeam from "../hooks/useTeam";
import useAddMembers from "../hooks/useAddMembers";
import Navbar from "../../styledcomponents/navbar";
import LoadingSpinner from "../../styledcomponents/loadingSpinner";

const AddMembers = () => {
  const [emails, setEmails] = useState<string[]>([""]);
  const navigate = useNavigate();
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const userStr = Cookies.get("user_data");
    if (!userStr) return navigate("/login");
    try {
      const user = JSON.parse(userStr);
      setUserId(user.id);
    } catch {
      navigate("/login");
    }
  }, []);

  const { team, loading: teamLoading } = useTeam(userId);
  const { addMembers, loading, added, error } = useAddMembers();

  const handleChange = (index: number, value: string) => {
    const updated = [...emails];
    updated[index] = value;
    setEmails(updated);
  };

  const handleAddField = () => setEmails([...emails, ""]);
  const handleRemoveField = (index: number) =>
    setEmails(emails.filter((_, i) => i !== index));

  const handleSubmit = () => {
    if (team?.id) {
      const validEmails = emails.filter((email) => email.trim() !== "");
      addMembers(team.id, validEmails);
    }
  };

  if (teamLoading || !team) return <LoadingSpinner />;

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2>Add Members to Team: {team.name}</h2>

        <div className={styles.form}>
          {emails.map((email, idx) => (
            <div key={idx} className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => handleChange(idx, e.target.value)}
                className={styles.input}
              />
              {emails.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveField(idx)}
                  className={styles.removeButton}
                >
                  ❌
                </button>
              )}
            </div>
          ))}

          <button onClick={handleAddField} className={styles.addFieldButton}>
            ➕ Add Another Email
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? "Adding..." : "Submit"}
          </button>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {added.length > 0 && (
          <div className={styles.successBox}>
            <h4>✅ Members Invited:</h4>
            <ul>
              {added.map((m) => (
                <li key={m.id}>
                  Member ID: {m.employee} – Status: ⏳ Pending
                </li>
              ))}
            </ul>
            <button
              className={styles.redirectButton}
              onClick={() => navigate("/team")}
            >
              Go to Team
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AddMembers;
