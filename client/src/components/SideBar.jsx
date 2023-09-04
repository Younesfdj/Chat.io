import Header from "./Header";
import OnlineUsers from "./OnlineUsers";

const SideBar = ({ onlineUsers, currentUser }) => {
  return (
    <aside>
      <Header />
      <OnlineUsers onlineUsers={onlineUsers} currentUser={currentUser} />
    </aside>
  );
};

export default SideBar;
