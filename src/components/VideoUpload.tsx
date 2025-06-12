import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface VideoUploadProps {
  onUpload: (videoData: {
    title: string;
    description: string;
    file: File;
  }) => void;
}

const VideoUpload = ({ onUpload }: VideoUploadProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type.startsWith("video/")) {
      setFile(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSubmit = () => {
    if (file && title) {
      onUpload({ title, description, file });
      setTitle("");
      setDescription("");
      setFile(null);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-dark-card border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Icon name="Upload" size={20} className="text-purple-accent" />
          Загрузить видео
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Зона загрузки файла */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? "border-purple-accent bg-purple-accent/10"
              : "border-gray-600 hover:border-gray-500"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {file ? (
            <div className="space-y-2">
              <Icon
                name="CheckCircle"
                size={32}
                className="text-green-500 mx-auto"
              />
              <p className="text-sm text-white">{file.name}</p>
              <p className="text-xs text-gray-400">
                {(file.size / (1024 * 1024)).toFixed(1)} МБ
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <Icon name="Upload" size={32} className="text-gray-400 mx-auto" />
              <p className="text-sm text-gray-400">Перетащите видео сюда или</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("file-input")?.click()}
                className="border-gray-600 text-gray-400 hover:text-white"
              >
                Выберите файл
              </Button>
              <input
                id="file-input"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) handleFileSelect(selectedFile);
                }}
              />
            </div>
          )}
        </div>

        {/* Форма */}
        <div className="space-y-3">
          <div>
            <Label htmlFor="title" className="text-gray-400">
              Название *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите название видео"
              className="bg-dark-bg border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-gray-400">
              Описание
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Расскажите о вашем видео..."
              className="bg-dark-bg border-gray-600 text-white placeholder-gray-400 resize-none"
              rows={3}
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!file || !title}
            className="w-full bg-purple-accent hover:bg-purple-accent/90 disabled:opacity-50"
          >
            <Icon name="Upload" size={16} className="mr-2" />
            Опубликовать
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoUpload;
