"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import MagneticButton from "./MagneticButton";

const navItems = [
    { name: "About", href: "/#about" },
    { name: "Projects", href: "/#projects" },
    { name: "Experience", href: "/#experience" },
    { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 50);

                    // Detect active section only if we're not navigating away
                    const sections = navItems.map(item => item.href.replace("#", ""));
                    for (const section of sections.reverse()) {
                        const element = document.getElementById(section);
                        if (element) {
                            const rect = element.getBoundingClientRect();
                            if (rect.top <= 150) {
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
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "glass py-4" : "py-6"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <MagneticButton>
                        <Link href="/" className="text-2xl font-bold tracking-tight group">
                            <motion.span
                                className="text-[var(--accent)] inline-block"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                            >
                                D
                            </motion.span>
                            <motion.span
                                className="inline-block"
                                whileHover={{ scale: 1.2 }}
                            >
                                S
                            </motion.span>
                        </Link>
                    </MagneticButton>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <MagneticButton key={item.name} strength={0.2}>
                                <Link
                                    href={item.href}
                                    className={`relative text-sm font-medium transition-colors duration-300 py-2 ${activeSection === item.href.replace("#", "")
                                        ? "text-[var(--accent)]"
                                        : "text-[var(--muted)] hover:text-white"
                                        }`}
                                >
                                    {item.name}
                                    {/* Active indicator */}
                                    <motion.span
                                        className="absolute -bottom-1 left-0 h-0.5 bg-[var(--accent)]"
                                        initial={{ width: 0 }}
                                        animate={{
                                            width: activeSection === item.href.replace("#", "") ? "100%" : 0
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </Link>
                            </MagneticButton>
                        ))}
                        <MagneticButton>
                            <Link
                                href="/#contact"
                                className="px-5 py-2.5 bg-[var(--accent)] text-black text-sm font-semibold rounded-full transition-all shine"
                            >
                                Let&apos;s Chat
                            </Link>
                        </MagneticButton>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden flex flex-col gap-1.5 p-2"
                    >
                        <motion.span
                            animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                            className="block w-6 h-0.5 bg-white origin-center"
                        />
                        <motion.span
                            animate={isMobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                            className="block w-6 h-0.5 bg-white"
                        />
                        <motion.span
                            animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                            className="block w-6 h-0.5 bg-white origin-center"
                        />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
                        animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
                        exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="fixed inset-0 z-40 bg-[var(--background)] pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-8">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-4xl font-bold hover:text-[var(--accent)] transition-colors flex items-center gap-4 group"
                                    >
                                        <motion.span
                                            initial={{ width: 0 }}
                                            whileHover={{ width: 40 }}
                                            className="h-0.5 bg-[var(--accent)]"
                                        />
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Decorative elements */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.1 }}
                            transition={{ delay: 0.3 }}
                            className="absolute bottom-20 right-10 text-[200px] font-black text-[var(--accent)]"
                        >
                            DS
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
