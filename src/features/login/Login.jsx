import { useState, useRef } from "react";
import Input from "../../components/Input";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const user = useRef();
  const password = useRef();

  const [userClass, setUserClass] = useState("");
  const [passClass, setPassClass] = useState("");

  function handleClick() {
    const isValidUser = user.current.value.indexOf("@") > 0;
    const isValidPass = password.current.value.length >= 8;
    setUserClass(isValidUser ? "" : styles.required);
    setPassClass(isValidPass ? "" : styles.required);
    if (isValidPass && isValidUser) {
      nav("/");
      // pageHandler("home");
    }
  }

  return (
    <div className={styles.div}>
      <Input ref={user} label="Username" className={userClass} />
      <Input
        ref={password}
        label="Password"
        type="password"
        className={passClass}
      />
      <div className={styles.buttons}>
        <button onClick={handleClick}>Signup</button>
        <button onClick={handleClick}>Login</button>
      </div>
    </div>
  );
}
