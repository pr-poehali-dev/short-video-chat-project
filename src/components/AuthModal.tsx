import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onRegister: (email: string, password: string, username: string) => void;
}

const AuthModal = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
}: AuthModalProps) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");

  const handleLogin = () => {
    if (loginEmail && loginPassword) {
      onLogin(loginEmail, loginPassword);
      setLoginEmail("");
      setLoginPassword("");
    }
  };

  const handleRegister = () => {
    if (registerEmail && registerPassword && registerUsername) {
      onRegister(registerEmail, registerPassword, registerUsername);
      setRegisterEmail("");
      setRegisterPassword("");
      setRegisterUsername("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-dark-card border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white text-center">
            Добро пожаловать в Март! 🚀
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-dark-bg">
            <TabsTrigger
              value="login"
              className="text-gray-400 data-[state=active]:text-white"
            >
              Вход
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="text-gray-400 data-[state=active]:text-white"
            >
              Регистрация
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="login-email" className="text-gray-400">
                  Email
                </Label>
                <Input
                  id="login-email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="example@mail.com"
                  className="bg-dark-bg border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="login-password" className="text-gray-400">
                  Пароль
                </Label>
                <Input
                  id="login-password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-dark-bg border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <Button
                onClick={handleLogin}
                className="w-full bg-purple-accent hover:bg-purple-accent/90"
                disabled={!loginEmail || !loginPassword}
              >
                <Icon name="LogIn" size={16} className="mr-2" />
                Войти
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="register-username" className="text-gray-400">
                  Имя пользователя
                </Label>
                <Input
                  id="register-username"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  placeholder="ваше_имя"
                  className="bg-dark-bg border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="register-email" className="text-gray-400">
                  Email
                </Label>
                <Input
                  id="register-email"
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="example@mail.com"
                  className="bg-dark-bg border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="register-password" className="text-gray-400">
                  Пароль
                </Label>
                <Input
                  id="register-password"
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-dark-bg border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <Button
                onClick={handleRegister}
                className="w-full bg-purple-accent hover:bg-purple-accent/90"
                disabled={
                  !registerEmail || !registerPassword || !registerUsername
                }
              >
                <Icon name="UserPlus" size={16} className="mr-2" />
                Зарегистрироваться
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <p className="text-xs text-gray-400">
            Продолжая, вы соглашаетесь с условиями использования
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
