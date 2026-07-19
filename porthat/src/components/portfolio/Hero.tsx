import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Download, Mail, Calendar, Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";
import { getGradient } from "../../lib/themes";
import type { Profile, Social } from "../../types/portfolio";
import Icon from "./Icon";

interface HeroProps {
  profile: Profile;
  roles: string[];
  socials: Social[];
}

export default function Hero({ profile, roles, socials }: HeroProps) {
  const { colors, mode, setMode } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <motion.div variants={ANIMATION.fadeIn} className="bento-card bento-hero overflow-hidden flex flex-col">
      {/* Banner */}
      <div className="relative h-28 sm:h-32 lg:h-46 flex-shrink-0">
        <img src={profile.banner} alt="Banner" className="w-full h-full object-cover" />
        <button
          onClick={(e) => setMode(mode === "dark" ? "light" : "dark", e)}
          className="absolute top-3 right-3 p-2 rounded-lg transition-colors backdrop-blur-sm hover:bg-white/30 cursor-pointer"
          style={{
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "#fff",
          }}
        >
          {mode === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        {/* Avatar overlapping banner */}
        <div className="absolute -bottom-10 left-5 z-20">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="w-30 h-30 sm:w-30 sm:h-30 rounded-2xl overflow-hidden border-4 shadow-xl"
            style={{ borderColor: colors.background, backgroundColor: colors.background }}
          >
            <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div
        className="flex-1 p-5 pt-14 sm:pt-12"
        style={{
          backgroundColor: mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.6)",
        }}
      >
        <div className="mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold" style={{ color: colors.foreground }}>
              {profile.name}
            </h1>
            <span className="text-xs" style={{ color: `${colors.foreground}80` }}>
              @{profile.handle}
            </span>
            <motion.a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-lg text-s font-medium transition-all duration-200 cursor-pointer border-1 border-blue-500"
              style={{
                backgroundColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                color: `${colors.foreground}b3`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
              }}
            >
              <Download className="w-3 h-3 " />
              Resume
            </motion.a>
          </div>
          <div className="h-5 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-sm sm:text-base"
                style={{ color: `${colors.foreground}99` }}
              >
                {roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: `${colors.foreground}b3` }}>
          {profile.bio}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <motion.a
            href={`mailto:${profile.email}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ background: getGradient(colors), boxShadow: `0 10px 15px -3px ${colors.primary}40` }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-white relative overflow-hidden group transition-all duration-300 hover:shadow-lg cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Calendar className="w-3.5 h-3.5 relative z-10" />
            <span className="relative z-10">Let's talk</span>
          </motion.a>
          <motion.a
            href={`mailto:${profile.email}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium border-2 transition-all duration-300 cursor-pointer"
            style={{
              borderColor: mode === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
              color: colors.foreground,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";
              e.currentTarget.style.borderColor = mode === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = mode === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)";
            }}
          >
            <Mail className="w-3.5 h-3.5" />
            Drop a mail
          </motion.a>
        </div>

        <div>
          <p className="text-xs mb-2" style={{ color: `${colors.foreground}99` }}>
            Find me on the <span style={{ color: colors.foreground }} className="font-medium">internet</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {socials.map((social) => {
              const brandColor = social.color || colors.primary;
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs transition-all duration-200 cursor-pointer"
                  style={{
                    backgroundColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                    color: `${colors.foreground}b3`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
                    e.currentTarget.style.color = colors.foreground;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
                    e.currentTarget.style.color = `${colors.foreground}b3`;
                  }}
                >
                  <Icon name={social.icon} className="w-3.5 h-3.5" style={{ color: brandColor }} />
                  {social.name}
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
