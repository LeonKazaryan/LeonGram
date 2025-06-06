import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sendMessage, getChatHistory } from "../api/chat";
import type { Message } from "../modules/ChatList";
import { chats } from "../modules/ChatList";

export const useChatMessages = (chatId: number) => {
  // For now, we'll use the local data, but this is where you'd typically fetch from the server
  return useQuery({
    queryKey: ["chat", chatId],
    queryFn: () => getChatHistory(chatId),
    // Initialize with current messages from chats array
    initialData: () => {
      const chat = chats.find(c => c.id === chatId);
      return chat?.messages || [];
    },
  });
};

export const useSendMessage = (chatId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (message: string) => sendMessage(message, chatId),
    onMutate: async (newMessage) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["chat", chatId] });

      // Snapshot the previous value
      const previousMessages = queryClient.getQueryData<Message[]>(["chat", chatId]);

      // Optimistically update the chat
      const userMessage: Message = {
        text: newMessage,
        date: new Date(),
        isUser: true,
      };

      queryClient.setQueryData<Message[]>(["chat", chatId], (old = []) => [...old, userMessage]);

      // Update the chat's last_message
      const chatIndex = chats.findIndex(c => c.id === chatId);
      if (chatIndex !== -1) {
        chats[chatIndex].messages.push(userMessage);
        chats[chatIndex].last_message = userMessage.date;
      }

      return { previousMessages };
    },
    onSuccess: (data, variables, context) => {
      // Add the AI's response
      const aiMessage: Message = {
        text: data.reply,
        date: new Date(),
        isUser: false,
      };

      queryClient.setQueryData<Message[]>(["chat", chatId], (old = []) => [...old, aiMessage]);

      // Update the chat's messages and last_message
      const chatIndex = chats.findIndex(c => c.id === chatId);
      if (chatIndex !== -1) {
        chats[chatIndex].messages.push(aiMessage);
        chats[chatIndex].last_message = aiMessage.date;
      }
    },
    onError: (err, variables, context) => {
      // Rollback to the previous state if there's an error
      if (context?.previousMessages) {
        queryClient.setQueryData(["chat", chatId], context.previousMessages);
      }
      console.error("Fuck! Error sending message:", err);
    },
  });
}; 