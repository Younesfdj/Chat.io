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
      <form onSubmit={onSubmit} className="form-card" autoComplete="off">
        <div className="form-title">Welcome 👋</div>

        <div className="form-subtitle">Log in to get started</div>

        <div className="auth">
          <div
            className="input-elm"
            style={{
              border: wrongUsername ? "1px solid red" : "",
            }}
          >
            <div className="auth-label">Username</div>
            <input
              className="auth-input"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
                setWrongUsername(false);
              }}
            />
          </div>
          <div
            className="input-elm"
            style={{
              // marginBottom: "24px",
              border: wrongPassword ? "1px solid red" : "",
            }}
          >
            <div className="auth-label">Password</div>
            <div className="input-container">
              <input
                className="auth-input"
                type={!hidePass ? "text" : "password"}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setWrongPassword(false);
                }}
              />
              {hidePass ? (
                <BsEyeSlash
                  className="eye-svg"
                  onClick={() =>
                    hidePass ? setHidePass(false) : setHidePass(true)
                  }
                />
              ) : (
                <BsEye
                  className="eye-svg"
                  onClick={() =>
                    hidePass ? setHidePass(false) : setHidePass(true)
                  }
                />
              )}
            </div>
          </div>
          <button className="auth-button" type="submit">
            Enter
          </button>
        </div>
      </form>
    </div>
  );
};
