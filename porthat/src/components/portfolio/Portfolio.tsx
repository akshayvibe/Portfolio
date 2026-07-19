import { motion } from "framer-motion";
import { ThemeProvider, useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";
import {
  Hero,
  Education,
  Projects,
  SkillSlider,
  Footer,
  GitHubChart,
  SpotifyWidget,
  IllustrationOverlay,
  Experience,
} from "./index";
import type { PortfolioData } from "../../types/portfolio";

interface PortfolioProps {
  data: PortfolioData;
}

function PortfolioContent({ data }: PortfolioProps) {
  const { colors, mode } = useTheme();

  return (
    <div style={{ backgroundColor: colors.background, minHeight: "100vh" }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${colors.foreground}14 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      <motion.div
        className="relative bento-container"
        initial="hidden"
        animate="visible"
        variants={ANIMATION.stagger}
      >
        {/* Bento Grid */}
        <div className="bento-grid">
          {/* Row 1: Hero (3 cols) + Experience (1 col) */}
          <Hero profile={data.profile} roles={data.roles} socials={data.socials} />
          <Experience experiences={data.experience} />

          {/* Row 2: Skills (3 cols) + Spotify (1 col) */}
          <motion.div
            variants={ANIMATION.fadeIn}
            className="bento-card bento-skills p-5"
            style={{
              background: mode === "dark"
                ? `linear-gradient(to bottom right, ${colors.secondary}15, transparent, ${colors.primary}10)`
                : `linear-gradient(to bottom right, ${colors.muted}80, white, ${colors.highlight}50)`,
              borderColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
            }}
          >
            <p className="text-xs sm:text-sm mb-2 sm:mb-3" style={{ color: `${colors.foreground}99` }}>
              My <span style={{ color: colors.foreground }} className="font-medium">skills</span>
            </p>
            <SkillSlider skills={data.skills} />
          </motion.div>
          <SpotifyWidget />

          {/* Row 3: GitHub Contributions (2 cols) + Education (2 cols) */}
          <GitHubChart username={data.github} />
          <Education education={data.education} />

          {/* Row 4: Projects (full width) */}
          <Projects projects={data.projects} />

          {/* Row 5: Footer */}
          <div className="bento-footer">
            <Footer quotes={data.quotes} handle={data.profile.handle} />
          </div>
        </div>
      </motion.div>

      {data.illustration && <IllustrationOverlay />}
    </div>
  );
}

export default function Portfolio({ data }: PortfolioProps) {
  return (
    <ThemeProvider initialTheme={data.theme}>
      <PortfolioContent data={data} />
    </ThemeProvider>
  );
}
