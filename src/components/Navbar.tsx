"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

const navItems = [
    { name: "About", href: "/#about", icon: "◆" },
    { name: "Projects", href: "/#projects", icon: "◈" },
    { name: "Experience", href: "/#experience", icon: "◇" },
    { name: "Contact", href: "/#contact", icon: "◎" },
];

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 100);

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
        <>
            {/* Liquid Orb Navbar - Fixed bottom right */}
            <motion.nav
                ref={navRef}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
                className="fixed bottom-8 right-8 z-50"
            >
                <LiquidOrb
                    isExpanded={isExpanded}
                    setIsExpanded={setIsExpanded}
                    activeSection={activeSection}
                />
            </motion.nav>

            {/* Top Brand Bar - Minimal */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? "py-3" : "py-6"
                    }`}
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
                                    textShadow: isScrolled
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
                            {/* Hover glow */}
                            <motion.div
                                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{
                                    background: "radial-gradient(circle, rgba(0,255,255,0.2), transparent)",
                                    filter: "blur(10px)",
                                }}
                            />
                        </motion.div>
                    </Link>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Link href="/#contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative px-6 py-2.5 rounded-full overflow-hidden group"
                            >
                                {/* Liquid gradient background */}
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
                                {/* Morphing blob overlay */}
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
        </>
    );
}

interface LiquidOrbProps {
    isExpanded: boolean;
    setIsExpanded: (expanded: boolean) => void;
    activeSection: string;
}

function LiquidOrb({ isExpanded, setIsExpanded, activeSection }: LiquidOrbProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const orbRef = useRef<HTMLDivElement>(null);

    // Spring physics for smooth following
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
            {/* Outer glow ring */}
            <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                    boxShadow: isExpanded
                        ? [
                            "0 0 30px rgba(0,255,255,0.4), 0 0 60px rgba(139,92,246,0.3)",
                            "0 0 50px rgba(0,255,255,0.6), 0 0 80px rgba(139,92,246,0.4)",
                            "0 0 30px rgba(0,255,255,0.4), 0 0 60px rgba(139,92,246,0.3)",
                        ]
                        : [
                            "0 0 20px rgba(0,255,255,0.3)",
                            "0 0 40px rgba(0,255,255,0.5)",
                            "0 0 20px rgba(0,255,255,0.3)",
                        ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Main orb container */}
            <motion.div
                style={{ x, y }}
                animate={{
                    width: isExpanded ? 280 : 64,
                    height: isExpanded ? 280 : 64,
                    borderRadius: isExpanded ? 28 : 32,
                }}
                transition={{ type: "spring", damping: 20, stiffness: 200 }}
                className="relative overflow-hidden cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {/* Liquid gradient background */}
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        background: isExpanded
                            ? "linear-gradient(135deg, rgba(0,0,0,0.9), rgba(20,20,30,0.95))"
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
            {/* Hamburger with liquid effect */}
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

            {/* Navigation items in circular/radial layout */}
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
                                e.stopPropagation();
                                onClose();
                            }}
                        >
                            <motion.div
                                whileHover={{ x: 8, backgroundColor: "rgba(0,255,255,0.1)" }}
                                className={`
                                    flex items-center gap-3 px-3 py-2.5 rounded-xl
                                    transition-colors group
                                    ${activeSection === item.href.split("#")[1]
                                        ? "bg-[var(--accent)]/10"
                                        : ""
                                    }
                                `}
                            >
                                <motion.span
                                    className={`text-lg ${activeSection === item.href.split("#")[1]
                                            ? "text-[var(--accent)]"
                                            : "text-white/40 group-hover:text-[var(--accent)]"
                                        }`}
                                    whileHover={{ rotate: 360, scale: 1.2 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {item.icon}
                                </motion.span>
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
