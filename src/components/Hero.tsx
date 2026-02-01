"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import MagneticButton from "./MagneticButton";
import TiltCard from "./TiltCard";
import AuroraBackground from "./ui/AuroraBackground";
import SpotlightEffect from "./ui/SpotlightEffect";
import { MorphingText, ScrambleText, GradientText, AnimatedCounter } from "./ui/AnimatedText";
import { FloatAnimation } from "./ui/Animations";

const roles = ["Flutter Developer", "Android Developer", "Mobile Engineer", "App Creator"];

export default function Hero() {
    const [mounted, setMounted] = useState(false);
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0.3, 1], [0, 150]);
    const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0.3, 0.9], [1, 0.95]);

    // Mouse tracking for 3D effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 100, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 100, damping: 30 });

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <section
            ref={ref}
            id="hero"
            className="min-h-screen flex flex-col justify-start pt-[15vh] relative overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Background layers */}
            <div className="absolute inset-0 bg-[#030303]" />

            {/* Aurora background */}
            <AuroraBackground intensity="medium" />

            {/* Spotlight effect following cursor */}
            <SpotlightEffect containerRef={ref} size={800} />

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-grid opacity-30" />

            {/* Noise texture */}
            <div className="noise-overlay" />

            {/* Floating orbs with parallax */}
            <FloatAnimation delay={0} duration={6}>
                <motion.div
                    style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]), willChange: "transform, opacity" }}
                    className="absolute top-[15%] left-[8%] w-2 h-2 rounded-full bg-[var(--accent)]"
                    animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
            </FloatAnimation>
            <FloatAnimation delay={1} duration={7}>
                <motion.div
                    style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]), willChange: "transform, opacity" }}
                    className="absolute top-[25%] right-[12%] w-3 h-3 rounded-full bg-[var(--accent-secondary)]"
                    animate={{
                        opacity: [0.4, 0.8, 0.4],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
            </FloatAnimation>
            <FloatAnimation delay={2} duration={5}>
                <motion.div
                    style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]), willChange: "transform, opacity" }}
                    className="absolute bottom-[35%] left-[18%] w-1.5 h-1.5 rounded-full bg-[var(--accent-tertiary)]"
                    animate={{
                        opacity: [0.6, 1, 0.6],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                />
            </FloatAnimation>

            {/* Main content with parallax and 3D tilt */}
            <motion.div
                style={{ y, opacity, scale, rotateX, rotateY, willChange: "transform, opacity" }}
                className="relative z-10 max-w-7xl mx-auto px-6 w-full perspective-1000"
            >
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        {/* Intro line with glow */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
                            className="flex items-center gap-3"
                        >
                            <motion.div
                                className="w-8 md:w-12 h-px bg-gradient-to-r from-[var(--accent)] to-transparent"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                            />
                            <span
                                className="text-[var(--accent)] text-base md:text-lg font-medium tracking-wide"
                                style={{ textShadow: "0 0 20px rgba(0, 255, 255, 0.3)" }}
                            >
                                Hello, I&apos;m
                            </span>
                        </motion.div>

                        {/* Main headline with scramble effect */}
                        <h1 className="text-[clamp(3rem,8vw,6rem)] font-black leading-[1.1] tracking-tight">
                            {mounted ? (
                                <>
                                    <motion.span
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                                        className="block overflow-hidden"
                                    >
                                        <GradientText className="block text-[clamp(3rem,8vw,6rem)] font-black">
                                            Deepanshu
                                        </GradientText>
                                    </motion.span>
                                    <motion.span
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.25, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                                        className="block overflow-hidden"
                                    >
                                        <span
                                            className="text-[var(--accent)]"
                                            style={{
                                                textShadow: "0 0 40px rgba(0, 255, 255, 0.5)"
                                            }}
                                        >
                                            <ScrambleText text="Sharma." scrambleDuration={1.2} />
                                        </span>
                                    </motion.span>
                                </>
                            ) : (
                                <>
                                    <span className="block text-gradient">Deepanshu</span>
                                    <span className="block text-[var(--accent)]">Sharma.</span>
                                </>
                            )}
                        </h1>

                        {/* Animated role with morphing text */}
                        <div className="min-h-[3rem] md:min-h-[4rem] relative flex items-center flex-wrap">
                            <span className="text-[var(--muted)] text-lg md:text-xl mr-2 whitespace-nowrap">I&apos;m a</span>
                            {mounted ? (
                                <MorphingText
                                    words={roles}
                                    className="text-[clamp(1.1rem,3vw,2.5rem)] font-bold bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] bg-clip-text text-transparent leading-none py-1"
                                    interval={3000}
                                />
                            ) : (
                                <span className="text-[clamp(1.1rem,3vw,2.5rem)] font-bold text-[var(--accent)]">
                                    Flutter Developer
                                </span>
                            )}
                        </div>

                        {/* Description with highlight */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
                            className="text-[clamp(0.95rem,1.3vw,1.25rem)] text-[var(--muted)] 
                                       max-w-[min(90vw,42rem)] leading-relaxed"
                        >
                            I craft{" "}
                            <span className="text-white font-medium relative">
                                beautiful
                                <motion.span
                                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ delay: 1.2, duration: 0.5 }}
                                />
                            </span>
                            , performant mobile applications that users love.
                        </motion.p>

                        {/* Stats row */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45, duration: 0.5, ease: "easeOut" }}
                            className="flex flex-wrap gap-8 pt-2"
                        >
                            {[
                                { value: 2, suffix: "+", label: "Years Exp" },
                                { value: 10, suffix: "+", label: "Projects" },
                                { value: 50, suffix: "+", label: "Users Impacted" },
                            ].map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-2xl md:text-3xl font-bold text-[var(--accent)]">
                                        <AnimatedCounter to={stat.value} suffix={stat.suffix} duration={2} />
                                    </div>
                                    <div className="text-sm text-[var(--muted)]">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55, duration: 0.5, ease: "easeOut" }}
                            className="flex flex-wrap gap-4 pt-4"
                        >
                            <MagneticButton>
                                <motion.a
                                    href="#projects"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative px-8 py-4 rounded-full overflow-hidden 
                                               font-bold flex items-center gap-2"
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
                                    <span className="relative z-10 text-black">View My Work</span>
                                    <motion.span
                                        className="relative z-10 text-black"
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
                                    className="px-8 py-4 rounded-full font-medium flex items-center justify-center
                                               glass-glow hover:bg-white/10 transition-all duration-300"
                                >
                                    Get In Touch
                                </motion.a>
                            </MagneticButton>

                            {/* Resume Button - Strategic Placement */}
                            <MagneticButton>
                                <motion.a
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative px-6 py-4 rounded-full font-medium flex items-center gap-2
                                               border border-[var(--accent)]/50 hover:border-[var(--accent)] 
                                               hover:bg-[var(--accent)]/10 transition-all duration-300"
                                >
                                    {/* Subtle animated glow */}
                                    <motion.div
                                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                                        style={{
                                            background: "radial-gradient(circle, rgba(0,255,255,0.15), transparent 70%)",
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    <svg
                                        className="w-4 h-4 text-[var(--accent)] relative z-10"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    <span className="relative z-10 text-[var(--accent)] group-hover:text-white transition-colors">
                                        Resume
                                    </span>
                                </motion.a>
                            </MagneticButton>
                        </motion.div>
                    </motion.div>

                    {/* Right side - Enhanced Code Card */}
                    <div className="hidden lg:block relative z-10">
                        <TiltCard className="w-full max-w-[min(90vw,45rem)] lg:max-w-[55vmin] mx-auto" intensity={10}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, x: 30 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                                className="relative glass-glow rounded-xl overflow-hidden"
                            >
                                {/* Animated border */}
                                <motion.div
                                    className="absolute inset-0 rounded-xl"
                                    style={{
                                        background: "linear-gradient(90deg, var(--accent), var(--accent-secondary), var(--accent))",
                                        backgroundSize: "200% 100%",
                                        padding: "1px",
                                    }}
                                    animate={{
                                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />

                                {/* Inner content */}
                                <div className="relative m-[1px] bg-[#0a0a0a] rounded-xl">
                                    {/* Code window header */}
                                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                                        <div className="flex gap-2">
                                            <motion.div
                                                className="w-3 h-3 rounded-full bg-red-500/80"
                                                whileHover={{ scale: 1.2 }}
                                            />
                                            <motion.div
                                                className="w-3 h-3 rounded-full bg-yellow-500/80"
                                                whileHover={{ scale: 1.2 }}
                                            />
                                            <motion.div
                                                className="w-3 h-3 rounded-full bg-green-500/80"
                                                whileHover={{ scale: 1.2 }}
                                            />
                                        </div>
                                        <div className="ml-4 text-xs text-white/30 font-mono">dev_life.sh</div>
                                    </div>

                                    {/* Code content with line-by-line animation */}
                                    <div className="p-6 font-mono text-xs md:text-sm leading-relaxed text-white/80 overflow-x-auto min-h-[300px]">
                                        {[
                                            { indent: 0, content: <><span className="text-white/30">$</span> <span className="text-[var(--accent)]">while</span> <span className="text-yellow-300">(</span><span className="text-blue-400">alive</span><span className="text-yellow-300">)</span> <span className="text-white/60">{"{"}</span></> },
                                            { indent: 1, content: <><span className="text-blue-400">eat</span><span className="text-purple-300">()</span><span className="text-white/60">;</span> <span className="text-white/30">// ☕ coffee++</span></> },
                                            { indent: 1, content: <><span className="text-blue-400">sleep</span><span className="text-purple-300">()</span><span className="text-white/60">;</span> <span className="text-white/30">// optional</span></> },
                                            { indent: 1, content: <><span className="text-blue-400">build</span><span className="text-purple-300">()</span><span className="text-white/60">;</span> <span className="text-white/30">// make it amazing</span></> },
                                            { indent: 1, content: <><span className="text-blue-400">test</span><span className="text-purple-300">()</span><span className="text-white/60">;</span> <span className="text-white/30">// fixed: was perfect</span></> },
                                            { indent: 1, content: <><span className="text-blue-400">repeat</span><span className="text-purple-300">()</span><span className="text-white/60">;</span></> },
                                            { indent: 0, content: <><span className="text-white/60">{"}"}</span></> },
                                            { indent: 0, content: <span className="text-white/10">----------------------</span> },
                                            { indent: 0, content: <><span className="text-white/30">$</span> <span className="text-blue-400">./deploy.sh</span></> },
                                            { indent: 0, content: <><span className="text-white/30">[OK]</span> <span className="text-green-400">Production ready</span></> },
                                            { indent: 0, content: <><span className="text-white/30">[OK]</span> <span className="text-green-400">Magic happens now ✨</span></> },
                                        ].map((line, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    delay: 0.8 + index * 0.15,
                                                    duration: 0.4
                                                }}
                                                className="mb-1.5 whitespace-nowrap"
                                                style={{ paddingLeft: `${line.indent * 1.5}rem` }}
                                            >
                                                {line.content}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Decorative glows */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--accent-secondary)]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                            </motion.div>
                        </TiltCard>

                        {/* Floating badges */}
                        <FloatAnimation duration={4} distance={10}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 }}
                                className="absolute -top-4 -right-4 glass-glow px-4 py-2 rounded-full"
                            >
                                <span className="text-[var(--accent)] font-bold">✨ 2+ Years</span>
                            </motion.div>
                        </FloatAnimation>

                        <FloatAnimation duration={5} distance={8} delay={1}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.4 }}
                                className="absolute -bottom-4 -left-4 glass-glow px-4 py-2 rounded-full"
                            >
                                <span className="text-[var(--accent-secondary)] font-bold">🚀 10+ Projects</span>
                            </motion.div>
                        </FloatAnimation>
                    </div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs text-[var(--muted)] uppercase tracking-widest">Scroll</span>
                <motion.div
                    className="w-5 h-9 border-2 border-white/20 rounded-full flex justify-center pt-2"
                >
                    <motion.div
                        className="w-1.5 h-2.5 bg-[var(--accent)] rounded-full"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
