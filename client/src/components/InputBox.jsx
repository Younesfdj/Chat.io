import { BsFillSendFill } from "react-icons/bs";
const InputBox = ({ sendMessage, setMessage, message }) => {
  return (
    <form className="send-msg-container" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button
        onClick={() => {
          setMessage("");
          sendMessage();
        }}
      >
        Send
        <BsFillSendFill />
      </button>
    </form>
  );
};

export default InputBox;
