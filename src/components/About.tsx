"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
    { name: "Flutter", icon: "🦋" },
    { name: "Dart", icon: "🎯" },
    { name: "Android", icon: "🤖" },
    { name: "Kotlin", icon: "🔷" },
    { name: "Firebase", icon: "🔥" },
    { name: "REST APIs", icon: "🌐" },
];

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about" className="relative">
            <div className="max-w-7xl mx-auto" ref={ref}>
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
                    <h2 className="text-4xl md:text-6xl font-bold mt-4 leading-tight">
                        Building the future,<br />
                        <span className="text-[var(--accent)]">one app at a time.</span>
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
                        <div className="relative w-full aspect-square max-w-md mx-auto">
                            {/* Decorative border */}
                            <div className="absolute inset-0 border-2 border-dashed border-[var(--accent)]/30 rounded-2xl opacity-50" />

                            {/* Placeholder avatar */}
                            <div className="absolute inset-4 bg-gradient-to-br from-[var(--accent)]/20 to-purple-500/20 rounded-xl overflow-hidden">
                                <div className="w-full h-full flex items-center justify-center text-8xl">
                                    👨‍💻
                                </div>
                            </div>

                            {/* Floating badge */}
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -right-4 -bottom-4 glass px-6 py-3 rounded-xl"
                            >
                                <span className="text-[var(--accent)] font-bold text-lg">2+ Years</span>
                                <p className="text-sm text-[var(--muted)]">Experience</p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-6"
                    >
                        <p className="text-lg text-[var(--muted)] leading-relaxed">
                            I&apos;m a passionate mobile developer with expertise in building
                            cross-platform applications using <span className="text-white font-medium">Flutter</span> and
                            native <span className="text-white font-medium">Android</span> development.
                        </p>

                        <p className="text-lg text-[var(--muted)] leading-relaxed">
                            With hands-on experience from a <span className="text-[var(--accent)] font-medium">6-month
                                Flutter internship</span>, I&apos;ve developed a deep understanding of mobile
                            app architecture, state management, and creating pixel-perfect UIs that
                            delight users.
                        </p>

                        {/* Skills grid */}
                        <div className="pt-6">
                            <h3 className="text-xl font-semibold mb-4">Tech Stack</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {skills.map((skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        whileHover={{ scale: 1.05 }}
                                        className="glass px-4 py-3 rounded-xl flex items-center gap-3 cursor-default"
                                    >
                                        <span className="text-2xl">{skill.icon}</span>
                                        <span className="font-medium">{skill.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
