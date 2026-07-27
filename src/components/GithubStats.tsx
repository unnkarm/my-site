import React, { useState, useEffect } from "react";
import { FadeIn } from "./MotionReveal";
import { Github, ExternalLink } from "lucide-react";

interface GithubStatsProps {
  username?: string;
}

export default function GithubStats({ username = "unnkarm" }: GithubStatsProps) {
  const [stats, setStats] = useState<{ publicRepos: number; followers: number } | null>(null);

  useEffect(() => {
    async function fetchGithubUserData() {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (res.ok) {
          const data = await res.json();
          setStats({
            publicRepos: data.public_repos ?? 12,
            followers: data.followers ?? 10,
          });
        }
      } catch (e) {
        console.warn("Could not fetch GitHub user data:", e);
      }
    }
    fetchGithubUserData();
  }, [username]);

  return (
    <section id="github-activity" className="py-10 px-6 md:px-12 bg-white relative overflow-hidden select-none border-t border-neutral-100">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="rounded-2xl border border-neutral-200/80 bg-neutral-50/60 p-5 md:p-6 shadow-xs">
          {/* Minimal Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                <Github className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-black tracking-tight">GitHub Activity</h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="flex items-center gap-2 text-[11px] font-medium text-neutral-500">
                  <span>{stats?.publicRepos ?? "12"} Public Repos</span>
                  <span>•</span>
                  <span>{stats?.followers ?? "10"} Followers</span>
                </div>
              </div>
            </div>

            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-neutral-200 rounded-full text-xs font-semibold text-neutral-700 hover:border-blue-400 hover:text-blue-600 transition-all cursor-pointer shadow-xs"
            >
              <span>@{username}</span>
              <ExternalLink className="w-3 h-3 text-neutral-400" />
            </a>
          </div>

          {/* Minimal Contribution Heatmap */}
          <div className="w-full overflow-x-auto pt-1">
            <img
              src={`https://ghchart.rshah.org/2563eb/${username}`}
              alt={`${username}'s GitHub Contributions`}
              className="w-full min-w-[550px] opacity-90 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
