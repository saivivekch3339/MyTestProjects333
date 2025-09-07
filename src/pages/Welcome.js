import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  const openBook = () => {
    setOpen(true);
    setTimeout(() => {
      navigate("/home"); // Navigate to Home after animation
    }, 2000); // 2s matches CSS transition
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      height: "100vh",
      background: "linear-gradient(to right, #fbc2eb, #a6c1ee)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    book: {
      width: "300px",
      height: "200px",
      perspective: "1000px",
    },
    inner: {
      width: "100%",
      height: "100%",
      position: "relative",
      transformStyle: "preserve-3d",
      transition: "transform 2s",
      transform: open ? "rotateY(180deg)" : "rotateY(0deg)",
    },
    front: {
      position: "absolute",
      width: "100%",
      height: "100%",
      backfaceVisibility: "hidden",
      backgroundColor: "#fff",
      border: "2px solid #333",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    },
    back: {
      position: "absolute",
      width: "100%",
      height: "100%",
      backfaceVisibility: "hidden",
      backgroundColor: "#ffeaa7",
      border: "2px solid #333",
      borderRadius: "10px",
      transform: "rotateY(180deg)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    },
    button: {
      marginTop: "15px",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#6c5ce7",
      color: "#fff",
      cursor: "pointer",
      fontSize: "16px",
    },
    logoutBtn: {
      marginTop: "20px",
      padding: "8px 18px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#d63031",
      color: "#fff",
      cursor: "pointer",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.book}>
        <div style={styles.inner}>
          {/* Front of the book */}
          <div style={styles.front}>
            <h1>📖 Recipe Book</h1>
            <p>
              Welcome {user?.email || "Chef"}! <br />
              Ready for your cooking adventure?
            </p>
            <button style={styles.button} onClick={openBook}>
              Open Book
            </button>
          </div>

          {/* Back of the book */}
          <div style={styles.back}>
            <h1>👨‍🍳 Let's Cook!</h1>
            <p>Loading your Home page...</p>
          </div>
        </div>
      </div>

      {/* Logout button */}
      <button style={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Welcome;
