import { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Video {
  id: string;
  url: string;
  title: string;
  author: string;
  likes: number;
  isLiked: boolean;
}

interface VideoFeedProps {
  onOpenChat: () => void;
  onOpenUpload: () => void;
}

const VideoFeed = ({ onOpenChat, onOpenUpload }: VideoFeedProps) => {
  const [videos, setVideos] = useState<Video[]>([
    {
      id: "1",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      title: "Большой кролик Банни 🐰",
      author: "студия_анимации",
      likes: 1247,
      isLiked: false,
    },
    {
      id: "2",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      title: "Сон слонов 🐘",
      author: "креативная_студия",
      likes: 856,
      isLiked: true,
    },
    {
      id: "3",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      title: "Для больших пламен 🔥",
      author: "огненный_контент",
      likes: 2103,
      isLiked: false,
    },
  ]);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleLike = (videoId: string) => {
    setVideos(
      videos.map((video) =>
        video.id === videoId
          ? {
              ...video,
              isLiked: !video.isLiked,
              likes: video.isLiked ? video.likes - 1 : video.likes + 1,
            }
          : video,
      ),
    );
  };

  const handleShare = (videoId: string) => {
    const video = videos.find((v) => v.id === videoId);
    if (video) {
      navigator
        .share?.({
          title: video.title,
          text: `Посмотрите это видео: ${video.title}`,
          url: window.location.href,
        })
        .catch(() => {
          // Fallback для браузеров без поддержки Web Share API
          navigator.clipboard.writeText(window.location.href);
        });
    }
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        nextVideo();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        prevVideo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* Текущее видео */}
      <VideoPlayer
        video={videos[currentVideoIndex]}
        onLike={handleLike}
        onShare={handleShare}
      />

      {/* Кнопки навигации */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
        <Button
          size="sm"
          variant="ghost"
          onClick={prevVideo}
          className="bg-black/50 hover:bg-black/70 text-white rounded-full p-3"
        >
          <Icon name="ChevronUp" size={24} />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={nextVideo}
          className="bg-black/50 hover:bg-black/70 text-white rounded-full p-3"
        >
          <Icon name="ChevronDown" size={24} />
        </Button>
      </div>

      {/* Кнопки интерфейса */}
      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={onOpenChat}
          className="bg-black/50 hover:bg-black/70 text-white rounded-full p-3"
        >
          <Icon name="MessageCircle" size={20} />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={onOpenUpload}
          className="bg-black/50 hover:bg-black/70 text-white rounded-full p-3"
        >
          <Icon name="Plus" size={20} />
        </Button>
      </div>

      {/* Индикатор видео */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
        {videos.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentVideoIndex ? "bg-purple-accent" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Инструкция */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center text-white/70 text-sm">
        <p>↑↓ для навигации • Нажмите на видео для паузы</p>
      </div>
    </div>
  );
};

export default VideoFeed;
