"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxContainerProps {
    children: ReactNode;
    className?: string;
}

export default function ParallaxContainer({ children, className = "" }: ParallaxContainerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    return (
        <div ref={ref} className={`relative ${className}`}>
            {children}
        </div>
    );
}

interface ParallaxLayerProps {
    children: ReactNode;
    className?: string;
    speed?: number; // Positive = moves slower, Negative = moves faster
    direction?: "vertical" | "horizontal";
}

export function ParallaxLayer({
    children,
    className = "",
    speed = 0.5,
    direction = "vertical"
}: ParallaxLayerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const yRange = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
    const xRange = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

    return (
        <motion.div
            ref={ref}
            style={{
                y: direction === "vertical" ? yRange : 0,
                x: direction === "horizontal" ? xRange : 0,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Parallax scroll with opacity fade
interface ParallaxFadeProps {
    children: ReactNode;
    className?: string;
    fadeIn?: boolean;
    fadeOut?: boolean;
}

export function ParallaxFade({
    children,
    className = "",
    fadeIn = true,
    fadeOut = true
}: ParallaxFadeProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(
        scrollYProgress,
        fadeIn && fadeOut ? [0, 0.2, 0.8, 1] : fadeIn ? [0, 0.3, 1, 1] : [1, 1, 0.7, 0],
        fadeIn && fadeOut ? [0, 1, 1, 0] : fadeIn ? [0, 1, 1, 1] : [1, 1, 1, 0]
    );

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity, y }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Sticky parallax section
interface StickyParallaxProps {
    children: ReactNode;
    className?: string;
    stickyHeight?: string;
}

export function StickyParallax({
    children,
    className = "",
    stickyHeight = "200vh"
}: StickyParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={ref} style={{ height: stickyHeight }} className={`relative ${className}`}>
            <div className="sticky top-0 h-screen overflow-hidden">
                {children}
            </div>
        </div>
    );
}

// Hook to get parallax values
export function useParallax(
    scrollYProgress: MotionValue<number>,
    distance: number
) {
    return useTransform(scrollYProgress, [0, 1], [-distance, distance]);
}
