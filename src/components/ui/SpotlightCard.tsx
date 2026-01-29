"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, ReactNode } from "react";

interface SpotlightCardProps {
    children: ReactNode;
    className?: string;
    spotlightColor?: string;
    borderColor?: string;
}

export default function SpotlightCard({
    children,
    className = "",
    spotlightColor = "rgba(0, 255, 255, 0.15)",
    borderColor = "rgba(0, 255, 255, 0.2)",
}: SpotlightCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 200 };
    const spotlightXSpring = useSpring(mouseX, springConfig);
    const spotlightYSpring = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-sm ${className}`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            {/* Animated border */}
            <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ border: `1px solid` }}
                animate={{
                    borderColor: isHovered ? borderColor : "rgba(255,255,255,0.05)",
                }}
            />

            {/* Moving spotlight */}
            <motion.div
                className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: useTransform(
                        [spotlightXSpring, spotlightYSpring],
                        ([x, y]) => `
                            radial-gradient(
                                500px circle at ${x}px ${y}px,
                                ${spotlightColor},
                                transparent 50%
                            )
                        `
                    ),
                }}
            />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}

// Animated background lines for cards
export function AnimatedLines({ className = "" }: { className?: string }) {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute h-px bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent"
                    style={{
                        top: `${20 + i * 20}%`,
                        left: 0,
                        right: 0,
                    }}
                    animate={{
                        x: ["-100%", "100%"],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
}
