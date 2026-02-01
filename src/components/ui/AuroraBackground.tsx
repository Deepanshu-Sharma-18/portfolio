"use client";

import { motion } from "framer-motion";

interface AuroraBackgroundProps {
    className?: string;
    intensity?: "low" | "medium" | "high";
}

export default function AuroraBackground({
    className = "",
    intensity = "medium"
}: AuroraBackgroundProps) {
    const opacityMap = {
        low: 0.15,
        medium: 0.25,
        high: 0.4
    };

    const baseOpacity = opacityMap[intensity];

    return (
        <div className={`aurora-bg ${className}`}>
            {/* Primary cyan blob */}
            <motion.div
                className="aurora-blob"
                style={{
                    background: "linear-gradient(135deg, rgba(0, 255, 255, 0.6), transparent)",
                    top: "-20%",
                    right: "-15%",
                    opacity: baseOpacity,
                    willChange: "transform, opacity",
                }}
                animate={{
                    scale: [1, 1.1, 0.95, 1],
                    rotate: [0, 180, 360],
                    x: [0, 30, -20, 0],
                    y: [0, -20, 10, 0],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Secondary purple blob */}
            <motion.div
                className="aurora-blob"
                style={{
                    background: "linear-gradient(135deg, rgba(139, 92, 246, 0.6), transparent)",
                    bottom: "-15%",
                    left: "-15%",
                    width: "55vmax",
                    height: "55vmax",
                    opacity: baseOpacity * 0.9,
                    willChange: "transform, opacity",
                }}
                animate={{
                    scale: [1, 0.95, 1.05, 1],
                    rotate: [0, -180, -360],
                    x: [0, -30, 20, 0],
                    y: [0, 30, -10, 0],
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Tertiary gold/amber blob */}
            <motion.div
                className="aurora-blob hidden md:block" // Hide on mobile for performance
                style={{
                    background: "linear-gradient(135deg, rgba(245, 197, 66, 0.4), transparent)",
                    top: "35%",
                    left: "25%",
                    width: "35vmax",
                    height: "35vmax",
                    opacity: baseOpacity * 0.6,
                    willChange: "transform, opacity",
                }}
                animate={{
                    scale: [1, 1.15, 0.9, 1],
                    rotate: [0, 120, 240, 360],
                    x: [0, 20, -30, 0],
                    y: [0, -30, 20, 0],
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Extra small accent blob */}
            <motion.div
                className="aurora-blob hidden lg:block" // Hide on smaller screens
                style={{
                    background: "linear-gradient(135deg, rgba(0, 255, 255, 0.3), rgba(139, 92, 246, 0.2))",
                    top: "60%",
                    right: "20%",
                    width: "25vmax",
                    height: "25vmax",
                    opacity: baseOpacity * 0.5,
                    willChange: "transform, opacity",
                }}
                animate={{
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}
