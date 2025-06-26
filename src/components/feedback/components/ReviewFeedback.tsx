import { useState } from "react";
import useReviewFeedback from "../hooks/useReviewFeedback";
import useFetchFeedbacks from "../hooks/useFetchFeedbacks";
import styles from "../styles/ReviewFeedback.module.css";
import LoadingSpinner from "../../styledcomponents/loadingSpinner";
import Navbar from "../../styledcomponents/navbar";

const ReviewFeedback = () => {
  const { feedbacks, loading, error, refresh } = useFetchFeedbacks();
  const { reviewFeedback, loading: reviewLoading } = useReviewFeedback();

  const [scoreMap, setScoreMap] = useState<Record<number, number>>({});
  const [commentMap, setCommentMap] = useState<Record<number, string>>({});

  const handleSubmit = async (id: number) => {
    const score = scoreMap[id];
    const manager_comment = commentMap[id];

    if (score === undefined || manager_comment.trim() === "") return;

    try {
      await reviewFeedback(id, { score, manager_comment });
      await refresh();
      setScoreMap((prev) => ({ ...prev, [id]: 0 }));
      setCommentMap((prev) => ({ ...prev, [id]: "" }));
    } catch (err) {
      console.error("Review failed:", err);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className={styles.error}>{error}</p>;

  const unreviewed = feedbacks.filter((fb) => !fb.reviewed);

  return (
    <>
      <Navbar />
      <div className={styles.feedbackContainer}>
      <h2 className={styles.heading}>Manager Review Panel</h2>

      {unreviewed.length === 0 ? (
        <p className={styles.message}>🎉 All feedback has been reviewed!</p>
      ) : (
        unreviewed.map((fb) => (
          <div key={fb.id} className={styles.managerCard}>
            <p><strong>Employee:</strong> {fb.employee}</p>
            <p><strong>Thoughts:</strong> {fb.thoughts}</p>
            <p><strong>Sentiment:</strong> {fb.sentiment}</p>
            <p><strong>Further Action:</strong> {fb.further_action}</p>

            <input
              type="number"
              placeholder="Score (0–10)"
              value={scoreMap[fb.id] || ""}
              onChange={(e) =>
                setScoreMap({ ...scoreMap, [fb.id]: Number(e.target.value) })
              }
            />
            <textarea
              placeholder="Manager comment"
              value={commentMap[fb.id] || ""}
              onChange={(e) =>
                setCommentMap({ ...commentMap, [fb.id]: e.target.value })
              }
            />
            <button
              onClick={() => handleSubmit(fb.id)}
              disabled={reviewLoading}
            >
              {reviewLoading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        ))
      )}
    </div>
    </>
  );
};

export default ReviewFeedback;
