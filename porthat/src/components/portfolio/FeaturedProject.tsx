import { motion } from "framer-motion";
import { Github, ExternalLink, MoveUpRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";
import { getSectionGradient, getGlowColor } from "../../lib/themes";
import type { Project } from "../../types/portfolio";

interface FeaturedProjectProps {
  project: Project;
}

export default function FeaturedProject({ project }: FeaturedProjectProps) {
  const { colors, mode } = useTheme();

  return (
    <motion.div
      variants={ANIMATION.fadeIn}
      className="bento-card bento-featured relative overflow-hidden"
      style={{
        background: getSectionGradient(colors, mode),
        borderColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
      }}
    >
      <div
        className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: getGlowColor(colors, mode) }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row gap-5 p-5 lg:p-6">
        {/* Project Image */}
        <div className="relative w-full lg:w-2/5 h-48 lg:h-56 rounded-xl overflow-hidden flex-shrink-0 group">
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent z-10" />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 z-20">
            <span
              className="text-[10px] px-2 py-1 rounded-full font-semibold uppercase tracking-wider backdrop-blur-md"
              style={{
                backgroundColor: `${colors.primary}cc`,
                color: "#fff",
              }}
            >
              Featured
            </span>
          </div>
        </div>

        {/* Project Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div
                className="h-5 w-1 rounded-full"
                style={{ background: `linear-gradient(to bottom, ${colors.highlight}, ${colors.primary})` }}
              />
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: colors.primary }}>
                Spotlight
              </span>
            </div>

            <h3 className="text-xl lg:text-2xl font-bold mb-2" style={{ color: colors.foreground }}>
              {project.title}
            </h3>

            <p className="text-sm leading-relaxed mb-4" style={{ color: `${colors.foreground}99` }}>
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2.5 py-1 rounded-full font-medium"
                  style={{
                    backgroundColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                    color: `${colors.foreground}b3`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer"
                style={{
                  borderColor: mode === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)",
                  color: colors.foreground,
                  backgroundColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                }}
              >
                <Github className="w-3.5 h-3.5" />
                Source Code
              </motion.a>
            )}
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-white cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </motion.a>
            )}
            <motion.span
              className="inline-flex items-center gap-1 text-xs font-medium ml-auto cursor-pointer"
              style={{ color: colors.primary }}
              whileHover={{ x: 3 }}
            >
              View Project
              <MoveUpRight className="w-3 h-3" />
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
