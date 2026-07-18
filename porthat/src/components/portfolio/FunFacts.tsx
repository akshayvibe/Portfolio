import { motion } from "framer-motion";
import { Coffee, Trophy, Code, GitCommit } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";
import { getSectionGradient } from "../../lib/themes";
import type { FunFact } from "../../types/portfolio";

const ICON_MAP: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  coffee: Coffee,
  trophy: Trophy,
  code: Code,
  gitCommit: GitCommit,
};

interface FunFactsProps {
  funFacts: FunFact[];
}

export default function FunFacts({ funFacts }: FunFactsProps) {
  const { colors, mode } = useTheme();

  return (
    <motion.div
      variants={ANIMATION.fadeIn}
      className="bento-card bento-funfacts p-5 h-full"
      style={{
        background: getSectionGradient(colors, mode),
        borderColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div
          className="h-6 w-1 rounded-full"
          style={{ background: `linear-gradient(to bottom, ${colors.accent}, ${colors.highlight})` }}
        />
        <h3 className="text-sm font-semibold" style={{ color: colors.foreground }}>
          Fun Facts
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3 h-[calc(100%-40px)]">
        {funFacts.map((fact, index) => {
          const IconComponent = ICON_MAP[fact.icon];
          return (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center p-3 rounded-xl border text-center"
              style={{
                backgroundColor: mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.5)",
                borderColor: mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
              }}
            >
              {IconComponent && (
                <IconComponent
                  className="w-4 h-4 mb-2"
                  style={{ color: colors.primary }}
                />
              )}
              <span
                className="fun-fact-value text-lg font-bold"
                style={{
                  color: colors.foreground,
                  animationDelay: `${index * 0.15}s`,
                }}
              >
                {fact.value}
              </span>
              <span className="text-[10px] mt-1" style={{ color: `${colors.foreground}80` }}>
                {fact.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
