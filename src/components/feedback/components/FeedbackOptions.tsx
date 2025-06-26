import Navbar from "../../styledcomponents/navbar";
import styles from "../styles/FeedbackOptions.module.css"
import { useNavigate } from "react-router-dom";
import historyImage from "../../../assets/history.png"
import giveImage from "../../../assets/give.png"
import requestImage from "../../../assets/request.png"

const FeedbackOptions = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: "Give Feedback",
      img: giveImage,
      route: "/give-feedback",
    },
    {
      title: "Request Feedback",
      img: requestImage,
      route: "/request-feedback",
    },
    {
      title: "Feedback History",
      img: historyImage,
      route: "/feedback-history",
    },
  ];

  return (
    <>
        < Navbar />
        <div className={styles.container}>
        {options.map((opt) => (
            <div
            key={opt.title}
            className={styles.box}
            onClick={() => navigate(opt.route)}
            >
            <img src={opt.img} alt={opt.title} className={styles.image} />
            <div className={styles.title}>{opt.title}</div>
            </div>
        ))}
        </div>
    </>
  );
};

export default FeedbackOptions;
