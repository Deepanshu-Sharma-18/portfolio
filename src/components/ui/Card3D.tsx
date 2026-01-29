"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, ReactNode } from "react";

interface Card3DProps {
    children: ReactNode;
    className?: string;
    containerClassName?: string;
    rotateIntensity?: number;
    glowColor?: string;
}

export default function Card3D({
    children,
    className = "",
    containerClassName = "",
    rotateIntensity = 15,
    glowColor = "var(--accent)",
}: Card3DProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 200 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [rotateIntensity, -rotateIntensity]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-rotateIntensity, rotateIntensity]), springConfig);

    // Glow position
    const glowX = useSpring(mouseX, springConfig);
    const glowY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    return (
        <div
            className={`perspective-1000 ${containerClassName}`}
            style={{ perspective: "1000px" }}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className={`relative ${className}`}
            >
                {/* Glow layer behind card */}
                <motion.div
                    className="absolute inset-0 rounded-[inherit] -z-10"
                    style={{
                        background: useTransform(
                            [glowX, glowY],
                            ([x, y]) => `
                                radial-gradient(
                                    600px circle at ${50 + (x as number) * 100}% ${50 + (y as number) * 100}%,
                                    ${glowColor}40,
                                    transparent 50%
                                )
                            `
                        ),
                        filter: "blur(40px)",
                    }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                />

                {/* Content with 3D lift */}
                <motion.div
                    className="relative"
                    style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
                    animate={{
                        scale: isHovered ? 1.02 : 1,
                    }}
                >
                    {children}
                </motion.div>

                {/* Shine effect */}
                <motion.div
                    className="absolute inset-0 rounded-[inherit] pointer-events-none overflow-hidden"
                    style={{
                        background: useTransform(
                            [glowX, glowY],
                            ([x, y]) => `
                                linear-gradient(
                                    ${105 + (x as number) * 30}deg,
                                    transparent 40%,
                                    rgba(255,255,255,0.1) 45%,
                                    rgba(255,255,255,0.2) 50%,
                                    rgba(255,255,255,0.1) 55%,
                                    transparent 60%
                                )
                            `
                        ),
                    }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                    }}
                />

                {/* Edge highlight */}
                <motion.div
                    className="absolute inset-0 rounded-[inherit] pointer-events-none"
                    animate={{
                        boxShadow: isHovered
                            ? `0 20px 50px -10px ${glowColor}30, inset 0 1px 0 rgba(255,255,255,0.1)`
                            : "0 0 0 0 transparent"
                    }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>
        </div>
    );
}

// Floating 3D elements that follow mouse
export function Float3D({ children, className = "" }: { children: ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 100 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) * 0.05);
        mouseY.set((e.clientY - centerY) * 0.05);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
