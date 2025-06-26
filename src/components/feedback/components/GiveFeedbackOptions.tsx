import { useNavigate } from "react-router-dom";
import styles from "../styles/GiveFeedbackOptions.module.css"
import selfImage from "../../../assets/self.png"
import otherImage from "../../../assets/other.png"
import Navbar from "../../styledcomponents/navbar";

const GiveFeedbackOptions = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: "Self",
      img: selfImage,
      route: "/write-feedback",
    },
    {
      title: "Others",
      img: otherImage,
      route: "/others/write/review",
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

export default GiveFeedbackOptions;
