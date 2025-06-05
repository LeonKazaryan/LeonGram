import { useNavigate } from "react-router-dom";
// import { chats } from "./chats/chat";

interface Chat {
  id: number;
  name: string;
  avatar: string;
  messages: Message[];
  last_message: Date;
}

export interface Message {
  text: string;
  date: Date;
  isUser: boolean;
}

const truncateText = (text: string, isMobile: boolean) => {
  const limit = isMobile ? 30 : 50;
  if (text.length <= limit) return text;
  return text.slice(0, limit) + "...";
};

export const chats: Chat[] = [
  {
    id: 1,
    name: "GPT Assistant",
    avatar: "🤖",
    messages: [
      {
        text: "How can I help you today?",
        date: new Date("2024-01-10T12:30:00"),
        isUser: false,
      },
    ],
    last_message: new Date("2024-01-10T12:30:00"),
  },
  {
    id: 2,
    name: "Code Helper",
    avatar: "👨‍💻",
    messages: [
      {
        text: "Let's solve that bug!",
        date: new Date("2024-01-10T11:45:00"),
        isUser: false,
      },
    ],
    last_message: new Date("2024-01-10T11:45:00"),
  },
  {
    id: 3,
    name: "Creative Writer",
    avatar: "✍️",
    messages: [
      {
        text: "Your story outline looks great!",
        date: new Date("2024-01-10T10:15:00"),
        isUser: false,
      },
    ],
    last_message: new Date("2024-01-10T10:15:00"),
  },
  {
    id: 4,
    name: "Math Tutor",
    avatar: "🔢",
    messages: [
      {
        text: "The solution to equation is...",
        date: new Date("2024-01-09T12:00:00"),
        isUser: false,
      },
    ],
    last_message: new Date("2024-01-09T12:00:00"),
  },
  {
    id: 5,
    name: "Language Buddy",
    avatar: "🌎",
    messages: [
      {
        text: "¡Hola! Time for Spanish practice!",
        date: new Date("2024-01-09T10:00:00"),
        isUser: false,
      },
    ],
    last_message: new Date("2024-01-09T10:00:00"),
  },
  {
    id: 6,
    name: "Polish Language Tutor",
    avatar: "🇵🇱",
    messages: [
      {
        text: "Cześć! Czy chcesz nauczyć się języka polskiego?",
        date: new Date("2024-01-09T10:00:00"),
        isUser: false,
      },
    ],
    last_message: new Date("2024-01-09T10:00:00"),
  },
  {
    id: 7,
    name: "Russian Gopnik",
    avatar: "🇷🇺",
    messages: [
      {
        text: "Здарова, епта",
        date: new Date("2024-01-09T10:00:00"),
        isUser: false,
      },
    ],
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
          <div className="flex-1 ml-4 min-w-0">
            <div className="flex justify-between items-start">
              <h3 className="text-white font-medium truncate">{chat.name}</h3>
              <span className="text-gray-400 text-sm ml-2 shrink-0">
                {chat.last_message.toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <p className="text-gray-400 text-sm truncate">
                <span className="md:hidden">
                  {truncateText(
                    chat.messages[chat.messages.length - 1].text,
                    true
                  )}
                </span>
                <span className="hidden md:inline">
                  {truncateText(
                    chat.messages[chat.messages.length - 1].text,
                    false
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
