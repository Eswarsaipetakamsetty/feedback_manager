import { useNavigate } from "react-router-dom";
import styles from "./Root.module.css";
import Navbar from "../styledcomponents/navbar";

const Root = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Welcome to Feedback Manager</h1>
          <p className={styles.subtitle}>
            A seamless platform to manage, submit, and review team feedback efficiently.
          </p>

          <div className={styles.buttons}>
            <button onClick={() => navigate("/login")} className={styles.primaryBtn}>
              Login
            </button>
            <button onClick={() => navigate("/register")} className={styles.secondaryBtn}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Root;
