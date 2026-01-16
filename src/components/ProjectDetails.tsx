"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";
import { Project } from "@/data/projects";

interface ProjectDetailsProps {
    project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
    return (
        <main className="min-h-screen">
            {/* Back button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="fixed top-24 left-8 z-50"
            >
                <Link href="/#projects">
                    <MagneticButton>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-6 py-3 glass rounded-full text-sm font-medium hover:text-[var(--accent)] transition-colors"
                        >
                            <span>←</span> Back to Projects
                        </motion.div>
                    </MagneticButton>
                </Link>
            </motion.div>

            {/* Hero Section */}
            <motion.section
                layoutId={`project-${project.id}`}
                className="min-h-[70vh] flex items-center relative overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, ${project.color}20 0%, transparent 50%, ${project.color}10 100%)`
                }}
            >
                {/* Background orbs */}
                <div
                    className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
                    style={{ background: project.color }}
                />
                <div
                    className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-15"
                    style={{ background: project.color }}
                />

                <div className="max-w-7xl mx-auto px-6 w-full relative z-10 py-32">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left - Text */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Year badge */}
                            <span
                                className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-6"
                                style={{ background: project.color, color: '#000' }}
                            >
                                {project.year} • {project.role}
                            </span>

                            <h1 className="text-5xl md:text-7xl font-black mb-4">
                                {project.name}
                            </h1>

                            <p
                                className="text-2xl md:text-3xl font-light mb-6"
                                style={{ color: project.color }}
                            >
                                {project.tagline}
                            </p>

                            <p className="text-lg text-[var(--muted)] leading-relaxed mb-8">
                                {project.longDescription}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                {project.links.github && (
                                    <a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        View Code
                                    </a>
                                )}
                                {project.links.playStore && (
                                    <a
                                        href={project.links.playStore}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:scale-105"
                                        style={{ background: project.color, color: '#000' }}
                                    >
                                        Play Store →
                                    </a>
                                )}
                                {project.links.demo && (
                                    <a
                                        href={project.links.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:scale-105"
                                        style={{ background: project.color, color: '#000' }}
                                    >
                                        Live Demo →
                                    </a>
                                )}
                            </div>
                        </motion.div>

                        {/* Right - Icon/Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex justify-center"
                        >
                            <div className="text-[200px] md:text-[280px] animate-float">
                                {project.icon}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Tech Stack */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold mb-8"
                    >
                        Tech Stack
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-4"
                    >
                        {project.tech.map((tech, index) => (
                            <motion.span
                                key={tech}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.1, y: -5 }}
                                className="px-6 py-3 glass rounded-xl text-lg font-medium hover:border-[var(--accent)]/50 transition-colors cursor-default"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-6 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold mb-12"
                    >
                        Key Features
                    </motion.h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {project.features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="p-6 glass rounded-xl group"
                            >
                                <motion.div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                                    style={{ background: `${project.color}20` }}
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    ✓
                                </motion.div>
                                <p className="text-lg">{feature}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Challenges */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold mb-12"
                    >
                        Challenges & Solutions
                    </motion.h2>
                    <div className="space-y-6">
                        {project.challenges.map((challenge, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-6 p-6 glass rounded-xl group hover:border-[var(--accent)]/30 transition-colors"
                            >
                                <motion.span
                                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold"
                                    style={{ background: project.color, color: '#000' }}
                                    whileHover={{ scale: 1.2, rotate: 360 }}
                                >
                                    {index + 1}
                                </motion.span>
                                <p className="text-lg text-[var(--muted)] group-hover:text-white transition-colors">
                                    {challenge}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section
                className="py-24 px-6"
                style={{ background: `linear-gradient(135deg, ${project.color}20 0%, transparent 100%)` }}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Interested in this project?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-[var(--muted)] mb-8"
                    >
                        Let&apos;s discuss how I can help bring your ideas to life
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center gap-4"
                    >
                        <Link href="/#contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-full font-bold text-black"
                                style={{ background: project.color }}
                            >
                                Get In Touch
                            </motion.button>
                        </Link>
                        <Link href="/#projects">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 glass rounded-full font-bold"
                            >
                                More Projects
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
