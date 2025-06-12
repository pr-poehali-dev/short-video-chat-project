import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";

interface Message {
  id: string;
  author: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
}

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatSidebar = ({ isOpen, onClose }: ChatSidebarProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      author: "Анна",
      text: "Привет всем! 👋",
      timestamp: new Date(),
      isOwn: false,
    },
    {
      id: "2",
      author: "Макс",
      text: "Классное видео!",
      timestamp: new Date(),
      isOwn: false,
    },
    {
      id: "3",
      author: "Вы",
      text: "Согласен, очень круто! 🔥",
      timestamp: new Date(),
      isOwn: true,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers] = useState(["Анна", "Макс", "Саша", "Катя"]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        author: "Вы",
        text: newMessage,
        timestamp: new Date(),
        isOwn: true,
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-dark-bg border-l border-gray-700 z-50 flex flex-col animate-slide-up">
      {/* Заголовок чата */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Icon name="MessageCircle" size={20} className="text-purple-accent" />
          <h2 className="font-semibold text-white">Чат</h2>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <Icon name="X" size={18} />
        </Button>
      </div>

      {/* Онлайн пользователи */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-sm font-medium text-gray-400 mb-2">
          Онлайн ({onlineUsers.length})
        </h3>
        <div className="flex gap-2 overflow-x-auto">
          {onlineUsers.map((user) => (
            <div
              key={user}
              className="flex flex-col items-center gap-1 min-w-max"
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-purple-accent text-white text-xs">
                  {user.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-gray-400">{user}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Сообщения */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`chat-message ${message.isOwn ? "own" : "other"}`}
              >
                {!message.isOwn && (
                  <p className="text-xs text-gray-400 mb-1">{message.author}</p>
                )}
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-60 mt-1">
                  {message.timestamp.toLocaleTimeString("ru-RU", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Поле ввода */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Напишите сообщение..."
            className="bg-dark-card border-gray-600 text-white placeholder-gray-400"
          />
          <Button
            onClick={sendMessage}
            size="sm"
            className="bg-purple-accent hover:bg-purple-accent/90"
          >
            <Icon name="Send" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
