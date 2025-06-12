import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

interface LibraryGame {
  id: string;
  title: string;
  playtime: number;
  lastPlayed: string;
  installed: boolean;
  installing: boolean;
  installProgress?: number;
  image: string;
  size: string;
}

interface GameLibraryProps {
  onClose: () => void;
}

const GameLibrary = ({ onClose }: GameLibraryProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [games, setGames] = useState<LibraryGame[]>([
    {
      id: "1",
      title: "The Witcher 3: Wild Hunt",
      playtime: 127,
      lastPlayed: "Вчера",
      installed: true,
      installing: false,
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=100&fit=crop",
      size: "35.2 ГБ",
    },
    {
      id: "2",
      title: "Cyberpunk 2077",
      playtime: 45,
      lastPlayed: "3 дня назад",
      installed: false,
      installing: true,
      installProgress: 67,
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=100&fit=crop",
      size: "62.8 ГБ",
    },
    {
      id: "3",
      title: "Counter-Strike 2",
      playtime: 892,
      lastPlayed: "Сегодня",
      installed: true,
      installing: false,
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=100&fit=crop",
      size: "28.5 ГБ",
    },
  ]);

  const handlePlay = (gameId: string) => {
    console.log("Запуск игры:", gameId);
  };

  const handleInstall = (gameId: string) => {
    setGames(
      games.map((game) =>
        game.id === gameId
          ? { ...game, installing: true, installProgress: 0 }
          : game,
      ),
    );
  };

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 bg-steam-bg z-50 overflow-y-auto">
      {/* Заголовок */}
      <header className="bg-steam-card border-b border-gray-700 p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <h1 className="text-2xl font-bold text-white">БИБЛИОТЕКА</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Input
                placeholder="Поиск в библиотеке..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 bg-steam-bg border-gray-600 text-white pr-10"
              />
              <Icon
                name="Search"
                size={16}
                className="absolute right-3 top-3 text-gray-400"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Статистика */}
      <div className="bg-steam-card/50 p-4 border-b border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-steam-light">
                {games.length}
              </div>
              <div className="text-gray-400 text-sm">Игр в библиотеке</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-steam-light">
                {games.filter((g) => g.installed).length}
              </div>
              <div className="text-gray-400 text-sm">Установлено</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-steam-light">
                {Math.round(games.reduce((acc, g) => acc + g.playtime, 0))} ч
              </div>
              <div className="text-gray-400 text-sm">Общее время</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-steam-light">
                {games
                  .reduce((acc, g) => acc + parseFloat(g.size), 0)
                  .toFixed(1)}{" "}
                ГБ
              </div>
              <div className="text-gray-400 text-sm">Занято места</div>
            </div>
          </div>
        </div>
      </div>

      {/* Список игр */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="space-y-4">
          {filteredGames.map((game) => (
            <div key={game.id} className="library-item">
              <img
                src={game.image}
                alt={game.title}
                className="w-24 h-14 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">{game.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>{game.playtime} часов сыграно</span>
                  <span>•</span>
                  <span>Последний раз: {game.lastPlayed}</span>
                  <span>•</span>
                  <span>{game.size}</span>
                </div>

                {game.installing && game.installProgress !== undefined && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-steam-light">
                        Установка... {game.installProgress}%
                      </span>
                    </div>
                    <Progress value={game.installProgress} className="h-2" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {game.installed ? (
                  <Button
                    onClick={() => handlePlay(game.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Icon name="Play" size={16} className="mr-2" />
                    Играть
                  </Button>
                ) : game.installing ? (
                  <Button
                    disabled
                    variant="outline"
                    className="border-gray-600"
                  >
                    <Icon
                      name="Download"
                      size={16}
                      className="mr-2 animate-spin"
                    />
                    Установка...
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleInstall(game.id)}
                    variant="outline"
                    className="border-steam-blue text-steam-light hover:bg-steam-blue/20"
                  >
                    <Icon name="Download" size={16} className="mr-2" />
                    Установить
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <Icon name="MoreHorizontal" size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default GameLibrary;
