import { useNavigate } from "react-router-dom"
import styles from "./styles/feedbackSubmitSuccessful.module.css"


const FeedbackSubmitSuccessful = () => {

    const navigate = useNavigate()
    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupCard}>
            <div className={styles.popupHeader}>🎉 Feedback Submitted Successfully!</div>
            <p className={styles.popupMessage}>
                Your feedback has been saved and is ready for review.
            </p>
            <div className={styles.popupActions}>
                <button onClick={() => navigate("/dashboard")} className={styles.popupBtn}>
                Go to Dashboard
                </button>
                <button onClick={() => navigate("/feedback/history")} className={styles.popupBtnOutline}>
                View Feedback History
                </button>
            </div>
            </div>
        </div>
    )
}

export default FeedbackSubmitSuccessful