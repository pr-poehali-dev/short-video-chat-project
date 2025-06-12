import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface Game {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  category: string;
  tags: string[];
}

interface GameStoreProps {
  onOpenLibrary: () => void;
  onOpenFriends: () => void;
}

const GameStore = ({ onOpenLibrary, onOpenFriends }: GameStoreProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");

  const games: Game[] = [
    {
      id: "1",
      title: "Cyberpunk 2077",
      price: 1299,
      originalPrice: 2999,
      rating: 4.2,
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop",
      category: "RPG",
      tags: ["Киберпанк", "Открытый мир", "Шутер"],
    },
    {
      id: "2",
      title: "The Witcher 3",
      price: 899,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=225&fit=crop",
      category: "RPG",
      tags: ["Фэнтези", "Открытый мир", "RPG"],
    },
    {
      id: "3",
      title: "Counter-Strike 2",
      price: 0,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop",
      category: "Шутер",
      tags: ["Мультиплеер", "Соревновательный", "FPS"],
    },
    {
      id: "4",
      title: "Baldur's Gate 3",
      price: 2399,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=225&fit=crop",
      category: "RPG",
      tags: ["D&D", "Пошаговый", "Кооператив"],
    },
  ];

  const categories = ["Все", "RPG", "Шутер", "Стратегия", "Инди"];

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Все" || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-steam-bg">
      {/* Навигация */}
      <header className="bg-steam-card border-b border-gray-700 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold text-white">МАГАЗИН</h1>
            <nav className="hidden md:flex gap-4">
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                Рекомендуемые
              </Button>
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                Категории
              </Button>
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                Скидки
              </Button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Input
                placeholder="Поиск игр..."
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

            <Button
              onClick={onOpenLibrary}
              variant="ghost"
              className="text-steam-light hover:text-white"
            >
              <Icon name="Library" size={16} className="mr-2" />
              Библиотека
            </Button>

            <Button
              onClick={onOpenFriends}
              variant="ghost"
              className="text-steam-light hover:text-white"
            >
              <Icon name="Users" size={16} className="mr-2" />
              Друзья
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Рекомендуемые игры */}
        <section className="mb-8">
          <div className="relative bg-gradient-to-r from-steam-blue to-steam-light rounded-lg p-8 mb-6">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">
                Cyberpunk 2077
              </h2>
              <p className="text-white/90 mb-4">
                Открытый мир киберпанка ждет вас
              </p>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-white">1299 ₽</span>
                <span className="text-lg text-white/70 line-through">
                  2999 ₽
                </span>
                <Button className="bg-green-600 hover:bg-green-700">
                  В корзину
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Категории */}
        <section className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-steam-blue text-white"
                    : "border-gray-600 text-gray-400 hover:text-white"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Сетка игр */}
        <section className="game-grid">
          {filteredGames.map((game) => (
            <Card key={game.id} className="game-card border-gray-700">
              <div className="relative">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={12}
                      className={`${
                        i < Math.floor(game.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-500"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-white mb-2">{game.title}</h3>

                <div className="flex flex-wrap gap-1 mb-3">
                  {game.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-steam-blue/20 text-steam-light px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {game.price === 0 ? (
                      <span className="text-green-400 font-bold">
                        Бесплатно
                      </span>
                    ) : (
                      <>
                        <span className="text-white font-bold">
                          {game.price} ₽
                        </span>
                        {game.originalPrice && (
                          <span className="text-gray-500 text-sm line-through">
                            {game.originalPrice} ₽
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    {game.price === 0 ? "Играть" : "Купить"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
};

export default GameStore;
