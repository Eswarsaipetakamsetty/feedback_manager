import { useNavigate } from "react-router-dom";
import styles from "./styles/navbar.module.css"

type LeftSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  user: any;
};

const LeftSidebar = ({ isOpen, onClose, user }: LeftSidebarProps) => {
  const navigate = useNavigate();

  const navLinks = user?.is_manager
    ? ["dashboard", "feedback", "reviewfeedback", "goals", "team", "createteam", "tasks", "survey", "polls", "reviews"]
    : ["dashboard", "feedback", "goals", "team", "tasks", "survey", "polls"];

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose}></div>}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.sidebarHeader}>
          <h3>Menu</h3>
          <button onClick={onClose} className={styles.closeBtn}>×</button>
        </div>
        <ul className={styles.navList}>
          {navLinks.map((link) => (
            <li key={link}>
              <button
                onClick={() => {
                  navigate(`/${link}`);
                  onClose();
                }}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default LeftSidebar;
