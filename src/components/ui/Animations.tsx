"use client";

import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { useRef, useEffect, useState, ReactNode } from "react";

interface MagneticElementProps {
    children: ReactNode;
    className?: string;
    strength?: number;
    radius?: number;
}

export default function MagneticElement({
    children,
    className = "",
    strength = 0.3,
    radius = 200,
}: MagneticElementProps) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 300 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;
            const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

            if (distance < radius) {
                const factor = 1 - distance / radius;
                x.set(distanceX * strength * factor);
                y.set(distanceY * strength * factor);
            } else {
                x.set(0);
                y.set(0);
            }
        };

        const handleMouseLeave = () => {
            x.set(0);
            y.set(0);
        };

        window.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [x, y, strength, radius]);

    return (
        <motion.div
            ref={ref}
            style={{ x: xSpring, y: ySpring }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Staggered reveal animation for lists
interface StaggerRevealProps {
    children: ReactNode[];
    className?: string;
    staggerDelay?: number;
    direction?: "up" | "down" | "left" | "right";
}

export function StaggerReveal({
    children,
    className = "",
    staggerDelay = 0.1,
    direction = "up"
}: StaggerRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const getInitialPosition = () => {
        switch (direction) {
            case "up": return { y: 30, x: 0 };
            case "down": return { y: -30, x: 0 };
            case "left": return { x: 30, y: 0 };
            case "right": return { x: -30, y: 0 };
        }
    };

    return (
        <div ref={ref} className={className}>
            {children.map((child, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, ...getInitialPosition() }}
                    animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                    transition={{
                        delay: index * staggerDelay,
                        duration: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                >
                    {child}
                </motion.div>
            ))}
        </div>
    );
}

// Ripple effect on click
interface RippleButtonProps {
    children: ReactNode;
    className?: string;
    rippleColor?: string;
    onClick?: () => void;
}

export function RippleButton({
    children,
    className = "",
    rippleColor = "rgba(0, 255, 255, 0.3)",
    onClick
}: RippleButtonProps) {
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();

        setRipples((prev) => [...prev, { x, y, id }]);
        setTimeout(() => {
            setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
        }, 600);

        onClick?.();
    };

    return (
        <button
            onClick={handleClick}
            className={`relative overflow-hidden ${className}`}
        >
            {children}
            {ripples.map((ripple) => (
                <motion.span
                    key={ripple.id}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        background: rippleColor,
                    }}
                    initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 1 }}
                    animate={{
                        width: 300,
                        height: 300,
                        x: -150,
                        y: -150,
                        opacity: 0
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />
            ))}
        </button>
    );
}

// Floating animation wrapper
interface FloatAnimationProps {
    children: ReactNode;
    className?: string;
    duration?: number;
    distance?: number;
    delay?: number;
}

export function FloatAnimation({
    children,
    className = "",
    duration = 4,
    distance = 15,
    delay = 0,
}: FloatAnimationProps) {
    return (
        <motion.div
            className={className}
            animate={{
                y: [0, -distance, 0],
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
            }}
        >
            {children}
        </motion.div>
    );
}

// Scale up on scroll into view
interface ScaleOnViewProps {
    children: ReactNode;
    className?: string;
    scale?: number;
}

export function ScaleOnView({ children, className = "", scale = 0.9 }: ScaleOnViewProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ scale, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
