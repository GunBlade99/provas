import { MusicPlayer } from "@/components/music-player";

export default function MusicPage() {
  const tracks = [
    { title: "Pack Rip", src: "/sounds/rip.mp3" },
    {
      title: "SoundHelix Sample",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Music Player</h1>
      <MusicPlayer tracks={tracks} />
    </div>
  );
}
