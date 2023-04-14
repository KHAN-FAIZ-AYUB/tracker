import styles from "../../styles/Login.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/notification`,
        {},
        config
      );
      setLoading(false);
    } catch (error:any) {
      setLoading(false); 
      setError(error.response?.data?.error)
    }
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
          {error && <p className={styles.error}>{error}</p>}
          <input
            type="button"
            name="submit"
            onClick={handleSendLocation}
            value="Send Device Location"
            className={styles.btn}
          />
        </div>
      </div>
      <div className={`${styles.full_screen_loader} ${!loading ? styles.hidden : ''}` }>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
      </div>
    </div>
  );
}
