import InputBox from "./InputBox";

const ChatZone = ({ chat, sendMessage, setMessage, currentUser, message }) => {
  return (
    <div className="chat-container">
      <div className="chat-wrapper">
        {chat.map((msg) => {
          return (
            <div
              className={
                msg.sender_username === currentUser ? "sender" : "receiver"
              }
              key={msg._id}
            >
              <div className="message">
                <div className="message-text">{msg.text}</div>
                <div className="message-info">
                  <div className="user">
                    {msg.sender_username === currentUser
                      ? "You"
                      : msg.sender_username}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <InputBox
        sendMessage={sendMessage}
        setMessage={setMessage}
        message={message}
      />
    </div>
  );
};

export default ChatZone;
