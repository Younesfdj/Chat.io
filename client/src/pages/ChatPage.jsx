import { useEffect, useState } from "react";
import { DotWave } from "@uiball/loaders";
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
  const [onlineUsers, setOnlineUsers] = useState([]);
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
    const handleBeforeUnload = () => {
      socket.emit("user-loggedout", currentUser);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (token) {
      setIsLoading(false);
      fetchChat();
    } else
      setTimeout(() => {
        window.location.reload();
      }, 1500);
  }, []);

  useEffect(() => {
    socket.on("user-connected", () => {
      socket.emit("user-online", currentUser);
      socket.on("users-online", (OnlineUsers) => {
        setOnlineUsers(OnlineUsers);
      });
    });
    socket.on("receive-message", (data) => {
      setChat((prev) => [...prev, data]);
    });
    socket.on("user-disconnected", (OnlineUsers) => {
      setOnlineUsers(OnlineUsers);
    });
  }, [socket]);

  if (isLoading) {
    return (
      <div className="loading">
        <DotWave size={47} speed={1} color="black" backgroundColor="red" />
      </div>
    );
  }
  return (
    <div className="container">
      <SideBar onlineUsers={onlineUsers} currentUser={currentUser} />
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
