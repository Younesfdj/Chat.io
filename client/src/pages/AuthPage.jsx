import { useEffect, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import axios from "../axios/axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const AuthPage = () => {
  const navigate = useNavigate();
  const [hidePass, setHidePass] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [wrongUsername, setWrongUsername] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("login", {
        username,
        password,
      });
      const { token, user } = res.data;
      Cookies.set("jwtToken", token, {
        expires: 7,
        path: "/chat",
      });
      Cookies.set("username", user.username, {
        expires: 7,
        path: "/chat",
      });
      Cookies.set("user_id", user.id, {
        expires: 7,
        path: "/chat",
      });
      navigate("chat");
    } catch (error) {
      const err = error.response.data.message;
      console.log(err);
      if (err === "User doesn't exist") setWrongUsername(true);
      else if (err === "Incorrect password") setWrongPassword(true);
    }
  };

  return (
    <div className="background">
      <form onSubmit={onSubmit} className="form-card">
        <div className="form-title">Welcome 👋</div>

        <div className="form-subtitle">Log in to get started</div>

        <div className="auth">
          <div className="auth-label">Username</div>
          <input
            className="auth-input"
            name="username"
            onChange={(e) => {
              setUsername(e.target.value);
              setWrongUsername(false);
            }}
            style={{
              border: wrongUsername ? "1px solid red" : "",
            }}
          />
          {hidePass ? (
            <BsEyeSlash
              style={{ background: "none", color: "white" }}
              className="form-eye"
              onClick={() =>
                hidePass ? setHidePass(false) : setHidePass(true)
              }
            />
          ) : (
            <BsEye
              style={{ background: "none", color: "white" }}
              className="form-eye"
              onClick={() =>
                hidePass ? setHidePass(false) : setHidePass(true)
              }
            />
          )}
          <div className="auth-label">Password</div>
          <input
            className="auth-input"
            type={!hidePass ? "text" : "password"}
            style={{
              marginBottom: "24px",
              border: wrongPassword ? "1px solid red" : "",
            }}
            onChange={(e) => {
              setPassword(e.target.value);
              setWrongPassword(false);
            }}
          />
          <button className="auth-button" type="submit">
            Enter
          </button>
        </div>
      </form>
    </div>
  );
};
