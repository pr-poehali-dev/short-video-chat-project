import { useState, useRef, useEffect } from "react";
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

interface VideoPlayerProps {
  video: Video;
  onLike: (videoId: string) => void;
  onShare: (videoId: string) => void;
}

const VideoPlayer = ({ video, onLike, onShare }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showControls && isPlaying) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [showControls, isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoClick = () => {
    setShowControls(true);
    togglePlay();
  };

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        className="video-player"
        src={video.url}
        loop
        playsInline
        onClick={handleVideoClick}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="video-overlay" />

      {/* Элементы управления */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
      >
        {!isPlaying && (
          <Button
            size="lg"
            variant="ghost"
            className="bg-black/50 hover:bg-black/70 text-white rounded-full p-4"
            onClick={togglePlay}
          >
            <Icon name="Play" size={48} />
          </Button>
        )}
      </div>

      {/* Информация о видео */}
      <div className="absolute bottom-20 left-4 right-20 text-white">
        <h3 className="font-semibold text-lg mb-1">{video.title}</h3>
        <p className="text-sm opacity-80">@{video.author}</p>
      </div>

      {/* Боковые кнопки */}
      <div className="absolute bottom-20 right-4 flex flex-col gap-4">
        <Button
          size="sm"
          variant="ghost"
          className="bg-black/50 hover:bg-black/70 text-white rounded-full p-3 flex flex-col items-center gap-1"
          onClick={() => onLike(video.id)}
        >
          <Icon
            name={video.isLiked ? "Heart" : "Heart"}
            size={24}
            className={video.isLiked ? "fill-red-500 text-red-500" : ""}
          />
          <span className="text-xs">{video.likes}</span>
        </Button>

        <Button
          size="sm"
          variant="ghost"
          className="bg-black/50 hover:bg-black/70 text-white rounded-full p-3"
          onClick={() => onShare(video.id)}
        >
          <Icon name="Share" size={24} />
        </Button>

        <Button
          size="sm"
          variant="ghost"
          className="bg-black/50 hover:bg-black/70 text-white rounded-full p-3"
        >
          <Icon name="MessageCircle" size={24} />
        </Button>
      </div>
    </div>
  );
};

export default VideoPlayer;
