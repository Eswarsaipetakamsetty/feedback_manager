import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useCreateTeam from "../hooks/useCreateTeam";
import styles from "../styles/CreateTeam.module.css";
import Navbar from "../../styledcomponents/navbar";

const CreateTeam = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [emails, setEmails] = useState<string[]>([""]);
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    const userStr = Cookies.get("user_data");
    if (!userStr) return navigate("/login");
    try {
      const user = JSON.parse(userStr);
      if (!user.is_manager) return navigate("/dashboard");
      console.log(isManager)
      setIsManager(true);
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  const { createTeam, loading, team, error } = useCreateTeam();

  const handleChangeEmail = (idx: number, val: string) => {
    const arr = [...emails];
    arr[idx] = val;
    setEmails(arr);
  };

  const handleAddEmail = () => setEmails([...emails, ""]);
  const handleRemoveEmail = (idx: number) => setEmails(emails.filter((_, i) => i !== idx));

  const handleSubmit = () => {
    if (!name.trim()) return;
    const payload = { name: name.trim(), member_emails: emails.filter(e => e.trim() !== "") };
    createTeam(payload);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2>Create a New Team</h2>

        <div className={styles.form}>
          <label className={styles.label}>Team Name</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter team name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <label className={styles.label}>Add Members (by email)</label>
          {emails.map((email, idx) => (
            <div key={idx} className={styles.emailGroup}>
              <input
                type="email"
                className={styles.input}
                placeholder="member@example.com"
                value={email}
                onChange={e => handleChangeEmail(idx, e.target.value)}
              />
              {emails.length > 1 && (
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => handleRemoveEmail(idx)}
                >
                  ❌
                </button>
              )}
            </div>
          ))}
          <button type="button" className={styles.addBtn} onClick={handleAddEmail}>
            ➕ Add Another Email
          </button>

          <button
            type="button"
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating…" : "Create Team"}
          </button>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {team && (
          <div className={styles.successCard}>
            <h3>✅ Team "{team.name}" Created</h3>
            <button className={styles.goBtn} onClick={() => navigate("/team")}>
              View Team
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateTeam;
