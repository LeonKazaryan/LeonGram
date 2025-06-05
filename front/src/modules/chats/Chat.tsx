import { NavChat } from "./NavChat";
import { useParams } from "react-router-dom";
import { chats } from "../ChatList";
import { useState } from "react";
import type { Message } from "../ChatList";

export function Chat() {
  const { id } = useParams();
  const chatId = Number(id);
  const chatIndex = chats.findIndex((c) => c.id === chatId);
  const chat = chats[chatIndex];
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!chat) return <div>Chat not found</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsLoading(true);
    setError(null);

    // Add the user's message immediately
    const userMessage: Message = {
      text: newMessage,
      date: new Date(),
      isUser: true,
    };

    // Update the chat's messages array directly
    chats[chatIndex].messages.push(userMessage);
    chats[chatIndex].last_message = userMessage.date;

    try {
      console.log("Sending message:", { message: newMessage, chatId });

      const response = await fetch("http://localhost:5001/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: newMessage,
          chatId,
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

      // Add the AI's response
      const aiMessage: Message = {
        text: data.reply,
        date: new Date(),
        isUser: false,
      };

      // Update the chat's messages array directly
      chats[chatIndex].messages.push(aiMessage);
      chats[chatIndex].last_message = aiMessage.date;
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
      <div className="fixed top-0 left-0 right-0 md:left-[280px] z-40 bg-[#212121]">
        <NavChat avatar={chat.avatar} name={chat.name} />
      </div>
      <div className="flex-1 overflow-y-auto p-4 bg-[#2c2c2c] mt-[64px] mb-[76px] md:mb-[64px]">
        {chat.messages.map((message, index) => (
          <div
            key={index}
            className={`flex mb-4 ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-lg p-3 max-w-[70%] ${
                message.isUser ? "bg-blue-600" : "bg-gray-700"
              }`}
            >
              <p className="text-white">{message.text}</p>
              <p className="text-xs text-gray-400 mt-1">
                {message.date.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}

        {/* Loading Animation */}
        {isLoading && (
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex space-x-1">
              <div
                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
            <span className="text-gray-400 text-sm">
              {chat.name} is typing...
            </span>
          </div>
        )}

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
        className="fixed bottom-0 left-0 right-0 md:left-[280px] p-4 bg-[#212121] border-t border-gray-700 md:mb-0 mb-16"
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
