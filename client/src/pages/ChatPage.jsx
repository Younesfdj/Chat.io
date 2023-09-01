import { useEffect, useState } from "react";
import ChatZone from "../components/ChatZone";
import SideBar from "../components/SideBar";
import axios from "../axios/axios";
import Cookies from "js-cookie";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");

export const ChatPage = () => {
  const [chat, setChat] = useState([]);
  const currentUser = Cookies.get("username");
  const currentUserId = Cookies.get("user_id");
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const token = Cookies.get("jwtToken");

  const fetchChat = async () => {
    const { data } = await axios.get("chat/getChat", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setChat(data.chat);
  };

  const sendMessage = () => {
    const msgToDb = async () => {
      try {
        const { data } = await axios.post(
          "chat/saveMessage",
          {
            sender_username: currentUser,
            text: message,
            sender_id: currentUserId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        socket.emit("send-message", data);
        setChat((prev) => [...prev, data]);
      } catch (error) {
        console.log(error);
      }
    };
    msgToDb();
  };

  useEffect(() => {
    if (token) {
      setIsLoading(false);
      fetchChat();
    } else
      setTimeout(() => {
        window.location.reload();
      }, 1000);
  }, []);

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setChat((prev) => [...prev, data]);
    });
  }, [socket]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <SideBar />
      <ChatZone
        chat={chat}
        sendMessage={sendMessage}
        setMessage={setMessage}
        currentUser={currentUser}
        message={message}
      />
    </div>
  );
};
