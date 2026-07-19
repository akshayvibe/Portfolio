import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";
import { getSectionGradient } from "../../lib/themes";
import { GitCommitHorizontal } from "lucide-react";

interface GitHubChartProps {
  username: string;
}

export default function GitHubChart({ username }: GitHubChartProps) {
  const { colors, mode } = useTheme();
  const chartColor = colors.primary.replace("#", "");

  return (
    <motion.div
      variants={ANIMATION.fadeIn}
      className="bento-card bento-github p-4 sm:p-5 flex flex-col h-full"
      style={{
        background: getSectionGradient(colors, mode),
        borderColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div
          className="h-6 w-1 rounded-full"
          style={{ background: `linear-gradient(to bottom, ${colors.primary}, ${colors.secondary})` }}
        />
        <h3 className="text-sm sm:text-base font-semibold" style={{ color: colors.foreground }}>
          Contributions
        </h3>
        <span className="text-xs ml-1" style={{ color: `${colors.foreground}66` }}>
          @{username}
        </span>
        <GitCommitHorizontal
          className="w-4 h-4 ml-auto"
          style={{ color: `${colors.foreground}44` }}
        />
      </div>

      {/* Chart — natural size, no zoom, no maxHeight */}
      <div className="flex-1 flex items-center overflow-hidden">
        <img
          src={`https://ghchart.rshah.org/${chartColor}/${username}`}
          alt="GitHub Contributions"
          className="w-full h-auto"
          style={{
            filter: mode === "dark" ? "invert(1) hue-rotate(180deg)" : "none",
            display: "block",
            objectFit: "contain",
          }}
        />
      </div>
    </motion.div>
  );
}
