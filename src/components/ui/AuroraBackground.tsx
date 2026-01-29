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
                }}
                animate={{
                    scale: [1, 1.2, 0.9, 1.1, 1],
                    rotate: [0, 90, 180, 270, 360],
                    x: [0, 50, -30, 20, 0],
                    y: [0, -30, 20, -20, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
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
                }}
                animate={{
                    scale: [1, 0.9, 1.15, 1, 1.05],
                    rotate: [0, -120, -240, -360],
                    x: [0, -40, 30, -20, 0],
                    y: [0, 40, -20, 30, 0],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Tertiary gold/amber blob */}
            <motion.div
                className="aurora-blob"
                style={{
                    background: "linear-gradient(135deg, rgba(245, 197, 66, 0.4), transparent)",
                    top: "35%",
                    left: "25%",
                    width: "35vmax",
                    height: "35vmax",
                    opacity: baseOpacity * 0.6,
                }}
                animate={{
                    scale: [1, 1.3, 0.8, 1.1, 1],
                    rotate: [0, 60, 120, 180, 240, 300, 360],
                    x: [0, 30, -50, 40, 0],
                    y: [0, -40, 30, -30, 0],
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Extra small accent blob */}
            <motion.div
                className="aurora-blob"
                style={{
                    background: "linear-gradient(135deg, rgba(0, 255, 255, 0.3), rgba(139, 92, 246, 0.2))",
                    top: "60%",
                    right: "20%",
                    width: "25vmax",
                    height: "25vmax",
                    opacity: baseOpacity * 0.5,
                }}
                animate={{
                    scale: [1, 1.2, 0.9, 1],
                    borderRadius: [
                        "60% 40% 30% 70% / 60% 30% 70% 40%",
                        "30% 60% 70% 40% / 50% 60% 30% 60%",
                        "40% 60% 60% 40% / 60% 40% 60% 40%",
                        "60% 40% 30% 70% / 60% 30% 70% 40%",
                    ],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}
