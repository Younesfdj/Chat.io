import Header from "./Header";
import OnlineUsers from "./OnlineUsers";

const SideBar = ({ onlineUsers }) => {
  return (
    <aside>
      <Header />
      <OnlineUsers onlineUsers={onlineUsers} />
    </aside>
  );
};

export default SideBar;
