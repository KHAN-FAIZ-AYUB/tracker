import styles from "../../styles/Login.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState("");
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      return setToken(storedToken);
    }
    router.replace("/");
  }, [token]);

  const handleSendLocation = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.post(
      "http://localhost:3000/api/notification",
      {},
      config
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };
  return (
    <div
      style={{
        flex: 1,
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          textAlign: "end",
        }}
      >
        <input
          type="button"
          name="submit"
          onClick={handleLogout}
          value="Logout"
          className={styles.btn}
        />
      </div>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <input
            type="button"
            name="submit"
            onClick={handleSendLocation}
            value="Send Device Location"
            className={styles.btn}
          />
        </div>
      </div>
    </div>
  );
}
