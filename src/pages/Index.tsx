import { useState } from "react";
import GameStore from "@/components/GameStore";
import FriendsList from "@/components/FriendsList";
import GameLibrary from "@/components/GameLibrary";
import AuthModal from "@/components/AuthModal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [isFriendsOpen, setIsFriendsOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  const handleLogin = (email: string, password: string) => {
    setUser(email.split("@")[0]);
    setIsAuthenticated(true);
    setIsAuthOpen(false);
    toast.success("Добро пожаловать в SteamLike! 🎮");
  };

  const handleRegister = (
    email: string,
    password: string,
    username: string,
  ) => {
    setUser(username);
    setIsAuthenticated(true);
    setIsAuthOpen(false);
    toast.success("Аккаунт создан! Начинайте играть! 🚀");
  };

  const handleOpenFriends = () => {
    if (!isAuthenticated) {
      setIsAuthOpen(true);
      return;
    }
    setIsFriendsOpen(true);
  };

  const handleOpenLibrary = () => {
    if (!isAuthenticated) {
      setIsAuthOpen(true);
      return;
    }
    setIsLibraryOpen(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsFriendsOpen(false);
    setIsLibraryOpen(false);
    toast.success("До встречи в игре! 👋");
  };

  return (
    <div className="min-h-screen bg-steam-bg font-rubik">
      {/* Верхняя панель */}
      <div className="absolute top-4 left-4 z-40 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-steam-blue rounded-full flex items-center justify-center">
            <Icon name="Gamepad2" size={16} className="text-white" />
          </div>
          <h1 className="text-white font-bold text-xl">SteamLike</h1>
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="bg-black/50 hover:bg-black/70 text-white text-sm"
            >
              <Icon name="User" size={16} className="mr-1" />
              {user}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleLogout}
              className="bg-black/50 hover:bg-black/70 text-white"
            >
              <Icon name="LogOut" size={16} />
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            onClick={() => setIsAuthOpen(true)}
            className="bg-steam-blue hover:bg-steam-blue/90 text-white"
          >
            <Icon name="LogIn" size={16} className="mr-1" />
            Войти
          </Button>
        )}
      </div>

      {/* Основной контент */}
      {isLibraryOpen ? (
        <GameLibrary onClose={() => setIsLibraryOpen(false)} />
      ) : (
        <GameStore
          onOpenLibrary={handleOpenLibrary}
          onOpenFriends={handleOpenFriends}
        />
      )}

      {/* Список друзей */}
      <FriendsList
        isOpen={isFriendsOpen}
        onClose={() => setIsFriendsOpen(false)}
      />

      {/* Модальное окно авторизации */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </div>
  );
};

export default Index;
