"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AuroraBackground from "./ui/AuroraBackground";

const socials = [
    {
        name: "GitHub",
        icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
        url: "https://github.com/Deepanshu-Sharma-18",
        color: "#8b5cf6",
        handle: "@Deepanshu-Sharma-18"
    },
    {
        name: "LinkedIn",
        icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        url: "https://www.linkedin.com/in/deepanshusharma18/",
        color: "#0077B5",
        handle: "@deepanshusharma18"
    },
    {
        name: "LeetCode",
        icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
            </svg>
        ),
        url: "https://leetcode.com/u/Deepanshu_Sharma_18/",
        color: "#FFA116",
        handle: "@Deepanshu_Sharma_18"
    },
];

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="contact" className="relative overflow-hidden">
            {/* Aurora background instead of solid yellow */}
            <AuroraBackground intensity="high" />

            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-[var(--background)]/80" />

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-grid opacity-20" />

            {/* Decorative circles */}
            <motion.div
                className="absolute -top-1/4 -right-1/4 w-[60vmin] h-[60vmin] 
                           border border-[var(--accent)]/10 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute -bottom-1/4 -left-1/4 w-[50vmin] h-[50vmin] 
                           border border-[var(--accent-secondary)]/10 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            />

            <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-[clamp(3rem,8vw,7rem)] font-black leading-[1.1]">
                            <span className="text-gradient">Let&apos;s craft</span>
                            <br />
                            <span className="inline-flex items-center gap-4">
                                something
                                <motion.span
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="text-[clamp(2.5rem,6vw,4.5rem)]"
                                >
                                    ✨
                                </motion.span>
                            </span>
                            <br />
                            <span className="text-[var(--accent)]">amazing.</span>
                        </h2>

                        <p className="text-[clamp(1.125rem,1.5vw,1.25rem)] text-[var(--muted)] mt-8 max-w-[min(400px,90vw)]">
                            Have a project in mind? I&apos;d love to hear about it. Let&apos;s work together to
                            bring your ideas to life.
                        </p>

                        <motion.a
                            href="mailto:deepanshu.r.sharma@gmail.com"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-3 mt-8 px-8 py-4 rounded-full
                                       font-bold relative overflow-hidden group"
                        >
                            {/* Gradient background */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] via-[var(--accent-secondary)] to-[var(--accent)]"
                                animate={{
                                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                                style={{ backgroundSize: "200% 100%" }}
                            />
                            {/* Shine effect */}
                            <motion.div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                                }}
                            />
                            <span className="relative z-10 text-black">Send me an email</span>
                            <motion.span
                                className="relative z-10 text-black"
                                animate={{ x: [0, 4, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                →
                            </motion.span>
                        </motion.a>
                    </motion.div>

                    {/* Right - Socials */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <h3 className="text-2xl font-bold">
                            Find me on
                        </h3>

                        <div className="space-y-4">
                            {socials.map((social, index) => (
                                <motion.a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    whileHover={{ x: 10, scale: 1.02 }}
                                    className="flex items-center gap-6 p-6 glass-glow rounded-2xl 
                                               transition-all duration-300 group"
                                >
                                    <motion.span
                                        className="p-3 rounded-xl transition-all duration-300"
                                        style={{
                                            background: `${social.color}20`,
                                            color: social.color
                                        }}
                                        whileHover={{
                                            scale: 1.1,
                                            boxShadow: `0 0 20px ${social.color}50`
                                        }}
                                    >
                                        {social.icon}
                                    </motion.span>
                                    <div className="flex-1">
                                        <p className="font-bold text-xl" style={{ color: social.color }}>
                                            {social.name}
                                        </p>
                                        <p className="text-[var(--muted)] text-sm">{social.handle}</p>
                                    </div>
                                    <motion.span
                                        className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                                        style={{ color: social.color }}
                                    >
                                        →
                                    </motion.span>
                                </motion.a>
                            ))}
                        </div>

                        {/* Email card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.6 }}
                            className="glass-glow p-6 rounded-2xl"
                        >
                            <p className="text-[var(--muted)] text-sm mb-2">Email me directly at</p>
                            <motion.a
                                href="mailto:deepanshu.r.sharma@gmail.com"
                                className="text-[var(--accent)] font-medium hover:underline text-lg"
                                whileHover={{ x: 4 }}
                            >
                                deepanshu.r.sharma@gmail.com
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
