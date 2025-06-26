import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useUserByEmail from "../hooks/useUserByEmail";
import LoadingSpinner from "../../styledcomponents/loadingSpinner";
import styles from "../styles/Profile.module.css";
import Navbar from "../../styledcomponents/navbar";
import profileImage from "../../../assets/default_avathar.png"

const Profile = () => {
  const { email: paramEmail } = useParams<{ email: string }>();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(paramEmail || null);

  useEffect(() => {
    if (!paramEmail) {
      const userData = Cookies.get("user_data");
      if (userData) {
        try {
          const parsed = JSON.parse(userData);
          setEmail(parsed.email);
          navigate(`/profile/${parsed.email}`, { replace: true });
        } catch {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    }
  }, [paramEmail, navigate]);

  console.log(email)
  const { user, loading, error } = useUserByEmail(email);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!user) return <p className={styles.message}>User not found</p>;

  return (
    <>
    < Navbar />
        <div className={styles.container}>
        <div className={styles.card}>
            <img
            src={user.profile_photo || profileImage}
            alt="Profile"
            className={styles.avatar}
            />
            <h2 className={styles.name}>
            {user.first_name} {user.last_name}
            </h2>
            <p className={styles.email}>{user.email}</p>
            <p className={styles.role}>
            {user.is_manager ? "🏅 Manager" : "👤 Employee"}
            </p>
        </div>
        </div>
    </>
  );
};

export default Profile;
