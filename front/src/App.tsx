import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { ChatList } from "./modules/ChatList";
import { Navbar } from "./modules/Navbar";
import { Main } from "./modules/Main";
import { Profile } from "./modules/Profile";
import { Chat } from "./modules/chats/Chat";

const App = () => {
  return (
    <div className="flex bg-[#2c2c2c] min-h-screen">
      <Navbar />
      <main className="flex-1 md:ml-[280px] w-full">
        <div className="mb-16 md:mb-0">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chats" element={<ChatList />} />
            <Route path="/chat/:id" element={<Chat />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default App;
