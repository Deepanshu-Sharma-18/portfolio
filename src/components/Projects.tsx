"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <section id="projects" className="relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent)]/5 to-transparent" />
            <div className="absolute inset-0 bg-grid opacity-30" />

            {/* Aurora accent */}
            <motion.div
                className="absolute top-1/4 -right-1/4 w-[60vmax] h-[60vmax] 
                           bg-gradient-to-br from-[var(--accent)]/10 to-transparent 
                           rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.15, 0.1],
                }}
                transition={{ duration: 10, repeat: Infinity }}
            />

            <div className="max-w-7xl mx-auto relative" ref={ref}>
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <motion.span
                        className="inline-block text-[var(--accent)] text-sm font-medium tracking-widest uppercase"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        Portfolio
                    </motion.span>
                    <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mt-4">
                        Featured{" "}
                        <span className="text-gradient">Projects</span>
                    </h2>
                    <p className="text-[var(--muted)] mt-4 max-w-xl mx-auto">
                        A collection of mobile applications I&apos;ve built, showcasing my skills in
                        Flutter and Android development.
                    </p>
                </motion.div>

                {/* Projects grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            layoutId={`project-${project.id}`}
                        >
                            <ProjectCard
                                project={project}
                                isHovered={hoveredId === project.id}
                                onHover={() => setHoveredId(project.id)}
                                onLeave={() => setHoveredId(null)}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

interface ProjectCardProps {
    project: typeof projects[0];
    isHovered: boolean;
    onHover: () => void;
    onLeave: () => void;
}

function ProjectCard({ project, isHovered, onHover, onLeave }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for glow
    const springConfig = { damping: 30, stiffness: 200 };
    const glowX = useSpring(mouseX, springConfig);
    const glowY = useSpring(mouseY, springConfig);

    // 3D tilt effect
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        onLeave();
    };

    return (
        <Link href={`/projects/${project.id}`}>
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={onHover}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX: isHovered ? rotateX : 0,
                    rotateY: isHovered ? rotateY : 0,
                    transformStyle: "preserve-3d",
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer h-full"
            >
                {/* Glow effect following cursor */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                    style={{
                        background: useTransform(
                            [glowX, glowY],
                            ([x, y]) => `
                                radial-gradient(
                                    400px circle at ${50 + (x as number) * 100}% ${50 + (y as number) * 100}%,
                                    ${project.color}40,
                                    transparent 50%
                                )
                            `
                        ),
                    }}
                />

                {/* Glass background */}
                <motion.div
                    className="absolute inset-0 glass transition-all duration-500"
                    animate={{
                        background: isHovered
                            ? `linear-gradient(135deg, ${project.color}15 0%, ${project.color}05 100%)`
                            : 'rgba(255,255,255,0.03)',
                    }}
                />

                {/* Animated border */}
                <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={{
                        boxShadow: isHovered
                            ? `0 0 30px ${project.color}30, inset 0 0 30px ${project.color}10`
                            : 'none',
                        borderColor: isHovered ? `${project.color}50` : 'rgba(255,255,255,0.08)',
                    }}
                    style={{ border: '1px solid' }}
                    transition={{ duration: 0.3 }}
                />

                {/* Content */}
                <div
                    className="relative p-8 md:p-10 z-20"
                    style={{ transform: "translateZ(20px)" }}
                >
                    {/* Icon with 3D lift */}
                    <motion.div
                        animate={isHovered
                            ? { scale: 1.2, rotateZ: 10, y: -5 }
                            : { scale: 1, rotateZ: 0, y: 0 }
                        }
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="text-[clamp(3rem,5vw,3.75rem)] mb-6 inline-block"
                    >
                        {project.icon}
                    </motion.div>

                    {/* View Details tag */}
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.8 }}
                        animate={isHovered
                            ? { opacity: 1, x: 0, scale: 1 }
                            : { opacity: 0, x: 20, scale: 0.8 }
                        }
                        className="absolute top-8 right-8 px-4 py-1.5 rounded-full text-xs font-semibold
                                   flex items-center gap-2"
                        style={{
                            background: `linear-gradient(135deg, ${project.color}, ${project.color}CC)`,
                            color: '#000',
                            boxShadow: `0 4px 20px ${project.color}50`
                        }}
                    >
                        <span>View Details</span>
                        <motion.span
                            animate={isHovered ? { x: [0, 4, 0] } : {}}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            →
                        </motion.span>
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                        className="text-[clamp(1.5rem,2vw,2rem)] font-bold mb-2 transition-colors"
                        animate={{
                            color: isHovered ? project.color : 'var(--foreground)'
                        }}
                    >
                        {project.name}
                    </motion.h3>

                    {/* Tagline */}
                    <p className="text-[var(--accent-secondary)] italic mb-4 text-sm">
                        {project.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-[var(--muted)] mb-6 line-clamp-2">
                        {project.description}
                    </p>

                    {/* Tech tags with stagger animation */}
                    <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 4).map((tech, techIndex) => (
                            <motion.span
                                key={tech}
                                initial={{ opacity: 0, y: 10 }}
                                animate={isHovered
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0.6, y: 0 }
                                }
                                transition={{ delay: techIndex * 0.05 }}
                                className="px-3 py-1 text-sm rounded-full glass-strong"
                                style={{
                                    borderColor: isHovered ? `${project.color}30` : 'transparent',
                                    borderWidth: '1px',
                                }}
                            >
                                {tech}
                            </motion.span>
                        ))}
                        {project.tech.length > 4 && (
                            <motion.span
                                animate={{ opacity: isHovered ? 1 : 0.6 }}
                                className="px-3 py-1 text-sm rounded-full glass-strong text-[var(--muted)]"
                            >
                                +{project.tech.length - 4}
                            </motion.span>
                        )}
                    </div>

                    {/* Bottom gradient line */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
                            transformOrigin: "left"
                        }}
                    />
                </div>

                {/* Corner accent */}
                <motion.div
                    className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                        background: `radial-gradient(circle at 100% 0%, ${project.color}20, transparent 70%)`,
                    }}
                />
            </motion.div>
        </Link>
    );
}
