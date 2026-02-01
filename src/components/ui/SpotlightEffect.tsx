"use client";

import { useEffect, useState, RefObject } from "react";
import { motion } from "framer-motion";

interface SpotlightProps {
    containerRef?: RefObject<HTMLElement | null>;
    className?: string;
    size?: number;
}

export default function SpotlightEffect({
    containerRef,
    className = "",
    size = 600
}: SpotlightProps) {
    const [position, setPosition] = useState({ x: -1000, y: -1000 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef?.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setPosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            } else {
                setPosition({
                    x: e.clientX,
                    y: e.clientY,
                });
            }
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        const target = containerRef?.current || window;

        if (containerRef?.current) {
            containerRef.current.addEventListener("mousemove", handleMouseMove);
            containerRef.current.addEventListener("mouseenter", handleMouseEnter);
            containerRef.current.addEventListener("mouseleave", handleMouseLeave);
        } else {
            window.addEventListener("mousemove", handleMouseMove);
            setIsVisible(true);
        }

        return () => {
            if (containerRef?.current) {
                containerRef.current.removeEventListener("mousemove", handleMouseMove);
                containerRef.current.removeEventListener("mouseenter", handleMouseEnter);
                containerRef.current.removeEventListener("mouseleave", handleMouseLeave);
            } else {
                window.removeEventListener("mousemove", handleMouseMove);
            }
        };
    }, [containerRef]);

    return (
        <motion.div
            className={`pointer-events-none fixed inset-0 z-30 ${className}`}
            animate={{
                opacity: isVisible ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: size,
                    height: size,
                    background: `radial-gradient(
                        circle,
                        rgba(0, 255, 255, 0.12) 0%,
                        rgba(139, 92, 246, 0.06) 35%,
                        transparent 70%
                    )`,
                    filter: "blur(40px)",
                    willChange: "transform",
                }}
                animate={{
                    x: position.x - size / 2,
                    y: position.y - size / 2,
                }}
                transition={{
                    type: "spring",
                    damping: 35,
                    stiffness: 250,
                    mass: 0.5,
                }}
            />
            {/* Secondary glow */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: size * 0.6,
                    height: size * 0.6,
                    background: `radial-gradient(
                        circle,
                        rgba(0, 255, 255, 0.08) 0%,
                        transparent 60%
                    )`,
                    filter: "blur(20px)",
                    willChange: "transform",
                }}
                animate={{
                    x: position.x - (size * 0.6) / 2,
                    y: position.y - (size * 0.6) / 2,
                }}
                transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 300,
                    mass: 0.3,
                }}
            />
        </motion.div>
    );
}
