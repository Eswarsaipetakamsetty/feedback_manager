import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./styles/navbar.module.css"
import defaultImage from "../../assets/default_avathar.png"
import LeftSidebar from "./leftSideBar";

const Navbar = () => {
  const [user, setUser] = useState<any | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = Cookies.get("user_data");
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("access_token")
    Cookies.remove("refresh_token")
    Cookies.remove("user_data")
    setUser(null)
    navigate("/login")
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
    <nav className={styles.navbar}>
        <div className={styles.leftSection}>
          {user && (
            <button className={styles.menuButton} onClick={toggleSidebar}>
              &#9776;
            </button>
          )}
          <Link to="/dashboard" className={styles.logo}>
            Feedback Manager
          </Link>
        </div>

      <div className={styles.rightSection}>
        {user ? (
          <div className={styles.profileWrapper} ref={dropdownRef}>
            <img
              src={user.profile_pic || defaultImage} // fallback if no profile_pic
              alt="profile"
              className={styles.avatar}
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className={styles.dropdown}>
                <button onClick={() => navigate(`/profile/${user.email}`)}>Profile</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.authButtons}>
            <Link to="/register" className={styles.authLink}>
              Register
            </Link>
            <Link to="/login" className={styles.authLink}>
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>

    <LeftSidebar isOpen={sidebarOpen} onClose={toggleSidebar} user={user} />

    </>
  );
};

export default Navbar;
