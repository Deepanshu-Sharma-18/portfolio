"use client";


import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import TiltCard from "./TiltCard";
import { projects } from "@/data/projects";

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <section id="projects" className="relative">
            {/* Background accent */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent)]/5 to-transparent" />

            <div className="max-w-7xl mx-auto relative" ref={ref}>
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <span className="text-[var(--accent)] text-sm font-medium tracking-widest uppercase">
                        Portfolio
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold mt-4">
                        Featured <span className="text-[var(--accent)]">Projects</span>
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
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            layoutId={`project-${project.id}`}
                        >
                            <Link href={`/projects/${project.id}`}>
                                <TiltCard intensity={8}>
                                    <motion.div
                                        onMouseEnter={() => setHoveredId(project.id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                        className="group relative overflow-hidden rounded-2xl cursor-pointer h-full"
                                    >
                                        {/* Background gradient */}
                                        <motion.div
                                            className="absolute inset-0 transition-all duration-500"
                                            animate={{
                                                background: hoveredId === project.id
                                                    ? `linear-gradient(135deg, ${project.color}40 0%, ${project.color}10 100%)`
                                                    : 'rgba(255,255,255,0.03)',
                                            }}
                                        />

                                        {/* Shine effect overlay */}
                                        <div className="absolute inset-0 shine" />

                                        {/* Animated border */}
                                        <motion.div
                                            className="absolute inset-0 rounded-2xl"
                                            initial={{ opacity: 0 }}
                                            animate={{
                                                opacity: hoveredId === project.id ? 1 : 0,
                                                boxShadow: hoveredId === project.id
                                                    ? `0 0 30px ${project.color}50, inset 0 0 30px ${project.color}10`
                                                    : 'none'
                                            }}
                                            style={{ border: `1px solid ${project.color}50` }}
                                        />

                                        {/* Content */}
                                        <div className="relative p-8 md:p-10" style={{ transformStyle: "preserve-3d" }}>
                                            {/* Icon with 3D lift */}
                                            <motion.div
                                                animate={hoveredId === project.id
                                                    ? { scale: 1.2, rotateZ: 10, translateZ: 30 }
                                                    : { scale: 1, rotateZ: 0, translateZ: 0 }
                                                }
                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                className="text-6xl mb-6 inline-block"
                                                style={{ transformStyle: "preserve-3d" }}
                                            >
                                                {project.icon}
                                            </motion.div>

                                            {/* Tag */}
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={hoveredId === project.id
                                                    ? { opacity: 1, x: 0 }
                                                    : { opacity: 0, x: 20 }
                                                }
                                                className="absolute top-8 right-8 px-3 py-1 rounded-full text-xs font-medium"
                                                style={{ background: project.color, color: '#000' }}
                                            >
                                                View Details →
                                            </motion.div>

                                            {/* Title */}
                                            <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">
                                                {project.name}
                                            </h3>

                                            {/* Tagline */}
                                            <p className="text-[var(--muted)] italic mb-4">
                                                {project.tagline}
                                            </p>

                                            {/* Description */}
                                            <p className="text-[var(--muted)] mb-6">
                                                {project.description}
                                            </p>

                                            {/* Tech tags with stagger animation */}
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.slice(0, 4).map((tech, techIndex) => (
                                                    <motion.span
                                                        key={tech}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={hoveredId === project.id
                                                            ? { opacity: 1, y: 0 }
                                                            : { opacity: 0.7, y: 0 }
                                                        }
                                                        transition={{ delay: techIndex * 0.05 }}
                                                        className="px-3 py-1 text-sm bg-white/10 rounded-full"
                                                    >
                                                        {tech}
                                                    </motion.span>
                                                ))}
                                            </div>

                                            {/* Animated underline */}
                                            <motion.div
                                                className="absolute bottom-0 left-0 right-0 h-1 rounded-full"
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: hoveredId === project.id ? 1 : 0 }}
                                                transition={{ duration: 0.3 }}
                                                style={{
                                                    background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
                                                    transformOrigin: "left"
                                                }}
                                            />
                                        </div>
                                    </motion.div>
                                </TiltCard>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
