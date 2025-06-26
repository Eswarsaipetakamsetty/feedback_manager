import { useEffect, useState } from "react";
import styles from "../styles/SubmitFeedback.module.css";
import useSubmitFeedback from "../hooks/useSubmitFeedback";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import FeedbackSubmitSuccessful from "../../styledcomponents/feedbackSubmitSuccessful";
import Navbar from "../../styledcomponents/navbar";

const SubmitFeedback = () => {
    type Sentiment = "positive" | "neutral" | "negative";
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const [employee, setEmployee] = useState<number | null>(null);
    const [thoughts, setThoughts] = useState("");
    const [hasFurtherAction, setHasFurtherAction] = useState(false);
    const [furtherAction, setFurtherAction] = useState("");
    const [sentiment, setSentiment] = useState<Sentiment>("positive");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const { submitFeedback, loading, submitted, error } = useSubmitFeedback();

    useEffect(() => {
        const userStr = Cookies.get("user_data");
        if (!userStr) return navigate("/login");

        try {
        const user = JSON.parse(userStr);
        setEmployee(user.id);
        } catch {
        navigate("/login");
        }
    }, []);

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    const handleSubmit =  () => {
        if (employee == null) return;
        submitFeedback({
        thoughts,
        further_action: hasFurtherAction ? furtherAction : "",
        sentiment, 
        });

        setShowSuccessPopup(true)
    };

    const stepTitles = ["Employee", "Thoughts", "Action", "Sentiment", "Review"];
    const progress = (step / stepTitles.length) * 100;

  return (
    <>
        < Navbar/>
        <div className={styles.container}>
        <h2 className={styles.heading}>Submit Feedback</h2>

        {/* Wizard Header */}
        <div className={styles.wizardSteps}>
            {stepTitles.map((title, idx) => (
            <div
                key={idx}
                className={`${styles.stepItem} ${step === idx + 1 ? styles.active : ""}`}
            >
                {idx + 1}. {title}
            </div>
            ))}
        </div>
        <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        </div>

        {/* Step Content */}
        <div className={styles.step}>
            {step === 1 && (
            <>
                <p><strong>Employee:</strong> {employee ?? "Loading..."}</p>
            </>
            )}

            {step === 2 && (
            <>
                <label className={styles.label}>Feedback Thoughts</label>
                <textarea
                className={styles.textarea}
                value={thoughts}
                onChange={(e) => setThoughts(e.target.value)}
                placeholder="What went well?"
                />
            </>
            )}

            {step === 3 && (
            <>
                <label className={styles.label}>Any Further Action?</label>
                <div className={styles.actionBoxContainer}>
                <div
                    className={`${styles.actionBox} ${hasFurtherAction ? styles.activeBox : ""}`}
                    onClick={() => setHasFurtherAction(true)}
                >
                    <div className={styles.icon}>✅</div> Yes
                </div>
                <div
                    className={`${styles.actionBox} ${!hasFurtherAction ? styles.activeBox : ""}`}
                    onClick={() => setHasFurtherAction(false)}
                >
                    <div className={styles.icon}>❌</div> No
                </div>
                </div>
                {hasFurtherAction && (
                <textarea
                    className={styles.textarea}
                    value={furtherAction}
                    onChange={(e) => setFurtherAction(e.target.value)}
                    placeholder="Describe next steps..."
                />
                )}
            </>
            )}

            {step === 4 && (
            <>
                <label className={styles.label}>Sentiment</label>
                <div className={styles.sentimentBoxes}>
                {["positive", "neutral", "negative"].map((s) => (
                    <div
                    key={s}
                    className={`${styles.sentimentBox} ${sentiment === s ? styles.activeBox : ""}`}
                    onClick={() => setSentiment(s as Sentiment)}
                    >
                    {s === "positive" && "😊 Positive"}
                    {s === "neutral" && "😐 Neutral"}
                    {s === "negative" && "😞 Negative"}
                    </div>
                ))}
                </div>
            </>
            )}

            {step === 5 && (
            <>
                <h3>Review Your Feedback</h3>
                <ul className={styles.reviewList}>
                <li><strong>Employee:</strong> {employee}</li>
                <li><strong>Thoughts:</strong> {thoughts}</li>
                <li><strong>Further Action:</strong> {hasFurtherAction ? furtherAction : "None"}</li>
                <li><strong>Sentiment:</strong> {sentiment}</li>
                </ul>
                {error && <p className={styles.error}>{error}</p>}
                {submitted &&(
                <div className={styles.result}>
                    <h4>Feedback Submitted ✅</h4>
                </div>
                
                )}
            </>
            )}

            {/* Navigation Buttons */}
            <div className={styles.navButtons}>
            {step > 1 ? (
                <button className={styles.navButton} onClick={handleBack}>Back</button>
            ) : <span />}
            {step < 5 ? (
                <button
                className={styles.navButton}
                onClick={handleNext}
                disabled={step === 2 && !thoughts}
                >
                Next
                </button>
            ) : (
                <button
                className={styles.navButton}
                onClick={handleSubmit}
                disabled={loading}
                >
                {loading ? "Submitting..." : "Submit"}
                </button>
            )}
            </div>
            {showSuccessPopup && < FeedbackSubmitSuccessful />}
        </div>
        </div>
    </>
  );
};

export default SubmitFeedback;
