"use client";
import { useState } from "react";
import styles from "../styles/Login.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { ColorRing } from "react-loader-spinner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleEmailChange = (e:any) => {
    setEmailError("");
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e:any) => {
    setPasswordError("");
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    if (!email) {
      return setEmailError("Enter a valid email");
    }
    if (!password) {
      return setPasswordError("Enter password");
    }
    setLoading(true);
    setError('')
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/login`, {
        email,
        password,
      });
      setLoading(false);
      localStorage.setItem("token", response.data?.token);
      router.push("/home");
      
    } catch (error) {
      setLoading(false); 
      setError(error.response?.data?.error)
    }
  };

  return (
    <div className={styles.login}>
      <h5>Login Form</h5>
      {error && <p className={styles.error}>{error}</p>}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        className={styles.text}
      />
      {emailError && (
        <p
          style={{
            color: "red",
            marginTop: 10,
            marginBottom: 10,
            fontSize: 12,
          }}
        >
          {emailError}
        </p>
      )}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        className={styles.text}
      />
      {passwordError && (
        <p
          style={{
            color: "red",
            marginTop: 10,
            marginBottom: 10,
            fontSize: 12,
          }}
        >
          {passwordError}
        </p>
      )}
      <input
        type="button"
        name="submit"
        onClick={handleLogin}
        value="Login"
        className={`${styles.btn} ${styles.full_size_btn}`}
      />
      <div className={`${styles.full_screen_loader} ${!loading ? styles.hidden : ''}` }>
      <ColorRing
        visible={loading}
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
