"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState, ReactNode } from "react";

interface DirectionAwareHoverProps {
    children: ReactNode;
    overlay?: ReactNode;
    className?: string;
    overlayClassName?: string;
}

export default function DirectionAwareHover({
    children,
    overlay,
    className = "",
    overlayClassName = ""
}: DirectionAwareHoverProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [direction, setDirection] = useState<"top" | "bottom" | "left" | "right">("top");
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = (e: React.MouseEvent) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const w = rect.width;
        const h = rect.height;

        // Calculate which edge is closest to mouse entry point
        const topDist = y;
        const bottomDist = h - y;
        const leftDist = x;
        const rightDist = w - x;

        const minDist = Math.min(topDist, bottomDist, leftDist, rightDist);

        if (minDist === topDist) setDirection("top");
        else if (minDist === bottomDist) setDirection("bottom");
        else if (minDist === leftDist) setDirection("left");
        else setDirection("right");

        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const getOverlayPosition = () => {
        switch (direction) {
            case "top": return { y: isHovered ? 0 : -100 };
            case "bottom": return { y: isHovered ? 0 : 100 };
            case "left": return { x: isHovered ? 0 : -100 };
            case "right": return { x: isHovered ? 0 : 100 };
        }
    };

    const getOverlayInitial = () => {
        switch (direction) {
            case "top": return { y: "-100%" };
            case "bottom": return { y: "100%" };
            case "left": return { x: "-100%" };
            case "right": return { x: "100%" };
        }
    };

    return (
        <div
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden ${className}`}
        >
            {/* Main content */}
            <motion.div
                animate={{
                    scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
            >
                {children}
            </motion.div>

            {/* Direction-aware overlay */}
            {overlay && (
                <motion.div
                    className={`absolute inset-0 ${overlayClassName}`}
                    initial={getOverlayInitial()}
                    animate={{
                        x: direction === "left" ? (isHovered ? 0 : "-100%") :
                            direction === "right" ? (isHovered ? 0 : "100%") : 0,
                        y: direction === "top" ? (isHovered ? 0 : "-100%") :
                            direction === "bottom" ? (isHovered ? 0 : "100%") : 0,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                >
                    {overlay}
                </motion.div>
            )}
        </div>
    );
}

// 3D Tilt variant with direction awareness
interface TiltDirectionProps {
    children: ReactNode;
    className?: string;
    intensity?: number;
}

export function TiltDirection({
    children,
    className = "",
    intensity = 15
}: TiltDirectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-0.5, 0.5], [intensity, -intensity]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-intensity, intensity]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const xPos = (e.clientX - rect.left) / rect.width - 0.5;
        const yPos = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(xPos);
        y.set(yPos);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
