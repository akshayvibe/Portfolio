import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Music } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";
import { getSectionGradient } from "../../lib/themes";
import { getCurrentlyPlaying, getRecentlyPlayed, getBestImage, type SpotifyTrack } from "../../lib/spotify";

export default function SpotifyWidget() {
  const { colors, mode } = useTheme();
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSpotify() {
      try {
        const nowPlaying = await getCurrentlyPlaying();
        if (nowPlaying?.item) {
          setTrack(nowPlaying.item);
          setIsPlaying(nowPlaying.is_playing);
        } else {
          const recent = await getRecentlyPlayed();
          if (recent) {
            setTrack(recent);
            setIsPlaying(false);
          }
        }
      } catch {
        setTrack(null);
      } finally {
        setLoading(false);
      }
    }

    fetchSpotify();
    const interval = setInterval(fetchSpotify, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      variants={ANIMATION.fadeIn}
      className="bento-card bento-spotify p-5 h-full flex flex-col justify-between"
      style={{
        background: getSectionGradient(colors, mode),
        borderColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
      }}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Music className="w-4 h-4" style={{ color: "#1DB954" }} />
          <span className="text-xs" style={{ color: `${colors.foreground}99` }}>
            {loading ? "Loading..." : isPlaying ? "Now playing on" : track ? "Last played on" : "Spotify"}{" "}
            <span style={{ color: "#1DB954" }} className="font-medium">Spotify</span>
          </span>
        </div>

        {!loading && track ? (
          <a
            href={track.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group"
          >
            <div className="relative flex-shrink-0">
              <img
                src={getBestImage(track.album.images)}
                alt={track.album.name}
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg object-cover shadow-lg"
              />
              {isPlaying && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#1DB954] rounded-full flex items-center justify-center">
                  <div className="flex gap-0.5">
                    <span className="w-0.5 h-2 bg-white rounded-full animate-pulse" />
                    <span className="w-0.5 h-3 bg-white rounded-full animate-pulse delay-75" />
                    <span className="w-0.5 h-2 bg-white rounded-full animate-pulse delay-150" />
                  </div>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="font-medium text-sm truncate group-hover:underline"
                style={{ color: colors.foreground }}
              >
                {track.name}
              </p>
              <p className="text-xs truncate" style={{ color: `${colors.foreground}80` }}>
                {track.artists.map((a) => a.name).join(", ")}
              </p>
              <p className="text-[10px] truncate" style={{ color: `${colors.foreground}60` }}>
                {track.album.name}
              </p>
            </div>
          </a>
        ) : !loading ? (
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
            >
              <Music className="w-5 h-5" style={{ color: `${colors.foreground}40` }} />
            </div>
            <p className="text-xs" style={{ color: `${colors.foreground}60` }}>
              Nothing playing right now
            </p>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
