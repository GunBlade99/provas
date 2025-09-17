import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

export const MusicPlayer = ({ tracks }) => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const handlePrev = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => {
      handleNext();
    };
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("ended", onEnded);
    };
  }, [tracks.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.load();
    if (isPlaying) {
      audio.play();
    }
  }, [currentTrack]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <Button onClick={handlePrev}>Prev</Button>
        <Button onClick={togglePlayPause}>{isPlaying ? "Pause" : "Play"}</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
      <p className="font-bold">{tracks[currentTrack].title}</p>
      <audio ref={audioRef} src={tracks[currentTrack].src} />
    </div>
  );
};

