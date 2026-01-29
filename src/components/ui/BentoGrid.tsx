"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, ReactNode } from "react";

interface BentoGridProps {
    children: ReactNode;
    className?: string;
}

export function BentoGrid({ children, className = "" }: BentoGridProps) {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
            {children}
        </div>
    );
}

interface BentoItemProps {
    children: ReactNode;
    className?: string;
    colSpan?: 1 | 2;
    rowSpan?: 1 | 2;
    gradient?: string;
}

export function BentoItem({
    children,
    className = "",
    colSpan = 1,
    rowSpan = 1,
    gradient = "from-[var(--accent)]/10 via-transparent to-[var(--accent-secondary)]/10"
}: BentoItemProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const spotlightX = useSpring(mouseX, { damping: 30, stiffness: 200 });
    const spotlightY = useSpring(mouseY, { damping: 30, stiffness: 200 });

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`
                relative overflow-hidden rounded-2xl 
                bg-gradient-to-br ${gradient}
                backdrop-blur-sm border border-white/10
                ${colSpan === 2 ? "md:col-span-2" : ""}
                ${rowSpan === 2 ? "md:row-span-2" : ""}
                ${className}
            `}
        >
            {/* Spotlight effect */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: useTransform(
                        [spotlightX, spotlightY],
                        ([x, y]) => `
                            radial-gradient(
                                400px circle at ${x}px ${y}px,
                                rgba(0, 255, 255, 0.15),
                                transparent 60%
                            )
                        `
                    ),
                }}
            />

            {/* Animated border glow */}
            <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                animate={{
                    boxShadow: isHovered
                        ? "inset 0 0 40px rgba(0,255,255,0.1), 0 0 30px rgba(0,255,255,0.1)"
                        : "none"
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Content */}
            <div className="relative z-20 h-full">
                {children}
            </div>

            {/* Corner glows */}
            <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(0,255,255,0.15), transparent 70%)",
                }}
                animate={{
                    scale: isHovered ? 1.5 : 1,
                    opacity: isHovered ? 1 : 0.3,
                }}
            />
            <motion.div
                className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)",
                }}
                animate={{
                    scale: isHovered ? 1.5 : 1,
                    opacity: isHovered ? 1 : 0.3,
                }}
            />
        </motion.div>
    );
}
