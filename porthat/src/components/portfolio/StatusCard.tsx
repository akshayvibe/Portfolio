import { motion } from "framer-motion";
import { MapPin, Sparkles } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";
import { getSectionGradient } from "../../lib/themes";
import type { StatusInfo } from "../../types/portfolio";

interface StatusCardProps {
  status: StatusInfo;
  location: string;
}

export default function StatusCard({ status, location }: StatusCardProps) {
  const { colors, mode } = useTheme();

  return (
    <motion.div
      variants={ANIMATION.fadeIn}
      className="bento-card bento-status p-5 flex flex-col justify-between h-full"
      style={{
        background: getSectionGradient(colors, mode),
        borderColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
      }}
    >
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div
            className="status-dot w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{
              backgroundColor: status.available ? "#22c55e" : "#f59e0b",
              color: status.available ? "#22c55e40" : "#f59e0b40",
            }}
          />
          <span className="text-xs font-medium uppercase tracking-wider" style={{ color: status.available ? "#22c55e" : "#f59e0b" }}>
            {status.label}
          </span>
        </div>

        <p className="text-sm leading-relaxed mb-4" style={{ color: `${colors.foreground}99` }}>
          {status.currentFocus}
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5" style={{ color: colors.primary }} />
          <span className="text-xs" style={{ color: `${colors.foreground}80` }}>
            {location}
          </span>
        </div>

        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{
            backgroundColor: mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
          }}
        >
          <Sparkles className="w-3.5 h-3.5" style={{ color: colors.highlight }} />
          <span className="text-xs" style={{ color: `${colors.foreground}b3` }}>
            Looking for opportunities
          </span>
        </div>
      </div>
    </motion.div>
  );
}
