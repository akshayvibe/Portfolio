import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";
import { getSectionGradient } from "../../lib/themes";

const CHESS_PIECES = ["♔", "♕", "♗", "♘", "♖", "♙"];

export default function ChessCard() {
  const { colors, mode } = useTheme();

  return (
    <motion.div
      variants={ANIMATION.fadeIn}
      className="bento-card bento-chess p-5 flex flex-col justify-between h-full relative overflow-hidden"
      style={{
        background: getSectionGradient(colors, mode),
        borderColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
      }}
    >
      {/* Mini chess board pattern background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
          {Array.from({ length: 64 }).map((_, i) => {
            const row = Math.floor(i / 8);
            const col = i % 8;
            const isDark = (row + col) % 2 === 1;
            return (
              <div
                key={i}
                className="chess-board-cell"
                style={{
                  backgroundColor: isDark ? colors.foreground : "transparent",
                  animationDelay: `${(i * 0.05)}s`,
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div
            className="h-6 w-1 rounded-full"
            style={{ background: `linear-gradient(to bottom, ${colors.highlight}, ${colors.accent})` }}
          />
          <h3 className="text-sm font-semibold" style={{ color: colors.foreground }}>
            Chess
          </h3>
        </div>

        <p className="text-xs leading-relaxed mb-4" style={{ color: `${colors.foreground}80` }}>
          Champion of the school chess club. Strategy is everything.
        </p>
      </div>

      {/* Floating chess pieces */}
      <div className="relative z-10 flex items-end justify-center gap-3 pt-2">
        {CHESS_PIECES.slice(0, 3).map((piece, i) => (
          <motion.span
            key={i}
            className="chess-piece text-3xl select-none"
            style={{
              color: `${colors.primary}${i === 1 ? "cc" : "80"}`,
              animationDelay: `${i * 0.6}s`,
              filter: `drop-shadow(0 2px 8px ${colors.primary}40)`,
            }}
            whileHover={{ scale: 1.3, rotate: 10 }}
          >
            {piece}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
