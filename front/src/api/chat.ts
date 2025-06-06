import type { Message } from "../modules/ChatList";

interface SendMessageResponse {
  reply: string;
}

export const sendMessage = async (message: string, chatId: number): Promise<SendMessageResponse> => {
  const response = await fetch("http://localhost:5001/send-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      chatId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  return response.json();
};

export const getChatHistory = async (chatId: number): Promise<Message[]> => {
  const response = await fetch(`http://localhost:5001/chat/${chatId}/history`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch chat history");
  }

  return response.json();
}; 