import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Briefcase } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";
import { getSectionGradient } from "../../lib/themes";
import type { Experience as ExperienceType } from "../../types/portfolio";

interface ExperienceProps {
  experiences: ExperienceType[];
}

export default function Experience({ experiences }: ExperienceProps) {
  const { colors, mode } = useTheme();
  const [expandedExp, setExpandedExp] = useState<number | null>(null);

  return (
    <motion.div
      variants={ANIMATION.fadeIn}
      className="bento-card bento-experience p-5 h-full flex flex-col"
      style={{
        background: getSectionGradient(colors, mode),
        borderColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
      }}
    >
      <div className="flex items-center gap-2 mb-3 flex-shrink-0">
        <div
          className="h-6 w-1 rounded-full"
          style={{ background: `linear-gradient(to bottom, ${colors.accent}, ${colors.secondary})` }}
        />
        <h3 className="text-sm font-semibold" style={{ color: colors.foreground }}>
          Experience
        </h3>
      </div>

      <div className="space-y-2 flex-1 overflow-y-auto pr-0.5" style={{ scrollbarWidth: "none" }}>
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="rounded-xl border overflow-hidden"
            style={{
              backgroundColor: mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.5)",
              borderColor: mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
            }}
          >
            <button
              onClick={() => setExpandedExp(expandedExp === index ? null : index)}
              className="w-full p-2.5 text-left cursor-pointer transition-colors"
              style={{ backgroundColor: "transparent" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <div className="flex items-start justify-between gap-1.5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Briefcase className="w-3 h-3 flex-shrink-0" style={{ color: colors.accent }} />
                    <span className="font-medium text-xs leading-tight" style={{ color: colors.foreground }}>
                      {exp.company}
                    </span>
                  </div>
                  <p className="text-[11px]" style={{ color: `${colors.foreground}b3` }}>{exp.role}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: `${colors.foreground}66` }}>{exp.period}</p>
                </div>
                {exp.details && exp.details.length > 0 && (
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 flex-shrink-0 mt-0.5 ${expandedExp === index ? "rotate-180" : ""}`}
                    style={{ color: `${colors.foreground}66` }}
                  />
                )}
              </div>
            </button>

            <AnimatePresence>
              {expandedExp === index && exp.details && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div
                    className="px-3 pb-3 pt-0 border-t"
                    style={{ borderColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
                  >
                    <ul className="space-y-1 pt-2">
                      {exp.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[11px]" style={{ color: `${colors.foreground}b3` }}>
                          <span style={{ color: colors.accent }} className="mt-0.5">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

