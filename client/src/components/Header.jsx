import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { BsBoxArrowLeft } from "react-icons/bs";

const Header = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    Cookies.remove("jwtToken");
    Cookies.remove("user_id");
    Cookies.remove("username");
    navigate("/");
  };

  return (
    <nav>
      <h1>
        Chat.<span>IO</span>
      </h1>
      <div className="logout" onClick={logoutHandler}>
        <input
          type="button"
          value="Logout"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        />
        <BsBoxArrowLeft />
      </div>
    </nav>
  );
};

export default Header;
