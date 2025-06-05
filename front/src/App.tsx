import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { ChatList } from "./modules/ChatList";
import { Navbar } from "./modules/Navbar";
import { Main } from "./modules/Main";
import { Profile } from "./modules/Profile";
import { Chat } from "./modules/chats/Chat";

const App = () => {
  return (
    <div className="flex">
      <Navbar />
      <main className="flex-1 ml-[280px]">
        {" "}
        {/* 280px matches navbar width */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chats" element={<ChatList />} />
          <Route path="/chat/:id" element={<Chat />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
