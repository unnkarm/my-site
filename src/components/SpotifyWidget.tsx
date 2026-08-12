/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Play, Pause, Disc } from "lucide-react";

export default function SpotifyWidget() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [songProgress, setSongProgress] = useState(35); // percentage

  // Simulate progress bar increment
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setSongProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const mockSong = {
    title: "Intro",
    artist: "The xx",
    album: "xx",
    albumArt: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=120&h=120",
    spotifyUrl: "https://open.spotify.com/track/2usrT3Z35Wcy824j497R3b",
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-[280px] bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-neutral-150 shadow-lg md:block hidden select-none">
      <div className="flex items-center gap-3.5">
        {/* Album Art Cover */}
        <div className="relative group w-12 h-12 rounded-lg overflow-hidden border border-neutral-100 flex-shrink-0">
          <img
            src={mockSong.albumArt}
            alt={mockSong.album}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isPlaying ? "animate-[spin_10s_linear_infinite]" : ""
            }`}
          />
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-white fill-white" />
            ) : (
              <Play className="w-4 h-4 text-white fill-white" />
            )}
          </button>
        </div>

        {/* Details & Equalizer */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <Disc className={`w-3.5 h-3.5 text-green-500 ${isPlaying ? "animate-spin" : ""}`} />
            <span className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">
              {isPlaying ? "NOW PLAYING" : "PAUSED"}
            </span>
          </div>

          <a
            href={mockSong.spotifyUrl}
            target="_blank"
            rel="noreferrer"
            className="block text-xs font-bold text-neutral-800 hover:text-green-500 transition-colors truncate"
          >
            {mockSong.title}
          </a>
          <p className="text-[10px] text-neutral-500 font-semibold truncate">
            {mockSong.artist}
          </p>
        </div>

        {/* Equalizer Waveform Bars */}
        {isPlaying && (
          <div className="flex items-end gap-[2px] h-3.5 pr-1 shrink-0">
            <span className="w-[2px] bg-green-500 rounded-full animate-[bounce_0.8s_infinite_0.1s]" style={{ height: "40%" }} />
            <span className="w-[2px] bg-green-500 rounded-full animate-[bounce_0.6s_infinite_0.3s]" style={{ height: "80%" }} />
            <span className="w-[2px] bg-green-500 rounded-full animate-[bounce_0.9s_infinite_0.5s]" style={{ height: "50%" }} />
          </div>
        )}
      </div>

      {/* Track progress indicator */}
      {isPlaying && (
        <div className="w-full bg-neutral-100 h-[2px] rounded-full mt-3 overflow-hidden">
          <div
            className="bg-green-500 h-full transition-all duration-1000 ease-linear"
            style={{ width: `${songProgress}%` }}
          />
        </div>
      )}
    </div>
  );
}
