import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";

interface Friend {
  id: string;
  username: string;
  status: "online" | "away" | "busy" | "offline";
  currentGame?: string;
  lastSeen?: string;
  avatar?: string;
}

interface FriendsListProps {
  isOpen: boolean;
  onClose: () => void;
}

const FriendsList = ({ isOpen, onClose }: FriendsListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [friends] = useState<Friend[]>([
    {
      id: "1",
      username: "GameMaster_Pro",
      status: "online",
      currentGame: "Counter-Strike 2",
    },
    {
      id: "2",
      username: "CyberNinja",
      status: "online",
      currentGame: "Cyberpunk 2077",
    },
    {
      id: "3",
      username: "RPG_Legend",
      status: "away",
      currentGame: "The Witcher 3",
    },
    {
      id: "4",
      username: "StrategyKing",
      status: "busy",
      currentGame: "В игре",
    },
    {
      id: "5",
      username: "IndieExplorer",
      status: "offline",
      lastSeen: "2 часа назад",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "busy":
        return "bg-red-500";
      case "offline":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "В сети";
      case "away":
        return "Отошел";
      case "busy":
        return "Занят";
      case "offline":
        return "Не в сети";
      default:
        return "Неизвестно";
    }
  };

  const filteredFriends = friends.filter((friend) =>
    friend.username.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const onlineFriends = filteredFriends.filter((f) => f.status === "online");
  const otherFriends = filteredFriends.filter((f) => f.status !== "online");

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-steam-card border-l border-gray-700 z-50 flex flex-col">
      {/* Заголовок */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Icon name="Users" size={20} className="text-steam-light" />
          <h2 className="font-semibold text-white">Друзья</h2>
          <span className="text-xs bg-steam-blue text-white px-2 py-1 rounded-full">
            {onlineFriends.length}
          </span>
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

      {/* Поиск */}
      <div className="p-4 border-b border-gray-700">
        <div className="relative">
          <Input
            placeholder="Поиск друзей..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-steam-bg border-gray-600 text-white pr-10"
          />
          <Icon
            name="Search"
            size={16}
            className="absolute right-3 top-3 text-gray-400"
          />
        </div>
      </div>

      {/* Список друзей */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Друзья онлайн */}
          {onlineFriends.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-steam-light mb-3 uppercase tracking-wide">
                В сети ({onlineFriends.length})
              </h3>
              <div className="space-y-2">
                {onlineFriends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-steam-bg/50 transition-colors cursor-pointer"
                  >
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-steam-blue text-white">
                          {friend.username.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(friend.status)} rounded-full border-2 border-steam-card`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {friend.username}
                      </p>
                      {friend.currentGame ? (
                        <p className="text-xs text-steam-light truncate">
                          <Icon
                            name="Gamepad2"
                            size={12}
                            className="inline mr-1"
                          />
                          {friend.currentGame}
                        </p>
                      ) : (
                        <p className="text-xs text-gray-400">
                          {getStatusText(friend.status)}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-8 h-8 p-0 text-gray-400 hover:text-steam-light"
                      >
                        <Icon name="MessageCircle" size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-8 h-8 p-0 text-gray-400 hover:text-steam-light"
                      >
                        <Icon name="Phone" size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Остальные друзья */}
          {otherFriends.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wide">
                Не в сети ({otherFriends.length})
              </h3>
              <div className="space-y-2">
                {otherFriends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-steam-bg/50 transition-colors cursor-pointer opacity-60"
                  >
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gray-600 text-white">
                          {friend.username.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(friend.status)} rounded-full border-2 border-steam-card`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {friend.username}
                      </p>
                      <p className="text-xs text-gray-400">
                        {friend.lastSeen || getStatusText(friend.status)}
                      </p>
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-8 h-8 p-0 text-gray-400 hover:text-steam-light"
                    >
                      <Icon name="MessageCircle" size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Нижняя панель */}
      <div className="p-4 border-t border-gray-700">
        <Button
          variant="outline"
          className="w-full border-steam-blue text-steam-light hover:bg-steam-blue/20"
        >
          <Icon name="UserPlus" size={16} className="mr-2" />
          Добавить друга
        </Button>
      </div>
    </div>
  );
};

export default FriendsList;
