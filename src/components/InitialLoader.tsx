"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { getProjectIds } from "@/data/projects";

export default function InitialLoader() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Prefetch main routes
        router.prefetch("/#about");
        router.prefetch("/#projects");
        router.prefetch("/#contact");

        // Prefetch all project details
        const projectIds = getProjectIds();
        projectIds.forEach((id) => {
            router.prefetch(`/projects/${id}`);
        });

        // Quick reveal - just enough for brand impression
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.1,
                    }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className="fixed inset-0 z-[9999] bg-[#030303] flex items-center justify-center overflow-hidden"
                >
                    {/* Background gradient pulse */}
                    <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.3, 0] }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        style={{
                            background: "radial-gradient(circle at center, var(--accent) 0%, transparent 70%)",
                        }}
                    />

                    {/* Main content */}
                    <div className="relative flex flex-col items-center">
                        {/* Animated logo/initials */}
                        <motion.div
                            className="relative"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                                type: "spring",
                                damping: 15,
                                stiffness: 200,
                                duration: 0.6
                            }}
                        >
                            {/* Glowing ring */}
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: [0, 1, 0.5],
                                    scale: [0.8, 1, 1.2],
                                }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                style={{
                                    boxShadow: "0 0 60px 20px var(--accent)",
                                }}
                            />

                            {/* Logo text */}
                            <div className="text-6xl font-black flex items-center gap-1">
                                <motion.span
                                    className="text-[var(--accent)]"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.4 }}
                                >
                                    D
                                </motion.span>
                                <motion.span
                                    className="text-[var(--accent-secondary)]"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3, duration: 0.4 }}
                                >
                                    S
                                </motion.span>
                            </div>
                        </motion.div>

                        {/* Subtle line animation */}
                        <motion.div
                            className="mt-8 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 120, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                        />
                    </div>

                    {/* Corner accents */}
                    <motion.div
                        className="absolute top-0 left-0 w-32 h-32"
                        initial={{ opacity: 0, x: -20, y: -20 }}
                        animate={{ opacity: 0.3, x: 0, y: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{
                            background: "linear-gradient(135deg, var(--accent) 0%, transparent 50%)",
                        }}
                    />
                    <motion.div
                        className="absolute bottom-0 right-0 w-32 h-32"
                        initial={{ opacity: 0, x: 20, y: 20 }}
                        animate={{ opacity: 0.3, x: 0, y: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{
                            background: "linear-gradient(-45deg, var(--accent-secondary) 0%, transparent 50%)",
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
