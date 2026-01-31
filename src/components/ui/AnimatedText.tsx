"use client";

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface MorphingTextProps {
    words: string[];
    className?: string;
    interval?: number;
}

export function MorphingText({ words, className = "", interval = 3000 }: MorphingTextProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % words.length);
                setIsAnimating(false);
            }, 400);
        }, interval);

        return () => clearInterval(timer);
    }, [words.length, interval]);

    return (
        <span className="relative inline-block">
            <motion.span
                key={currentIndex}
                className={className}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{
                    opacity: isAnimating ? 0 : 1,
                    y: isAnimating ? -20 : 0,
                    filter: isAnimating ? "blur(10px)" : "blur(0px)"
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                {words[currentIndex]}
            </motion.span>
        </span>
    );
}

interface ScrambleTextProps {
    text: string;
    className?: string;
    scrambleDuration?: number;
}

const chars = "!<>-_\\/[]{}—=+*^?#________";

export function ScrambleText({ text, className = "", scrambleDuration = 1.5 }: ScrambleTextProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const [displayText, setDisplayText] = useState("");
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let iteration = 0;
        const targetText = text;
        const duration = scrambleDuration * 1000;
        const interval = duration / (targetText.length * 3);

        const timer = setInterval(() => {
            setDisplayText(
                targetText
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return targetText[index];
                        }
                        if (char === " ") return " ";
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= targetText.length) {
                clearInterval(timer);
            }
            iteration += 1 / 3;
        }, interval);

        return () => clearInterval(timer);
    }, [isInView, text, scrambleDuration]);

    return (
        <span ref={ref} className={`font-mono ${className}`}>
            {displayText || text.split("").map(() => "_").join("")}
        </span>
    );
}

interface TypewriterTextProps {
    text: string;
    className?: string;
    speed?: number;
    cursor?: boolean;
}

export function TypewriterText({ text, className = "", speed = 50, cursor = true }: TypewriterTextProps) {
    const [displayText, setDisplayText] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let index = 0;
        const timer = setInterval(() => {
            if (index <= text.length) {
                setDisplayText(text.slice(0, index));
                index++;
            } else {
                clearInterval(timer);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [isInView, text, speed]);

    useEffect(() => {
        if (!cursor) return;
        const cursorTimer = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);
        return () => clearInterval(cursorTimer);
    }, [cursor]);

    return (
        <span ref={ref} className={className}>
            {displayText}
            {cursor && (
                <span className={`${showCursor ? "opacity-100" : "opacity-0"} text-[var(--accent)]`}>
                    |
                </span>
            )}
        </span>
    );
}

interface AnimatedCounterProps {
    from?: number;
    to: number;
    duration?: number;
    className?: string;
    suffix?: string;
    prefix?: string;
}

export function AnimatedCounter({
    from = 0,
    to,
    duration = 2,
    className = "",
    suffix = "",
    prefix = ""
}: AnimatedCounterProps) {
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const [displayValue, setDisplayValue] = useState(from);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        const controls = animate(count, to, {
            duration,
            ease: "easeOut",
        });

        const unsubscribe = rounded.on("change", (latest) => {
            setDisplayValue(latest);
        });

        return () => {
            controls.stop();
            unsubscribe();
        };
    }, [isInView, count, to, duration, rounded]);

    return (
        <span ref={ref} className={className}>
            {prefix}{displayValue}{suffix}
        </span>
    );
}

interface GradientTextProps {
    children: string;
    className?: string;
    animate?: boolean;
    colors?: string[];
}

export function GradientText({
    children,
    className = "",
    animate: shouldAnimate = true,
    colors = ["var(--accent)", "var(--accent-secondary)", "var(--accent)"]
}: GradientTextProps) {
    return (
        <motion.span
            className={`inline-block bg-clip-text text-transparent ${className}`}
            style={{
                backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
                backgroundSize: shouldAnimate ? "200% 100%" : "100% 100%",
            }}
            animate={shouldAnimate ? {
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            } : undefined}
            transition={shouldAnimate ? {
                duration: 5,
                repeat: Infinity,
                ease: "linear",
            } : undefined}
        >
            {children}
        </motion.span>
    );
}

interface GlitchTextProps {
    text: string;
    className?: string;
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
    return (
        <span className={`relative inline-block ${className}`}>
            {/* Main text */}
            <span className="relative z-10">{text}</span>

            {/* Glitch layers */}
            <motion.span
                className="absolute inset-0 text-[var(--accent)] z-0"
                style={{ clipPath: "inset(0 0 60% 0)" }}
                animate={{
                    x: [0, -2, 2, 0],
                    opacity: [1, 0.8, 0.8, 1],
                }}
                transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatDelay: 3,
                }}
            >
                {text}
            </motion.span>
            <motion.span
                className="absolute inset-0 text-[var(--accent-secondary)] z-0"
                style={{ clipPath: "inset(60% 0 0 0)" }}
                animate={{
                    x: [0, 2, -2, 0],
                    opacity: [1, 0.8, 0.8, 1],
                }}
                transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    delay: 0.05,
                }}
            >
                {text}
            </motion.span>
        </span>
    );
}
