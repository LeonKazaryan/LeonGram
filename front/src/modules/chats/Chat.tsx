import { NavChat } from "./NavChat";
import { useParams } from "react-router-dom";
import { chats } from "../ChatList";
import { useState } from "react";

export function Chat() {
  const { id } = useParams();
  const chat = chats.find((c) => c.id === Number(id));
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState({
    in_messages: chat?.in_messages || [],
    out_messages: chat?.out_messages || [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!chat) return <div>Chat not found</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsLoading(true);
    setError(null);

    // Add the message to out_messages immediately
    setMessages((prev) => ({
      ...prev,
      out_messages: [...prev.out_messages, newMessage],
    }));

    try {
      console.log("Sending message:", { message: newMessage, chatId: id });

      const response = await fetch("http://localhost:5001/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: newMessage,
          chatId: id,
        }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Shit! Network response was not ok");
      }

      const data = await response.json();
      console.log("Received response:", data);

      if (!data.reply) {
        throw new Error("Fuck! No reply received from the server");
      }

      // Add the AI's response to in_messages
      setMessages((prev) => ({
        ...prev,
        in_messages: [...prev.in_messages, data.reply],
      }));
    } catch (error) {
      console.error("Fuck! Error sending message:", error);
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    } finally {
      setIsLoading(false);
      setNewMessage(""); // Clear the input
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <NavChat avatar={chat.avatar} name={chat.name} />
      <div className="flex-1 overflow-y-auto p-4 bg-[#2c2c2c]">
        {/* Incoming Messages */}
        {messages.in_messages.map((message, index) => (
          <div key={index} className="flex mb-4">
            <div className="bg-gray-700 rounded-lg p-3 max-w-[70%]">
              <p className="text-white">{message}</p>
            </div>
          </div>
        ))}

        {/* Outgoing Messages */}
        {messages.out_messages.map((message, index) => (
          <div key={index} className="flex mb-4 justify-end">
            <div className="bg-blue-600 rounded-lg p-3 max-w-[70%]">
              <p className="text-white">{message}</p>
            </div>
          </div>
        ))}

        {/* Error Message */}
        {error && (
          <div className="flex justify-center mb-4">
            <div className="bg-red-500 text-white p-3 rounded-lg">{error}</div>
          </div>
        )}
      </div>

      {/* Message Input Form */}
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-[#212121] border-t border-gray-700"
      >
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-[#2c2c2c] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}
