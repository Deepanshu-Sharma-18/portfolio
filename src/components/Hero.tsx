"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import MagneticButton from "./MagneticButton";
import TiltCard from "./TiltCard";

const roles = ["Flutter Developer", "Android Developer", "Mobile Engineer", "App Creator"];

export default function Hero() {
    const [currentRole, setCurrentRole] = useState(0);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section ref={ref} className="min-h-screen flex flex-col justify-start pt-[12vh] relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-[#0a0a0a]" />
            <motion.div
                className="absolute inset-0 opacity-40"
                style={{
                    background: "radial-gradient(circle at 50% 50%, #1a1a2e 0%, transparent 70%)"
                }}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating decorative elements with parallax */}
            <motion.div
                style={{ y }}
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[15%] right-[15%] w-[35vmin] h-[35vmin] bg-[var(--accent)] opacity-10 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    y: [0, 30, 0],
                    x: [0, -20, 0],
                    rotate: [0, -5, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[15%] left-[15%] w-[45vmin] h-[45vmin] bg-purple-500 opacity-10 rounded-full blur-3xl"
            />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

            <motion.div
                style={{ y }}
                className="relative z-10 max-w-7xl mx-auto px-6 w-full"
            >
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* Intro line with animated underline */}
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-[var(--accent)] text-[clamp(1.125rem,2vw,1.5rem)] font-medium tracking-wide inline-block hover-underline"
                        >
                            Hi, I&apos;m
                        </motion.p>

                        {/* Main headline with letter animation */}
                        <h1 className="text-[clamp(3rem,8vw,6rem)] font-black leading-[1.1] tracking-tight">
                            <motion.span
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="block overflow-hidden px-2 pb-6"
                            >
                                <motion.span
                                    className="inline-block"
                                    whileHover={{
                                        scale: 1.02,
                                        textShadow: "0 0 30px rgba(245, 197, 66, 0.5)"
                                    }}
                                >
                                    Deepanshu
                                </motion.span>
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="block text-[var(--accent)] overflow-hidden px-2 pb-6"
                            >
                                <motion.span
                                    className="inline-block"
                                    whileHover={{
                                        scale: 1.02,
                                        textShadow: "0 0 30px rgba(245, 197, 66, 0.8)"
                                    }}
                                >
                                    Sharma.
                                </motion.span>
                            </motion.span>
                        </h1>

                        {/* Animated role with smooth transitions */}
                        <div className="h-12 md:h-16 overflow-hidden relative">
                            <motion.p
                                key={currentRole}
                                initial={{ y: 50, opacity: 0, rotateX: -90 }}
                                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                                exit={{ y: -50, opacity: 0, rotateX: 90 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="text-[clamp(1.5rem,4vw,3rem)] font-light text-[var(--muted)] absolute"
                            >
                                {roles[currentRole]}
                            </motion.p>
                        </div>

                        {/* Description with shimmer effect */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-[clamp(1.125rem,1.5vw,1.5rem)] text-[var(--muted)] max-w-[min(90vw,42rem)] leading-relaxed"
                        >
                            I craft{" "}
                            <span className="text-white font-medium relative">
                                beautiful
                                <motion.span
                                    className="absolute bottom-0 left-0 h-[2px] bg-[var(--accent)]"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                />
                            </span>
                            , performant mobile applications that users love.
                            Specialized in Flutter and Android development with a passion for
                            creating seamless user experiences.
                        </motion.p>

                        {/* CTA Buttons with magnetic effect */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-wrap gap-4 pt-4"
                        >
                            <MagneticButton>
                                <motion.a
                                    href="#projects"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group px-8 py-4 bg-[var(--accent)] text-black font-bold rounded-full flex items-center gap-2 shine"
                                >
                                    View My Work
                                    <motion.span
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    >
                                        →
                                    </motion.span>
                                </motion.a>
                            </MagneticButton>
                            <MagneticButton>
                                <motion.a
                                    href="#contact"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
                                >
                                    Get In Touch
                                </motion.a>
                            </MagneticButton>
                        </motion.div>
                    </motion.div>

                    {/* Right side - Glassmorphic Code Card */}
                    <div className="hidden lg:block relative z-10 perspective-1000">
                        <TiltCard className="w-full max-w-[min(90vw,45rem)] lg:max-w-[55vmin] mx-auto" intensity={10}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl relative"
                            >
                                {/* Code window header */}
                                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                    </div>
                                    <div className="ml-4 text-xs text-white/30 font-mono">evolution.ts</div>
                                </div>

                                {/* Code content */}
                                <div className="p-6 font-mono text-xs md:text-sm leading-relaxed text-white/80 overflow-x-auto">
                                    <div className="mb-2">
                                        <span className="text-purple-400">function</span>{" "}
                                        <span className="text-blue-400">flowState</span>
                                        <span className="text-yellow-300">()</span>{" "}
                                        <span className="text-white/60">{"{"}</span>
                                    </div>

                                    <div className="pl-4 mb-1">
                                        <span className="text-blue-400">enterFocus</span>
                                        <span className="text-purple-300">()</span>
                                        <span className="text-white/60">;</span>
                                    </div>

                                    <div className="pl-4 mb-1">
                                        <span className="text-blue-400">blockNoise</span>
                                        <span className="text-purple-300">()</span>
                                        <span className="text-white/60">;</span>
                                    </div>

                                    <div className="pl-4 mb-1">
                                        <span className="text-blue-400">buildSomething</span>
                                        <span className="text-purple-300">(</span>
                                        <span className="text-green-400">&quot;meaningful&quot;</span>
                                        <span className="text-purple-300">)</span>
                                        <span className="text-white/60">;</span>
                                    </div>

                                    <div className="pl-4 mb-1">
                                        <span className="text-blue-400">breakThings</span>
                                        <span className="text-purple-300">()</span>
                                        <span className="text-white/60">;</span>
                                    </div>

                                    <div className="pl-4 mb-1">
                                        <span className="text-blue-400">traceTheBug</span>
                                        <span className="text-purple-300">()</span>
                                        <span className="text-white/60">;</span>
                                    </div>

                                    <div className="pl-4 mb-1">
                                        <span className="text-blue-400">refineDetails</span>
                                        <span className="text-purple-300">()</span>
                                        <span className="text-white/60">;</span>
                                    </div>

                                    <div className="pl-4 mb-1">
                                        <span className="text-blue-400">shipQuietly</span>
                                        <span className="text-purple-300">(</span>
                                        <span className="text-green-400">&quot;to production&quot;</span>
                                        <span className="text-purple-300">)</span>
                                        <span className="text-white/60">;</span>
                                    </div>

                                    <div className="pl-4 mb-1">
                                        <span className="text-blue-400">repeatTomorrow</span>
                                        <span className="text-purple-300">()</span>
                                        <span className="text-white/60">;</span>
                                    </div>

                                    <div>
                                        <span className="text-white/60">{"}"}</span>
                                    </div>
                                </div>



                                {/* Decorative glow */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                            </motion.div>
                        </TiltCard>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
