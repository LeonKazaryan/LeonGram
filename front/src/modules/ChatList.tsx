import { useNavigate } from "react-router-dom";
// import { chats } from "./chats/chat";

interface Chat {
  id: number;
  name: string;
  avatar: string;
  in_messages: string[];
  out_messages: string[];
  last_message: Date;
}

export const chats: Chat[] = [
  {
    id: 1,
    name: "GPT Assistant",
    avatar: "🤖",
    in_messages: ["How can I help you today?"],
    out_messages: [],
    last_message: new Date("2024-01-10T12:30:00"),
  },
  {
    id: 2,
    name: "Code Helper",
    avatar: "👨‍💻",
    in_messages: ["Let's solve that bug!"],
    out_messages: [],
    last_message: new Date("2024-01-10T11:45:00"),
  },
  {
    id: 3,
    name: "Creative Writer",
    avatar: "✍️",
    in_messages: ["Your story outline looks great!"],
    out_messages: [],
    last_message: new Date("2024-01-10T10:15:00"),
  },
  {
    id: 4,
    name: "Math Tutor",
    avatar: "🔢",
    in_messages: ["The solution to equation is..."],
    out_messages: [],
    last_message: new Date("2024-01-09T12:00:00"),
  },
  {
    id: 5,
    name: "Language Buddy",
    avatar: "🌎",
    in_messages: ["¡Hola! Time for Spanish practice!"],
    out_messages: [],
    last_message: new Date("2024-01-09T10:00:00"),
  },
];

export function ChatList() {
  const navigate = useNavigate();

  const sortedChats = [...chats].sort(
    (a, b) => b.last_message.getTime() - a.last_message.getTime()
  );

  return (
    <div className="flex-1 overflow-y-auto bg-[#212121]">
      {sortedChats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => navigate(`/chat/${chat.id}`)}
          className="flex items-center p-4 hover:bg-[#2c2c2c] cursor-pointer transition-colors border-b border-gray-700"
        >
          {/* Avatar */}
          <div className="w-12 h-12 flex items-center justify-center text-2xl bg-gray-700 rounded-full">
            {chat.avatar}
          </div>

          {/* Chat Info */}
          <div className="flex-1 ml-4">
            <div className="flex justify-between items-start">
              <h3 className="text-white font-medium">{chat.name}</h3>
              <span className="text-gray-400 text-sm">
                {chat.last_message.toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <p className="text-gray-400 text-sm truncate pr-4">
                {chat.in_messages[chat.in_messages.length - 1]}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
