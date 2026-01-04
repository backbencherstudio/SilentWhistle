"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function WaveformPlayer({ audioUrl }: { audioUrl: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00");

  useEffect(() => {
    if (!containerRef.current) return;

    waveSurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#cbd5e1",
      progressColor: "#22c55e",
      cursorColor: "transparent",
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      height: 70,
    });

    waveSurferRef.current.load(audioUrl);

    waveSurferRef.current.on("audioprocess", () => {
      const time = waveSurferRef.current?.getCurrentTime() || 0;
      setCurrentTime(formatTime(time));
    });

    waveSurferRef.current.on("finish", () => {
      setIsPlaying(false);
    });

    return () => {
      waveSurferRef.current?.destroy();
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (!waveSurferRef.current) return;
    waveSurferRef.current.playPause();
    setIsPlaying(waveSurferRef.current.isPlaying());
  };

  const toggleMute = () => {
    if (!waveSurferRef.current) return;

    const newMuted = !isMuted;
    waveSurferRef.current.setMuted(newMuted);
    setIsMuted(newMuted);
  };

  return (
    <div className="flex items-center gap-4 w-full bg-[#202020] text-white rounded-full px-2 py-2 h-10">
      {/* Play Button */}
      <button
        onClick={togglePlay}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-400 transition"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>

      {/* Waveform */}
      <div className="flex-1">
        <div ref={containerRef} />
      </div>

      {/* Time */}
      <span className="text-sm opacity-80 w-12 text-right">{currentTime}</span>

      {/* Volume Icon */}
      <button onClick={toggleMute} className="opacity-80 hover:opacity-100">
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </div>
  );
}

function formatTime(sec: number) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}
