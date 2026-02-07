"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { FaJava } from "react-icons/fa";
import {
    SiFlutter, SiAndroid, SiJavascript, SiCplusplus,
    SiKubernetes, SiGithub, SiFirebase, SiMysql,
    SiMongodb, SiPrisma, SiLinux, SiTailwindcss,
    SiHtml5, SiGit, SiAmazonwebservices, SiDart,
    SiKotlin, SiDocker, SiJenkins, SiSolidity,
    SiSpringboot, SiGo
} from "react-icons/si";

const skills = [
    { name: "Flutter", icon: SiFlutter, color: "#02569B" },
    { name: "Android", icon: SiAndroid, color: "#3DDC84" },
    { name: "Dart", icon: SiDart, color: "#0175C2" },
    { name: "Kotlin", icon: SiKotlin, color: "#7F52FF" },
    { name: "Java", icon: FaJava, color: "#007396" },
    { name: "Go", icon: SiGo, color: "#00ADD8" },
    { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "C++", icon: SiCplusplus, color: "#00599C" },
    { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    { name: "AWS", icon: SiAmazonwebservices, color: "#FF9900" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
    { name: "Jenkins", icon: SiJenkins, color: "#D24939" },
    { name: "GitHub", icon: SiGithub, color: "#181717" },
    { name: "Git", icon: SiGit, color: "#F05032" },
    { name: "Solidity", icon: SiSolidity, color: "#363636" },
    { name: "SQL", icon: SiMysql, color: "#4479A1" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "Prisma", icon: SiPrisma, color: "#2D3748" },
    { name: "Linux", icon: SiLinux, color: "#FCC624" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
];

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <section id="about" className="relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-grid opacity-20" />
            <motion.div
                className="absolute top-0 left-1/4 w-[40vmax] h-[40vmax] 
                           bg-gradient-to-br from-[var(--accent-secondary)]/10 to-transparent 
                           rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.15, 0.1],
                }}
                transition={{ duration: 12, repeat: Infinity }}
            />

            <div className="max-w-7xl mx-auto relative" ref={ref}>

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <span className="text-[var(--accent)] text-sm qfont-medium tracking-widest uppercase">
                        About Me
                    </span>
                    <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mt-4 leading-tight">
                        Building the future,<br />
                        <span className="text-gradient">one app at a time.</span>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
                    {/* Left - Animated Hive Visualization */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <HiveVisualization />
                    </motion.div>

                    {/* Right - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-6"
                    >
                        <p className="text-[clamp(1.1rem,1.2vw,1.4rem)] text-[var(--muted)] leading-relaxed">
                            I build reliable, <span className="text-[var(--accent)] font-medium">production-grade mobile applications</span> using{" "}
                            <span className="text-[var(--accent)] font-medium">Flutter</span> and native{" "}
                            <span className="text-[var(--accent-secondary)] font-medium">Android</span>, with a strong emphasis on
                            performance, scalability, and clean architecture.
                        </p>

                        <p className="text-[clamp(1.1rem,1.2vw,1.4rem)] text-[var(--muted)] leading-relaxed">
                            At <span className="text-[var(--accent)] font-medium">HDS Infotech</span>, I&apos;ve contributed to
                            designing scalable mobile systems, optimizing state management, and shipping polished user interfaces
                            that translate complex requirements into seamless user experiences.
                        </p>
                    </motion.div>
                </div>

                {/* Full Width Skills Section */}
                <SkillsSection skills={skills} />
            </div>
        </section>
    );
}

function SkillsSection({ skills }: { skills: any[] }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <div className="py-20 relative px-4" ref={containerRef} onMouseMove={handleMouseMove}>
            {/* Header info */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <h3 className="text-3xl font-bold text-gradient">Tech Stack</h3>
                        <motion.div
                            className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[var(--accent)] to-transparent"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                        />
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs uppercase tracking-widest text-[var(--muted)] flex items-center gap-3 bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10"
                >
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
                    </span>
                    {isExpanded ? "Immersive View" : "Hover to Unfurl Stack"}
                </motion.div>
            </div>

            <motion.div
                className="relative w-full rounded-[2.5rem] bg-black/20 backdrop-blur-sm transition-all duration-700 group/canvas overflow-hidden"
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
                animate={{
                    height: isExpanded ? "auto" : 140,
                    boxShadow: isExpanded ? "0 0 100px rgba(0,0,0,0.5)" : "none",
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
            >
                {/* Immersive background effects */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <motion.div
                        className="absolute inset-0 opacity-0 group-hover/canvas:opacity-100 transition-opacity duration-1000"
                        style={{
                            background: useTransform(
                                [mouseX, mouseY],
                                ([x, y]) => `radial-gradient(1000px circle at ${x}px ${y}px, rgba(127, 82, 255, 0.05), transparent 80%)`
                            )
                        }}
                    />
                </div>

                <div className="relative min-h-[100px]">
                    {/* Carousel Mode */}
                    <motion.div
                        animate={{
                            opacity: isExpanded ? 0 : 1,
                            y: isExpanded ? -20 : 0,
                        }}
                        transition={{ duration: 0.4 }}
                        style={{
                            pointerEvents: isExpanded ? "none" : "auto",
                            position: isExpanded ? "absolute" : "relative",
                            inset: 0,
                        }}
                        className="overflow-hidden flex items-center h-[100px]"
                    >
                        <motion.div
                            className="flex gap-8 whitespace-nowrap"
                            animate={{
                                x: ["0%", "-50%"],
                            }}
                            transition={{
                                duration: 50,
                                ease: "linear",
                                repeat: Infinity,
                            }}
                        >
                            {[...skills, ...skills].map((skill, index) => (
                                <SkillScrollItem
                                    key={`${skill.name}-${index}`}
                                    skill={skill}
                                    mode="carousel"
                                />
                            ))}
                        </motion.div>

                        {/* Fade gradients */}
                        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/80 to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none" />
                    </motion.div>

                    {/* Immersive Grid Mode */}
                    <motion.div
                        initial={false}
                        animate={{
                            opacity: isExpanded ? 1 : 0,
                            y: isExpanded ? 0 : 20,
                        }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{
                            pointerEvents: isExpanded ? "auto" : "none",
                            display: isExpanded ? "grid" : "none",
                        }}
                        className="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 p-8"
                    >
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={isExpanded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
                                transition={{
                                    delay: isExpanded ? index * 0.02 : 0,
                                    duration: 0.4,
                                    ease: "easeOut"
                                }}
                            >
                                <SkillScrollItem
                                    skill={skill}
                                    mode="grid"
                                    isExpanded={isExpanded}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

function HiveVisualization() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Hexagon positions for honeycomb pattern
    const hexagons = [
        { x: 50, y: 20, delay: 0, icon: "⚡", color: "var(--accent)" },
        { x: 25, y: 40, delay: 0.1, icon: "📱", color: "var(--accent-secondary)" },
        { x: 75, y: 40, delay: 0.2, icon: "🔥", color: "#FF6B6B" },
        { x: 10, y: 60, delay: 0.3, icon: "💻", color: "#4ECDC4" },
        { x: 50, y: 60, delay: 0.15, icon: "🚀", color: "var(--accent)" },
        { x: 90, y: 60, delay: 0.25, icon: "⚙️", color: "#FFE66D" },
        { x: 25, y: 80, delay: 0.35, icon: "🎯", color: "var(--accent-secondary)" },
        { x: 75, y: 80, delay: 0.4, icon: "✨", color: "#95E1D3" },
    ];

    // Connection lines between hexagons
    const connections = [
        { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 1, to: 3 },
        { from: 1, to: 4 }, { from: 2, to: 4 }, { from: 2, to: 5 },
        { from: 3, to: 6 }, { from: 4, to: 6 }, { from: 4, to: 7 }, { from: 5, to: 7 },
    ];

    return (
        <motion.div
            ref={containerRef}
            className="relative w-full aspect-square max-w-[min(500px,90vw)] mx-auto"
        >
            {/* Glowing background */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        background: [
                            "radial-gradient(circle at 30% 30%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)",
                            "radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
                            "radial-gradient(circle at 30% 70%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)",
                            "radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
                            "radial-gradient(circle at 30% 30%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)",
                        ]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* SVG for connection lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                {connections.map((conn, idx) => (
                    <motion.line
                        key={idx}
                        x1={`${hexagons[conn.from].x}%`}
                        y1={`${hexagons[conn.from].y}%`}
                        x2={`${hexagons[conn.to].x}%`}
                        y2={`${hexagons[conn.to].y}%`}
                        stroke="url(#lineGradient)"
                        strokeWidth="1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.4 }}
                        transition={{ duration: 1.5, delay: idx * 0.1 }}
                    />
                ))}
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--accent)" />
                        <stop offset="100%" stopColor="var(--accent-secondary)" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Hexagon nodes */}
            {hexagons.map((hex, idx) => (
                <motion.div
                    key={idx}
                    className="absolute"
                    style={{
                        left: `${hex.x}%`,
                        top: `${hex.y}%`,
                        transform: "translate(-50%, -50%)",
                        zIndex: 2,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.6,
                        delay: hex.delay,
                        type: "spring",
                        stiffness: 200
                    }}
                >
                    <motion.div
                        className="relative"
                        animate={{
                            y: [0, -8, 0],
                            rotate: [0, 5, 0, -5, 0]
                        }}
                        transition={{
                            duration: 4 + idx * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {/* Hexagon shape */}
                        <div
                            className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center relative group cursor-pointer"
                            style={{
                                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                                background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))",
                            }}
                        >
                            {/* Inner glow */}
                            <motion.div
                                className="absolute inset-0"
                                style={{
                                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                                    background: `radial-gradient(circle at center, ${hex.color}40, transparent 70%)`,
                                }}
                                animate={{ opacity: [0.3, 0.7, 0.3] }}
                                transition={{ duration: 2 + idx * 0.3, repeat: Infinity }}
                            />

                            {/* Icon */}
                            <span className="text-2xl md:text-3xl relative z-10 transition-transform duration-300 group-hover:scale-125">
                                {hex.icon}
                            </span>
                        </div>

                        {/* Pulse ring */}
                        <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                                border: `2px solid ${hex.color}`,
                            }}
                            animate={{
                                scale: [1, 1.5, 1.5],
                                opacity: [0.5, 0, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: hex.delay + 0.5
                            }}
                        />
                    </motion.div>
                </motion.div>
            ))}

            {/* Floating particles - fixed positions to avoid hydration mismatch */}
            {[
                { left: 15, top: 25 }, { left: 85, top: 15 }, { left: 25, top: 75 },
                { left: 70, top: 85 }, { left: 45, top: 35 }, { left: 60, top: 55 },
                { left: 20, top: 50 }, { left: 80, top: 45 }, { left: 35, top: 90 },
                { left: 55, top: 10 }, { left: 40, top: 70 }, { left: 75, top: 30 },
            ].map((pos, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                        background: i % 2 === 0 ? "var(--accent)" : "var(--accent-secondary)",
                        left: `${pos.left}%`,
                        top: `${pos.top}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        x: [0, 10, 0],
                        opacity: [0.2, 0.8, 0.2],
                        scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 3 + (i % 3),
                        repeat: Infinity,
                        delay: i * 0.2,
                    }}
                />
            ))}

            {/* Floating badge - Experience */}
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-2 bottom-4 glass-glow px-5 py-2 rounded-xl z-10"
            >
                <span className="text-[var(--accent)] font-bold">6+ Months</span>
                <p className="text-xs text-[var(--muted)]">Experience</p>
            </motion.div>

            {/* Floating badge - Projects */}
            <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-2 top-8 glass-glow px-4 py-2 rounded-xl z-10"
            >
                <span className="text-[var(--accent-secondary)] font-bold">5+</span>
                <p className="text-xs text-[var(--muted)]">Projects</p>
            </motion.div>
        </motion.div>
    );
}

function SkillScrollItem({
    skill,
    mode,
    isExpanded
}: {
    skill: typeof skills[0],
    mode: "carousel" | "grid",
    isExpanded?: boolean
}) {
    return (
        <motion.div
            whileHover={mode === "grid" ? {
                y: -10,
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderColor: skill.color
            } : {}}
            className={`
                flex items-center gap-4 px-6 py-5 rounded-2xl glass border border-white/5 
                transition-all duration-300 relative group
                ${mode === "grid" ? "w-full justify-center text-center" : "flex-shrink-0"}
            `}
        >
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at center, ${skill.color}30, transparent 70%)`,
                    boxShadow: `0 0 30px ${skill.color}20`
                }}
            />

            <skill.icon
                className="text-3xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ color: skill.color }}
            />

            <motion.div
                initial={false}
                animate={{
                    width: (mode === "grid" || isExpanded) ? "auto" : "auto", // Always show text in both modes for now
                    opacity: (mode === "grid" || isExpanded) ? 1 : 1, // Keep it visible to satisfy user's "automatically show text"
                }}
                className="overflow-hidden"
            >
                <span className="font-semibold text-sm md:text-base whitespace-nowrap">
                    {skill.name}
                </span>
            </motion.div>

            {/* Premium indicator light */}
            <div
                className="absolute top-2 right-2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: skill.color, boxShadow: `0 0 10px ${skill.color}` }}
            />
        </motion.div>
    );
}
