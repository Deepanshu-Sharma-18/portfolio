"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import MagneticButton from "./MagneticButton";

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
        <section ref={ref} className="min-h-screen flex flex-col justify-center relative overflow-hidden">
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
                className="absolute top-1/4 right-1/4 w-72 h-72 bg-[var(--accent)] opacity-10 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    y: [0, 30, 0],
                    x: [0, -20, 0],
                    rotate: [0, -5, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-3xl"
            />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

            <motion.div
                style={{ y }}
                className="relative z-10 max-w-7xl mx-auto px-6 w-full"
            >
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
                        className="text-[var(--accent)] text-lg md:text-xl font-medium tracking-wide inline-block hover-underline"
                    >
                        Hi, I&apos;m
                    </motion.p>

                    {/* Main headline with letter animation */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight">
                        <motion.span
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="block overflow-hidden"
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
                            className="block text-[var(--accent)] overflow-hidden"
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
                            className="text-2xl md:text-4xl font-light text-[var(--muted)] absolute"
                        >
                            {roles[currentRole]}
                        </motion.p>
                    </div>

                    {/* Description with shimmer effect */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-lg md:text-xl text-[var(--muted)] max-w-2xl leading-relaxed"
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
                                className="px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300"
                            >
                                Get In Touch
                            </motion.a>
                        </MagneticButton>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator with bounce */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="flex flex-col items-center gap-2 text-[var(--muted)] cursor-pointer"
                    >
                        <motion.span
                            className="text-sm tracking-widest uppercase"
                            whileHover={{ color: "var(--accent)" }}
                        >
                            Scroll
                        </motion.span>
                        <motion.div
                            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
                            whileHover={{ borderColor: "var(--accent)" }}
                        >
                            <motion.div
                                animate={{ y: [0, 12, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full"
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
