import { useState } from "react";
import useReviewedFeedbacks from "../hooks/useReviewedFeedbacks";
import type { Feedback } from "../hooks/useReviewedFeedbacks";
import styles from "../styles/ReviewedFeedbacks.module.css";
import LoadingSpinner from "../../styledcomponents/loadingSpinner";
import Navbar from "../../styledcomponents/navbar";

const ReviewedFeedbacks = () => {
  const { items, loading, error } = useReviewedFeedbacks();
  const [selected, setSelected] = useState<Feedback | null>(null);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className={styles.error}>{error}</p>;

  if (items.length === 0) return <p className={styles.message}>No reviewed feedbacks found.</p>;

  return (
    <>
        < Navbar />
        <div className={styles.container}>
        <h2 className={styles.title}>Reviewed Feedbacks</h2>
        <div className={styles.listContainer}>
            <ul className={styles.dateList}>
            {items.map((fb) => {
                const dateStr = new Date(fb.updated_at).toLocaleDateString("en-IN", {
                day: "numeric", month: "short", year: "numeric"
                });
                return (
                <li
                    key={fb.id}
                    onClick={() => setSelected(fb)}
                    className={selected?.id === fb.id ? styles.activeDate : ""}
                >
                    {dateStr}
                </li>
                );
            })}
            </ul>

            <div className={styles.detailPanel}>
            {selected ? (
                <>
                <div className={styles.section}>
                    <h3>Feedback Details</h3>
                    <p><strong>Employee ID:</strong> {selected.employee}</p>
                    <p><strong>Thoughts:</strong> {selected.thoughts}</p>
                    <p><strong>Sentiment:</strong> {selected.sentiment}</p>
                    <p><strong>Further Action:</strong> {selected.further_action || "None"}</p>
                </div>

                <div className={styles.section}>
                    <h3>Your Review</h3>
                    <p><strong>Score:</strong> {selected.score}</p>
                    <p><strong>Comment:</strong> {selected.manager_comment}</p>
                    <p className={styles.timestamp}>
                    Updated at: {new Date(selected.updated_at).toLocaleString("en-IN")}
                    </p>
                </div>
                </>
            ) : (
                <p className={styles.placeholder}>Select a date to view feedback details...</p>
            )}
            </div>
        </div>
        </div>
    </>
  );
};

export default ReviewedFeedbacks;
