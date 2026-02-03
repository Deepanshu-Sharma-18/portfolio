"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
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
                    <span className="text-[var(--accent)] text-sm font-medium tracking-widest uppercase">
                        About Me
                    </span>
                    <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mt-4 leading-tight">
                        Building the future,<br />
                        <span className="text-gradient">one app at a time.</span>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <ProfileCard />
                    </motion.div>

                    {/* Right - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-6"
                    >
                        <p className="text-[clamp(1rem,1.1vw,1.25rem)] text-[var(--muted)] leading-relaxed">
                            I am a results-oriented <span className="text-[var(--accent)] font-medium">Mobile Engineer</span> dedicated
                            to building cross-platform solutions with <span className="text-[var(--accent)] font-medium">Flutter</span> and
                            native <span className="text-[var(--accent-secondary)] font-medium">Android</span>. My focus lies
                            in delivering production-grade applications that balance technical excellence with
                            exceptional user design.
                        </p>

                        <p className="text-[clamp(1rem,1.1vw,1.25rem)] text-[var(--muted)] leading-relaxed">
                            Through my experience at <span className="text-[var(--accent)] font-medium">HDS Infotech</span>,
                            I&apos;ve honed my skills in architecting scalable mobile systems, optimizing state
                            management, and implementing high-fidelity interfaces. I&apos;m passionate about
                            leveraging modern technologies to solve complex problems and creating digital
                            experiences that leave a lasting impact.
                        </p>

                        {/* Skills grid */}
                        <div className="pt-6">
                            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <span className="text-gradient">Tech Stack</span>
                                <motion.span
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    ⚡
                                </motion.span>
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {skills.map((skill, index) => (
                                    <SkillCard
                                        key={skill.name}
                                        skill={skill}
                                        index={index}
                                        isInView={isInView}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function ProfileCard() {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(mouseX, { stiffness: 100, damping: 30 });
    const rotateY = useSpring(mouseY, { stiffness: 100, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientY - rect.top) / rect.height - 0.5;
        const y = (e.clientX - rect.left) / rect.width - 0.5;
        mouseX.set(x * 10);
        mouseY.set(y * -10);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                willChange: "transform",
            }}
            className="relative w-full aspect-square max-w-[min(450px,90vw)] mx-auto"
        >
            {/* Animated gradient border */}
            <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                    background: "linear-gradient(90deg, var(--accent), var(--accent-secondary), var(--accent))",
                    backgroundSize: "200% 100%",
                    padding: "2px",
                }}
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 4, repeat: Infinity }}
            >
                <div className="absolute inset-[2px] rounded-2xl bg-[var(--background)]" />
            </motion.div>

            {/* Avatar content */}
            <motion.div
                animate={{
                    y: [0, -15, 0],
                    rotate: [0, 2, 0]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute inset-4 glass rounded-xl overflow-hidden"
            >
                <div className="w-full h-full flex items-center justify-center text-[clamp(4rem,10vw,8rem)]"
                    style={{ transform: "translateZ(50px)" }}>
                    👨‍💻
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent-secondary)]/10" />
            </motion.div>

            {/* Floating badge - Experience */}
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 -bottom-4 glass-glow px-6 py-3 rounded-xl z-10"
            >
                <span className="text-[var(--accent)] font-bold text-[clamp(1rem,1.2vw,1.25rem)]">6+ Months</span>
                <p className="text-sm text-[var(--muted)]">Experience</p>
            </motion.div>

            {/* Floating badge - Projects */}
            <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-4 top-8 glass-glow px-4 py-2 rounded-xl z-10"
            >
                <span className="text-[var(--accent-secondary)] font-bold">5+</span>
                <p className="text-xs text-[var(--muted)]">Projects</p>
            </motion.div>

            {/* Decorative dots */}
            <motion.div
                className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-[var(--accent)]"
                animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-1/4 right-0 w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)]"
                animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            />
        </motion.div>
    );
}

interface SkillCardProps {
    skill: typeof skills[0];
    index: number;
    isInView: boolean;
}

function SkillCard({ skill, index, isInView }: SkillCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.5 + index * 0.08, duration: 0.4 }}
            whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: `0 10px 30px ${skill.color}30`
            }}
            className="glass-glow px-3 py-2 md:px-4 md:py-3 rounded-xl flex items-center gap-2 md:gap-3 cursor-default
                       transition-all duration-300 group"
        >
            <motion.span
                className="text-xl md:text-2xl transition-colors duration-300 group-hover:text-[var(--accent)]"
                style={{ color: skill.color }}
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                transition={{ duration: 0.3 }}
            >
                <skill.icon />
            </motion.span>
            <span className="text-sm md:text-base font-medium group-hover:text-[var(--accent)] transition-colors">
                {skill.name}
            </span>
        </motion.div>
    );
}
