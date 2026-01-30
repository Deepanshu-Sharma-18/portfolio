"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const experiences = [
    {
        id: 1,
        role: "Flutter Developer Intern",
        company: "HDS Infotech",
        duration: "Jan 2025 - May 2025",
        location: "Pune, India",
        description: [
            "Developed a cross-platform e-commerce mobile application using Flutter, enhancing user experience with product search and checkout features for 50+ users",
            "Streamlined checkout process with body measurement inputs; integrated REST APIs for backend integration",
            "Contributed to 7-day Agile sprints using Jira, managed state with Provider, followed MVC architecture, and used Git for version control"
        ],
        tech: ["Flutter", "Dart", "REST APIs", "Git", "Provider", "Jira"],
        icon: "🦋",
        color: "#02569B"
    },
    {
        id: 2,
        role: "Full Stack Intern",
        company: "Alkraj Developers Pvt Ltd",
        duration: "Sept 2023 - Dec 2023",
        location: "Pune, India",
        description: [
            "Built modules for CoinCrux, a crypto news app, including feed and categories, improving user engagement for 100+ users",
            "Developed a Firebase-based admin panel for real-time news publishing with CRUD support, reducing content update time by 50%"
        ],
        tech: ["Flutter", "Firebase", "Git", "Asana"],
        icon: "🔥",
        color: "#FF9800"
    },
    {
        id: 3,
        role: "Android Facilitator (Volunteer)",
        company: "Google Developer Student Club",
        duration: "2023 - 2025",
        location: "JSPM RSCOE",
        description: [
            "Led a team of 5 to conduct 10+ workshops on Jetpack Compose, Firebase, and MVVM, mentoring 50+ students",
            "Organized hackathons for 200+ participants, promoting collaboration and skill development"
        ],
        tech: ["Android", "Jetpack Compose", "Mentorship", "Community Building"],
        icon: "🎓",
        color: "#4285F4"
    },
];

export default function Experience() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [expandedId, setExpandedId] = useState<number | null>(null);

    return (
        <section id="experience" className="relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-grid opacity-20" />
            <motion.div
                className="absolute bottom-0 right-0 w-[50vmax] h-[50vmax] 
                           bg-gradient-to-tl from-[var(--accent)]/10 to-transparent 
                           rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.08, 0.12, 0.08],
                }}
                transition={{ duration: 15, repeat: Infinity }}
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
                        Career
                    </span>
                    <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mt-4">
                        Work <span className="text-gradient">Experience</span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline line with gradient */}
                    <motion.div
                        className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
                        style={{
                            background: "linear-gradient(to bottom, var(--accent), var(--accent-secondary), transparent)"
                        }}
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : {}}
                        transition={{ duration: 1, delay: 0.3 }}
                    />

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
                                transition={{ delay: 0.3 + index * 0.2, type: "spring" }}
                                className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full md:-translate-x-1/2 top-8 md:top-0 z-10"
                                style={{
                                    background: `linear-gradient(135deg, var(--accent), var(--accent-secondary))`,
                                    boxShadow: "0 0 20px var(--accent), 0 0 40px var(--accent-secondary)"
                                }}
                            />

                            {/* Content card */}
                            <div className={`flex-1 ml-8 md:ml-0 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                                <ExperienceCard
                                    exp={exp}
                                    isExpanded={expandedId === exp.id}
                                    onToggle={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                                />
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

interface ExperienceCardProps {
    exp: typeof experiences[0];
    isExpanded: boolean;
    onToggle: () => void;
}

function ExperienceCard({ exp, isExpanded, onToggle }: ExperienceCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={onToggle}
            className="glass-glow p-8 rounded-2xl cursor-pointer transition-all duration-300
                       hover:border-[var(--accent)]/30 group"
        >
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                    <motion.span
                        className="text-3xl"
                        whileHover={{ rotate: [0, -15, 15, 0], scale: 1.2 }}
                    >
                        {exp.icon}
                    </motion.span>
                    <div>
                        <h3
                            className="text-[clamp(1.25rem,1.5vw,1.5rem)] font-bold"
                            style={{ color: exp.color }}
                        >
                            {exp.role}
                        </h3>
                        <p className="text-[clamp(1rem,1.2vw,1.25rem)] text-white mt-1">
                            {exp.company}
                        </p>
                    </div>
                </div>
                <div className="text-right text-[var(--muted)]">
                    <p className="font-medium">{exp.duration}</p>
                    <p className="text-sm">{exp.location}</p>
                </div>
            </div>

            {/* Description */}
            <motion.ul
                className="space-y-3 mb-6"
                animate={{ height: isExpanded ? "auto" : "auto" }}
            >
                {exp.description.slice(0, isExpanded ? undefined : 2).map((item, i) => (
                    <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 text-[var(--muted)]"
                    >
                        <span style={{ color: exp.color }}>▹</span>
                        <span>{item}</span>
                    </motion.li>
                ))}
            </motion.ul>

            {/* Expand indicator */}
            {exp.description.length > 2 && (
                <motion.div
                    className="text-sm text-[var(--accent)] font-medium mb-4"
                    whileHover={{ x: 5 }}
                >
                    {isExpanded ? "Show less ↑" : "Show more ↓"}
                </motion.div>
            )}

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2">
                {exp.tech.map((tech, index) => (
                    <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.1 }}
                        className="px-3 py-1 text-sm rounded-full"
                        style={{
                            background: `${exp.color}20`,
                            color: exp.color,
                            border: `1px solid ${exp.color}30`
                        }}
                    >
                        {tech}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
}
