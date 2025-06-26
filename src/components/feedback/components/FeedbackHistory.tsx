import { useState } from "react";
import styles from "../styles/FeedbackHistory.module.css";
import Cookies from "js-cookie";
import useFetchEmployeeFeedback from "../hooks/useFetchEmployeeFeedbacks";
import LoadingSpinner from "../../styledcomponents/loadingSpinner";
import Navbar from "../../styledcomponents/navbar";

const FeedbackHistory = () => {
  const userStr = Cookies.get("user_data");
  const user = userStr ? JSON.parse(userStr) : null;

  const {
    feedbacks: employeeFeedbacks,
    loading: employeeLoading,
    error: employeeError,
  } = useFetchEmployeeFeedback();

  const [selectedFeedback, setSelectedFeedback] = useState<any | null>(null);

  if (!user) return <p>Please login</p>;

  // -- EMPLOYEE VIEW --
  if (employeeLoading) return <LoadingSpinner />;
  if (employeeError) return <p className={styles.error}>{employeeError}</p>;

  return (
    <>
      <Navbar />
      <div className={styles.feedbackContainer}>
        <h2 className={styles.heading}>My Feedbacks</h2>

        <div className={styles.cardList}>
          {employeeFeedbacks.map((fb) => (
            <div
              key={fb.id}
              className={styles.card}
              onClick={() => setSelectedFeedback(fb)}
            >
              {new Date(fb.created_at).toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          ))}
        </div>

        {selectedFeedback && (
          <div className={styles.detailView}>
            <div className={styles.left}>
              <h4>Your Feedback</h4>
              <p><strong>Thoughts:</strong> {selectedFeedback.thoughts}</p>
              <p><strong>Further Action:</strong> {selectedFeedback.further_action}</p>
              <p><strong>Sentiment:</strong> {selectedFeedback.sentiment}</p>
            </div>
            <div className={styles.right}>
              <h4>Manager's Review</h4>
              {selectedFeedback.reviewed ? (
                <>
                  <p><strong>Score:</strong> {selectedFeedback.score}</p>
                  <p><strong>Comment:</strong> {selectedFeedback.manager_comment}</p>
                </>
              ) : (
                <p><em>Not yet reviewed</em></p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FeedbackHistory;
