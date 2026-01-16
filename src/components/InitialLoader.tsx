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
        const projectIds = getProjectIds(); // We'll need to export this or just import projects
        projectIds.forEach((id) => {
            router.prefetch(`/projects/${id}`);
        });

        // Simulate initial load / wait for prefetch
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center"
                >
                    <div className="relative flex flex-col items-center">
                        {/* Logo Animation */}
                        <div className="relative w-32 h-32 mb-8">
                            <motion.div
                                className="absolute inset-0 border-4 border-[var(--accent)]/20 rounded-full"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                            <motion.div
                                className="absolute inset-0 border-4 border-t-[var(--accent)] rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center text-4xl"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                🚀
                            </motion.div>
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl font-bold tracking-widest text-white uppercase"
                        >
                            Loading <span className="text-[var(--accent)]">Experience</span>
                        </motion.h1>

                        <motion.div
                            className="mt-4 h-1 w-48 bg-[var(--accent)]/20 rounded-full overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <motion.div
                                className="h-full bg-[var(--accent)]"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2.2, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
