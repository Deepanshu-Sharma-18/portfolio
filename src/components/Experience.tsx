"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
    {
        id: 1,
        role: "Flutter Developer Intern",
        company: "Tech Solutions Inc.",
        duration: "Jan 2024 - Jun 2024",
        location: "Remote",
        description: [
            "Developed and maintained 3+ Flutter applications with over 10,000 combined downloads",
            "Implemented complex UI designs achieving pixel-perfect accuracy across iOS and Android",
            "Integrated RESTful APIs and Firebase services for real-time data synchronization",
            "Collaborated with cross-functional teams using Agile methodologies",
            "Optimized app performance reducing load times by 40%",
        ],
        tech: ["Flutter", "Dart", "Firebase", "REST API", "Git"],
    },
];

export default function Experience() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="experience" className="relative">
            <div className="max-w-7xl mx-auto" ref={ref}>
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <span className="text-[var(--accent)] text-sm font-medium tracking-widest uppercase">
                        Career
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold mt-4">
                        Work <span className="text-[var(--accent)]">Experience</span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--accent)]/50 to-transparent transform md:-translate-x-1/2" />

                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className={`relative flex flex-col md:flex-row gap-8 mb-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                }`}
                        >
                            {/* Timeline dot */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={isInView ? { scale: 1 } : {}}
                                transition={{ delay: 0.3 }}
                                className="absolute left-0 md:left-1/2 w-4 h-4 bg-[var(--accent)] rounded-full transform md:-translate-x-1/2 -translate-y-1 animate-pulse-glow"
                            />

                            {/* Content card */}
                            <div className={`flex-1 ml-8 md:ml-0 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="glass p-8 rounded-2xl hover:border-[var(--accent)]/30 transition-all duration-300"
                                >
                                    {/* Header */}
                                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                                        <div>
                                            <h3 className="text-2xl font-bold text-[var(--accent)]">{exp.role}</h3>
                                            <p className="text-xl text-white mt-1">{exp.company}</p>
                                        </div>
                                        <div className="text-right text-[var(--muted)]">
                                            <p className="font-medium">{exp.duration}</p>
                                            <p className="text-sm">{exp.location}</p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <ul className="space-y-3 mb-6">
                                        {exp.description.map((item, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                                transition={{ delay: 0.4 + i * 0.1 }}
                                                className="flex items-start gap-3 text-[var(--muted)]"
                                            >
                                                <span className="text-[var(--accent)] mt-1">▹</span>
                                                <span>{item}</span>
                                            </motion.li>
                                        ))}
                                    </ul>

                                    {/* Tech tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {exp.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 text-sm bg-[var(--accent)]/10 text-[var(--accent)] rounded-full"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Empty space for layout */}
                            <div className="hidden md:block flex-1" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
