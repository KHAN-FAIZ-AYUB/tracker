"use client";
import { useState } from "react";
import styles from "../styles/Login.module.css";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

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
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
      email,
      password,
    });
    setLoading(false);
    localStorage.setItem("token", response.data?.token);
    router.push("/home");
  };

  return (
    <div className={styles.login}>
      <h5>Login Form</h5>
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
        className={styles.btn}
      />
    </div>
  );
}
