"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface GlowCardProps {
    children: ReactNode;
    className?: string;
    glowColor?: string;
    glowColorSecondary?: string;
}

export default function GlowCard({
    children,
    className = "",
    glowColor = "rgba(0, 255, 255, 0.5)",
    glowColorSecondary = "rgba(139, 92, 246, 0.5)"
}: GlowCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const handleMouseLeave = () => {
        mouseX.set(ref.current?.offsetWidth ? ref.current.offsetWidth / 2 : 0);
        mouseY.set(ref.current?.offsetHeight ? ref.current.offsetHeight / 2 : 0);
    };

    // Smooth spring for mouse position
    const springConfig = { damping: 30, stiffness: 200 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative group overflow-hidden ${className}`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            {/* Animated gradient border */}
            <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: `
                        radial-gradient(
                            400px circle at ${mouseX.get()}px ${mouseY.get()}px,
                            ${glowColor},
                            transparent 40%
                        )
                    `,
                }}
            />

            {/* Glow effect that follows cursor */}
            <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: useTransform(
                        [x, y],
                        ([latestX, latestY]) => `
                            radial-gradient(
                                300px circle at ${latestX}px ${latestY}px,
                                ${glowColor},
                                ${glowColorSecondary} 50%,
                                transparent 80%
                            )
                        `
                    ),
                    filter: "blur(40px)",
                }}
            />

            {/* Inner content with glass effect */}
            <div className="relative z-10 glass rounded-2xl h-full">
                {children}
            </div>

            {/* Border gradient */}
            <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                    background: "transparent",
                    border: "1px solid transparent",
                    backgroundImage: useTransform(
                        [x, y],
                        ([latestX, latestY]) => `
                            linear-gradient(var(--background), var(--background)),
                            radial-gradient(
                                200px circle at ${latestX}px ${latestY}px,
                                ${glowColor},
                                transparent 50%
                            )
                        `
                    ),
                    backgroundClip: "padding-box, border-box",
                    backgroundOrigin: "padding-box, border-box",
                }}
            />
        </motion.div>
    );
}
