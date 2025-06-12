import { useState } from "react";
import VideoFeed from "@/components/VideoFeed";
import ChatSidebar from "@/components/ChatSidebar";
import VideoUpload from "@/components/VideoUpload";
import AuthModal from "@/components/AuthModal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  const handleLogin = (email: string, password: string) => {
    // Имитация входа
    setUser(email.split("@")[0]);
    setIsAuthenticated(true);
    setIsAuthOpen(false);
    toast.success("Добро пожаловать в Март! 🚀");
  };

  const handleRegister = (
    email: string,
    password: string,
    username: string,
  ) => {
    // Имитация регистрации
    setUser(username);
    setIsAuthenticated(true);
    setIsAuthOpen(false);
    toast.success("Аккаунт создан! Добро пожаловать! 🎉");
  };

  const handleVideoUpload = (videoData: {
    title: string;
    description: string;
    file: File;
  }) => {
    // Имитация загрузки видео
    toast.success(`Видео "${videoData.title}" загружено! 📹`);
    setIsUploadOpen(false);
  };

  const handleOpenChat = () => {
    if (!isAuthenticated) {
      setIsAuthOpen(true);
      return;
    }
    setIsChatOpen(true);
  };

  const handleOpenUpload = () => {
    if (!isAuthenticated) {
      setIsAuthOpen(true);
      return;
    }
    setIsUploadOpen(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsChatOpen(false);
    toast.success("До свидания! 👋");
  };

  return (
    <div className="min-h-screen bg-dark-bg font-rubik">
      {/* Заголовок */}
      <div className="absolute top-4 left-4 z-40 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-accent rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">М</span>
          </div>
          <h1 className="text-white font-bold text-xl">Март</h1>
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
            className="bg-purple-accent hover:bg-purple-accent/90 text-white"
          >
            <Icon name="LogIn" size={16} className="mr-1" />
            Войти
          </Button>
        )}
      </div>

      {/* Основной контент */}
      <VideoFeed onOpenChat={handleOpenChat} onOpenUpload={handleOpenUpload} />

      {/* Боковой чат */}
      <ChatSidebar isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Модальное окно загрузки видео */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="sm:max-w-lg bg-dark-bg border-gray-700 p-0">
          <VideoUpload onUpload={handleVideoUpload} />
        </DialogContent>
      </Dialog>

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
