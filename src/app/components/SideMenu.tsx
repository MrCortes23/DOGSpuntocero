import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, PawPrint, Heart, UtensilsCrossed, Mail } from "lucide-react";

interface SideMenuProps {
  activeSection: string;
  onSectionClick: (section: string) => void;
}

const menuItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "razas", label: "Razas", icon: PawPrint },
  { id: "cuidados", label: "Cuidados", icon: Heart },
  { id: "alimentacion", label: "Alimentación", icon: UtensilsCrossed },
  { id: "contacto", label: "Contacto", icon: Mail },
];

export function SideMenu({ activeSection, onSectionClick }: SideMenuProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Horseshoe parameters — arc opens to the RIGHT (toward content)
  const radius = 120;
  const totalAngle = 130;
  const startAngle = -65;

  // Collapsed: vertical line positions
  const collapsedSpacing = 56;
  const collapsedTotalHeight = (menuItems.length - 1) * collapsedSpacing;

  const getCollapsedPosition = (index: number) => ({
    x: 0,
    y: index * collapsedSpacing - collapsedTotalHeight / 2,
  });

  // Expanded: horseshoe arc opening RIGHT
  const getExpandedPosition = (index: number) => {
    const angleStep = totalAngle / (menuItems.length - 1);
    const angle = startAngle + angleStep * index;
    const radian = (angle * Math.PI) / 180;
    return {
      x: radius * Math.cos(radian), // bulges RIGHT at angle=0
      y: radius * Math.sin(radian),
    };
  };

  // Scales: center items larger for depth
  const scaleFactors = [1, 1.08, 1.18, 1.08, 1];

  // Bounding box for expanded positions
  const expandedPositions = menuItems.map((_, i) => getExpandedPosition(i));
  const exMinY = Math.min(...expandedPositions.map((p) => p.y));
  const exMaxY = Math.max(...expandedPositions.map((p) => p.y));
  const exMaxX = Math.max(...expandedPositions.map((p) => p.x));
  const containerHeight = Math.max(exMaxY - exMinY + 80, collapsedTotalHeight + 70);

  return (
    <motion.nav
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed left-0 top-0 h-screen z-[110] hidden lg:flex items-center"
    >
      {/* Hover detection zone */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center"
        style={{
          width: isHovered ? `${exMaxX + 60}px` : "72px",
          height: "100%",
          transition: "width 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* 1. Permanent Sidebar Background (The "Fusion" layer) */}
        <div 
          className="absolute left-0 top-0 w-[70px] h-full bg-white border-r border-[#f3f4f6] pointer-events-none"
        />

        {/* 2. Floating expansion panel (The "Glassmorphism" layer) */}
        <motion.div
          className="absolute left-0 top-1/2 rounded-r-3xl pointer-events-none"
          animate={{
            width: isHovered ? `${exMaxX + 50}px` : "70px",
            height: isHovered ? `${containerHeight + 30}px` : "0px",
            y: "-50%",
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(240,248,255,0.75) 50%, rgba(168,230,163,0.15) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(168,230,163,0.3)",
            borderLeft: "none",
            boxShadow: "12px 0 45px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.2) inset",
          }}
        />

        {/* SVG horseshoe arc — visible when expanded */}
        <AnimatePresence>
          {isHovered && (
            <motion.svg
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.08 }}
              className="absolute pointer-events-none"
              style={{
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                width: `${exMaxX + 100}px`,
                height: `${containerHeight + 40}px`,
                overflow: "visible",
              }}
            >
              <defs>
                <linearGradient id="arcGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#A8E6A3" stopOpacity="0.45" />
                  <stop offset="50%" stopColor="#B8E8F0" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#A8E6A3" stopOpacity="0.45" />
                </linearGradient>
                <filter id="arcGlow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Main arc */}
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                d={(() => {
                  const first = getExpandedPosition(0);
                  const last = getExpandedPosition(menuItems.length - 1);
                  const cy = (containerHeight + 40) / 2;
                  const ox = 10;
                  return `M ${first.x + ox} ${first.y + cy} A ${radius} ${radius} 0 0 1 ${last.x + ox} ${last.y + cy}`;
                })()}
                stroke="url(#arcGrad)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                filter="url(#arcGlow)"
              />

              {/* Small connection dots */}
              {menuItems.map((_, index) => {
                const pos = getExpandedPosition(index);
                const cy = (containerHeight + 40) / 2;
                return (
                  <motion.circle
                    key={index}
                    initial={{ r: 0, opacity: 0 }}
                    animate={{ r: 2.5, opacity: 0.4 }}
                    transition={{ delay: 0.15 + index * 0.06 }}
                    cx={pos.x + 10}
                    cy={pos.y + cy}
                    fill="#B8E8F0"
                  />
                );
              })}
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Menu items container */}
        <div
          className="absolute left-0 top-1/2"
          style={{
            width: `${exMaxX + 80}px`,
            height: `${containerHeight + 40}px`,
            transform: "translateY(-50%)",
          }}
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            const collapsed = getCollapsedPosition(index);
            const expanded = getExpandedPosition(index);

            const currentScale = isHovered ? scaleFactors[index] : 1;
            const baseSize = 42;
            const size = baseSize * currentScale;
            const iconSize = 18 * currentScale;

            const cy = (containerHeight + 40) / 2;
            const targetX = isHovered ? expanded.x + 10 : 34;
            const targetY = isHovered ? expanded.y + cy : collapsed.y + cy;

            return (
              <motion.div
                key={item.id}
                animate={{
                  x: targetX - size / 2,
                  y: targetY - size / 2,
                  opacity: 1,
                }}
                initial={{
                  x: 34 - baseSize / 2,
                  y: collapsed.y + cy - baseSize / 2,
                  opacity: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 24,
                  mass: 0.7,
                  delay: isHovered
                    ? index * 0.04
                    : (menuItems.length - 1 - index) * 0.03,
                }}
                className="absolute group"
                style={{ width: size, height: size, zIndex: 10 }}
              >
                <button
                  onClick={() => onSectionClick(item.id)}
                  className="relative flex items-center w-full h-full"
                >
                  {/* Icon circle */}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className={`
                      rounded-full flex items-center justify-center cursor-pointer
                      transition-all duration-300 border
                      ${isActive
                        ? "bg-gradient-to-br from-[#A8E6A3] to-[#c7ecf7] border-[#A8E6A3]/40 shadow-[0_4px_16px_rgba(168,230,163,0.35),0_2px_4px_rgba(0,0,0,0.06)]"
                        : "bg-white/90 border-white/60 shadow-[0_2px_10px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)]"
                      }
                      group-hover:shadow-[0_6px_24px_rgba(168,230,163,0.3),0_2px_8px_rgba(0,0,0,0.08)]
                      group-hover:bg-gradient-to-br group-hover:from-[#A8E6A3]/80 group-hover:to-[#c7ecf7]/80
                      group-hover:border-[#A8E6A3]/30
                    `}
                    style={{ width: size, height: size }}
                  >
                    <Icon
                      style={{ width: iconSize, height: iconSize }}
                      strokeWidth={isActive ? 2.2 : 1.8}
                      className={`transition-colors duration-300 ${isActive
                        ? "text-gray-900"
                        : "text-gray-500 group-hover:text-gray-900"
                        }`}
                    />
                  </motion.div>

                  {/* Label tooltip — only when expanded */}
                  {isHovered && (
                    <div
                      className={`
                        absolute left-full ml-3 px-4 py-1.5 rounded-xl
                        bg-white/95 backdrop-blur-sm
                        border border-white/60
                        shadow-[0_4px_16px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)]
                        opacity-0 group-hover:opacity-100
                        transition-all duration-300 pointer-events-none
                        whitespace-nowrap
                        translate-x-1 group-hover:translate-x-0
                        ${isActive ? "border-[#A8E6A3]/30" : ""}
                      `}
                    >
                      <span
                        className={`text-[13px] tracking-wide transition-all duration-300 ${isActive
                          ? "font-semibold text-gray-900"
                          : "font-medium text-gray-600"
                          }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Active section indicator — left edge */}
        {!isHovered && (
          <motion.div
            className="absolute left-0 w-[3px] rounded-r-full"
            style={{
              background: "linear-gradient(180deg, #A8E6A3, #B8E8F0)",
              boxShadow: "0 0 8px rgba(168,230,163,0.4)",
            }}
            animate={{
              top: `calc(50% + ${getCollapsedPosition(menuItems.findIndex((i) => i.id === activeSection)).y - 18}px)`,
              height: "36px",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          />
        )}
      </div>
    </motion.nav>
  );
}
