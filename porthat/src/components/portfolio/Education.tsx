import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, GraduationCap } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";
import { getSectionGradient, getGlowColor } from "../../lib/themes";
import type { Education as EducationType } from "../../types/portfolio";

interface EducationProps {
  education: EducationType[];
}

export default function Education({ education }: EducationProps) {
  const { colors, mode } = useTheme();
  const [expandedEdu, setExpandedEdu] = useState<number | null>(null);

  return (
    <motion.div
      variants={ANIMATION.fadeIn}
      className="bento-card bento-education p-5 h-full relative overflow-hidden"
      style={{
        background: getSectionGradient(colors, mode),
        borderColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
      }}
    >
      <div
        className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl pointer-events-none"
        style={{ background: getGlowColor(colors, mode) }}
      />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div
            className="h-6 w-1 rounded-full"
            style={{ background: `linear-gradient(to bottom, ${colors.highlight}, ${colors.accent})` }}
          />
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold" style={{ color: colors.foreground }}>
            Education
          </h3>
        </div>

        <div className="space-y-2.5">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="rounded-xl border overflow-hidden transition-all backdrop-blur-md"
              style={{
                backgroundColor: mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.5)",
                borderColor: mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${colors.highlight}50`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
              }}
            >
              <button
                onClick={() => setExpandedEdu(expandedEdu === index ? null : index)}
                className="w-full p-3 text-left transition-colors cursor-pointer"
                style={{ backgroundColor: "transparent" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <GraduationCap className="w-3.5 h-3.5" style={{ color: colors.highlight }} />
                      <span className="font-medium text-sm sm:text-base" style={{ color: colors.foreground }}>
                        {edu.institution}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm" style={{ color: `${colors.foreground}b3` }}>
                      {edu.degree} in {edu.field}
                    </p>
                    {edu.grade && (
                      <p className="text-xs sm:text-sm mt-0.5" style={{ color: `${colors.foreground}80` }}>
                        Grade: {edu.grade}
                      </p>
                    )}
                  </div>
                  <div className="hidden sm:block text-right flex-shrink-0">
                    <p className="text-xs sm:text-sm" style={{ color: `${colors.foreground}cc` }}>{edu.period}</p>
                    <p className="text-xs sm:text-sm" style={{ color: `${colors.foreground}80` }}>{edu.location}</p>
                  </div>
                  {edu.details && edu.details.length > 0 && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 flex-shrink-0 ${expandedEdu === index ? "rotate-180" : ""}`}
                      style={{ color: `${colors.foreground}66` }}
                    />
                  )}
                </div>
              </button>

              {edu.details && edu.details.length > 0 && (
                <AnimatePresence>
                  {expandedEdu === index && (
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
                        <ul className="space-y-1.5 pt-2.5">
                          {edu.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-xs sm:text-sm" style={{ color: `${colors.foreground}b3` }}>
                              <span style={{ color: colors.highlight }} className="mt-1">•</span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
