"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, LayoutGroup } from "framer-motion";
import Link from "next/link";

const navItems = [
    { name: "About", href: "/#about" },
    { name: "Projects", href: "/#projects" },
    { name: "Experience", href: "/#experience" },
    { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [isInHero, setIsInHero] = useState(true);
    const [showOrbAttention, setShowOrbAttention] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        let ticking = false;
        let wasInHero = true;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    const heroThreshold = window.innerHeight * 0.6;
                    const currentlyInHero = scrollY < heroThreshold;

                    // Trigger attention animation when transitioning from hero to scrolled
                    if (wasInHero && !currentlyInHero) {
                        setShowOrbAttention(true);
                        setTimeout(() => setShowOrbAttention(false), 2000);
                    }
                    wasInHero = currentlyInHero;
                    setIsInHero(currentlyInHero);

                    const sections = navItems.map(item => item.href.split("#")[1]);
                    for (const section of sections.reverse()) {
                        const element = document.getElementById(section);
                        if (element) {
                            const rect = element.getBoundingClientRect();
                            if (rect.top <= 200) {
                                setActiveSection(section);
                                break;
                            }
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <LayoutGroup>
            {/* Top Brand Bar with Logo */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${!isInHero ? "py-3" : "py-6"}`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/">
                        <motion.div
                            className="relative group"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                className="text-2xl font-black flex items-center"
                                animate={{
                                    textShadow: !isInHero
                                        ? "0 0 30px rgba(0, 255, 255, 0.5)"
                                        : "none"
                                }}
                            >
                                <motion.span
                                    className="text-[var(--accent)]"
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                >
                                    ◈
                                </motion.span>
                                <span className="ml-1">
                                    <span className="text-[var(--accent)]">D</span>
                                    <span className="text-[var(--accent-secondary)]">S</span>
                                </span>
                            </motion.div>
                            <motion.div
                                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{
                                    background: "radial-gradient(circle, rgba(0,255,255,0.2), transparent)",
                                    filter: "blur(10px)",
                                }}
                            />
                        </motion.div>
                    </Link>

                    {/* Header Navigation - Sleek minimal design in hero section */}
                    <AnimatePresence mode="wait">
                        {isInHero && (
                            <motion.nav
                                key="header-nav"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{
                                    type: "spring",
                                    damping: 25,
                                    stiffness: 300
                                }}
                                className="hidden md:flex items-center"
                            >
                                {/* Sleek pill-shaped nav container */}
                                <motion.div
                                    className="relative flex items-center gap-1 px-2 py-1.5 rounded-full"
                                    style={{
                                        background: "rgba(0, 0, 0, 0.4)",
                                        backdropFilter: "blur(20px)",
                                        border: "1px solid rgba(255, 255, 255, 0.08)",
                                    }}
                                >
                                    {/* Animated gradient border */}
                                    <motion.div
                                        className="absolute inset-0 rounded-full opacity-50"
                                        style={{
                                            background: "linear-gradient(90deg, transparent, rgba(0,255,255,0.1), transparent)",
                                            backgroundSize: "200% 100%",
                                        }}
                                        animate={{
                                            backgroundPosition: ["200% 0%", "-200% 0%"],
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    />

                                    {navItems.map((item, index) => {
                                        const sectionId = item.href.split("#")[1];
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
                                                }}
                                            >
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.1 + index * 0.05 }}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="relative px-4 py-2 rounded-full text-sm font-medium cursor-pointer"
                                                >
                                                    {/* Active indicator background */}
                                                    {activeSection === sectionId && (
                                                        <motion.div
                                                            layoutId="headerActiveTab"
                                                            className="absolute inset-0 rounded-full"
                                                            style={{
                                                                background: "linear-gradient(135deg, var(--accent), var(--accent-secondary))",
                                                            }}
                                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                                        />
                                                    )}
                                                    {/* Text */}
                                                    <span
                                                        className={`relative z-10 transition-colors duration-200 ${activeSection === sectionId
                                                            ? "text-black font-semibold"
                                                            : "text-white/60 hover:text-white"
                                                            }`}
                                                    >
                                                        {item.name}
                                                    </span>
                                                </motion.div>
                                            </Link>
                                        );
                                    })}
                                </motion.div>
                            </motion.nav>
                        )}
                    </AnimatePresence>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Link
                            href="/#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative px-6 py-2.5 rounded-full overflow-hidden group"
                            >
                                <motion.div
                                    className="absolute inset-0"
                                    style={{
                                        background: "linear-gradient(135deg, var(--accent), var(--accent-secondary))",
                                    }}
                                    animate={{
                                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                                    }}
                                    transition={{ duration: 5, repeat: Infinity }}
                                />
                                <motion.div
                                    className="absolute inset-0 opacity-30"
                                    style={{
                                        background: "radial-gradient(circle at 30% 30%, white, transparent 50%)",
                                    }}
                                    animate={{
                                        x: [0, 20, 0],
                                        y: [0, 10, 0],
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                                <span className="relative z-10 font-semibold text-black text-sm">
                                    Let&apos;s Talk
                                </span>
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </motion.header>

            {/* Floating Orb Navbar - Visible after scrolling past hero */}
            <AnimatePresence>
                {!isInHero && (
                    <motion.nav
                        ref={navRef}
                        initial={{ scale: 0, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0, y: 50 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25
                        }}
                        className="fixed bottom-8 right-8 z-50"
                    >
                        {/* Attention-grabbing pulse animation on first appearance */}
                        {showOrbAttention && (
                            <>
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-[var(--accent)]"
                                    initial={{ scale: 1, opacity: 0.6 }}
                                    animate={{ scale: 3, opacity: 0 }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                />
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-[var(--accent)]"
                                    initial={{ scale: 1, opacity: 0.4 }}
                                    animate={{ scale: 2.5, opacity: 0 }}
                                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                                />
                            </>
                        )}

                        <LiquidOrb
                            isExpanded={isExpanded}
                            setIsExpanded={setIsExpanded}
                            activeSection={activeSection}
                            showAttention={showOrbAttention}
                        />
                    </motion.nav>
                )}
            </AnimatePresence>
        </LayoutGroup>
    );
}

interface LiquidOrbProps {
    isExpanded: boolean;
    setIsExpanded: (expanded: boolean) => void;
    activeSection: string;
    showAttention?: boolean;
}

function LiquidOrb({ isExpanded, setIsExpanded, activeSection, showAttention }: LiquidOrbProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const orbRef = useRef<HTMLDivElement>(null);

    const springConfig = { damping: 25, stiffness: 300 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!orbRef.current) return;
        const rect = orbRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) * 0.1);
        mouseY.set((e.clientY - centerY) * 0.1);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={orbRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative"
        >
            {/* Outer glow ring - only when collapsed */}
            {!isExpanded && (
                <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                        boxShadow: showAttention
                            ? [
                                "0 0 30px rgba(0,255,255,0.6), 0 0 60px rgba(0,255,255,0.4)",
                                "0 0 50px rgba(0,255,255,0.8), 0 0 80px rgba(0,255,255,0.5)",
                                "0 0 30px rgba(0,255,255,0.6), 0 0 60px rgba(0,255,255,0.4)",
                            ]
                            : [
                                "0 0 20px rgba(0,255,255,0.3)",
                                "0 0 40px rgba(0,255,255,0.5)",
                                "0 0 20px rgba(0,255,255,0.3)",
                            ],
                    }}
                    transition={{ duration: showAttention ? 0.5 : 2, repeat: Infinity }}
                />
            )}

            {/* Main orb container */}
            <motion.div
                style={{ x, y }}
                animate={{
                    width: isExpanded ? 280 : 64,
                    height: isExpanded ? 280 : 64,
                    borderRadius: isExpanded ? 28 : 32,
                }}
                transition={{ type: "spring", damping: 20, stiffness: 200 }}
                className={`relative overflow-hidden cursor-pointer ${isExpanded ? "backdrop-blur-xl" : ""
                    }`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {/* Liquid gradient background */}
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        background: isExpanded
                            ? "linear-gradient(135deg, rgba(10,10,15,0.85), rgba(20,20,35,0.9))"
                            : "linear-gradient(135deg, var(--accent), var(--accent-secondary))",
                    }}
                />

                {/* Morphing blob effect */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: "radial-gradient(circle at 30% 30%, rgba(0,255,255,0.3), transparent 50%)",
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 20, 0],
                        y: [0, -10, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: "radial-gradient(circle at 70% 70%, rgba(139,92,246,0.3), transparent 50%)",
                    }}
                    animate={{
                        scale: [1, 0.8, 1],
                        x: [0, -15, 0],
                        y: [0, 15, 0],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                />

                {/* Glass border */}
                <motion.div
                    className="absolute inset-0 rounded-[inherit]"
                    animate={{
                        borderColor: isExpanded
                            ? "rgba(0,255,255,0.3)"
                            : "rgba(255,255,255,0.2)",
                    }}
                    style={{ border: "1px solid" }}
                />

                {/* Content */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {isExpanded ? (
                            <ExpandedMenu
                                key="expanded"
                                activeSection={activeSection}
                                onClose={() => setIsExpanded(false)}
                            />
                        ) : (
                            <CollapsedOrb key="collapsed" />
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Floating particles around orb */}
            {!isExpanded && (
                <>
                    <FloatingParticle delay={0} angle={0} />
                    <FloatingParticle delay={0.5} angle={90} />
                    <FloatingParticle delay={1} angle={180} />
                    <FloatingParticle delay={1.5} angle={270} />
                </>
            )}
        </motion.div>
    );
}

function CollapsedOrb() {
    return (
        <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            className="flex flex-col items-center justify-center gap-1.5"
        >
            <motion.span
                className="w-5 h-0.5 bg-black rounded-full"
                animate={{ width: [20, 16, 20] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.span
                className="w-4 h-0.5 bg-black rounded-full"
                animate={{ width: [16, 20, 16] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            <motion.span
                className="w-5 h-0.5 bg-black rounded-full"
                animate={{ width: [20, 14, 20] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            />
        </motion.div>
    );
}

interface ExpandedMenuProps {
    activeSection: string;
    onClose: () => void;
}

function ExpandedMenu({ activeSection, onClose }: ExpandedMenuProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="p-6 w-full h-full"
        >
            {/* Close button */}
            <motion.button
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                           rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20
                           transition-colors"
            >
                ✕
            </motion.button>

            {/* Menu title */}
            <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[var(--accent)] text-xs font-medium tracking-widest uppercase mb-4"
            >
                Navigate
            </motion.p>

            {/* Navigation items - no icons, clean design */}
            <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                    <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.08 }}
                    >
                        <Link
                            href={item.href}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const sectionId = item.href.split("#")[1];
                                document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
                                onClose();
                            }}
                        >
                            <motion.div
                                whileHover={{ x: 8, backgroundColor: "rgba(0,255,255,0.1)" }}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl
                                    transition-colors group
                                    ${activeSection === item.href.split("#")[1]
                                        ? "bg-[var(--accent)]/10"
                                        : ""
                                    }
                                `}
                            >
                                {/* Active indicator bar */}
                                <motion.div
                                    className={`w-0.5 h-4 rounded-full transition-colors ${activeSection === item.href.split("#")[1]
                                        ? "bg-[var(--accent)]"
                                        : "bg-white/20 group-hover:bg-[var(--accent)]"
                                        }`}
                                />
                                <span className={`font-medium ${activeSection === item.href.split("#")[1]
                                    ? "text-[var(--accent)]"
                                    : "text-white/70 group-hover:text-white"
                                    }`}>
                                    {item.name}
                                </span>
                                <motion.span
                                    className="ml-auto text-[var(--accent)] opacity-0 group-hover:opacity-100"
                                    initial={{ x: -10 }}
                                    whileHover={{ x: 0 }}
                                >
                                    →
                                </motion.span>
                            </motion.div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

function FloatingParticle({ delay, angle }: { delay: number; angle: number }) {
    const radius = 45;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;

    return (
        <motion.div
            className="absolute w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
            style={{
                left: "50%",
                top: "50%",
                marginLeft: -3,
                marginTop: -3,
            }}
            animate={{
                x: [x, x * 1.2, x],
                y: [y, y * 1.2, y],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8],
            }}
            transition={{
                duration: 3,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    );
}
