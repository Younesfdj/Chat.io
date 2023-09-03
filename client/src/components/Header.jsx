import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { BsBoxArrowLeft } from "react-icons/bs";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");

const Header = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    socket.emit("user-loggedout", Cookies.get("username"));
    Cookies.remove("jwtToken");
    Cookies.remove("user_id");
    Cookies.remove("username");
    navigate("/");
  };

  return (
    <nav>
      <h2>
        Chat.<span style={{ color: "#fa541c" }}>io</span>
      </h2>
      <div className="logout" onClick={logoutHandler}>
        <input
          type="button"
          value="Logout"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "white",
            fontSize: "15px",
          }}
        />
        <BsBoxArrowLeft />
      </div>
    </nav>
  );
};

export default Header;
