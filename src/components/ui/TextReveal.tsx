"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface TextRevealProps {
    children: ReactNode;
    className?: string;
}

export default function TextReveal({ children, className = "" }: TextRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.9", "start 0.25"]
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

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

// Character by character reveal
interface CharacterRevealProps {
    text: string;
    className?: string;
    delay?: number;
    stagger?: number;
}

export function CharacterReveal({
    text,
    className = "",
    delay = 0,
    stagger = 0.03
}: CharacterRevealProps) {
    const characters = text.split("");

    return (
        <span className={className}>
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.4,
                        delay: delay + index * stagger,
                        ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="inline-block"
                    style={{
                        display: char === " " ? "inline" : "inline-block",
                        whiteSpace: char === " " ? "pre" : "normal"
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    );
}

// Word by word reveal with glow
interface WordRevealProps {
    text: string;
    className?: string;
    delay?: number;
    stagger?: number;
    glowOnReveal?: boolean;
}

export function WordReveal({
    text,
    className = "",
    delay = 0,
    stagger = 0.1,
    glowOnReveal = true
}: WordRevealProps) {
    const words = text.split(" ");

    return (
        <span className={className}>
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    initial={{
                        opacity: 0,
                        y: 30,
                        filter: "blur(10px)"
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)"
                    }}
                    transition={{
                        duration: 0.5,
                        delay: delay + index * stagger,
                        ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="inline-block mr-[0.25em]"
                    style={{
                        textShadow: glowOnReveal
                            ? "0 0 20px rgba(0, 255, 255, 0.3)"
                            : "none"
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
}
