"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a]">
            {/* Centered Loading Animation */}
            <div className="relative w-24 h-24">
                <motion.div
                    className="absolute inset-0 border-4 border-[var(--accent)]/20 rounded-full"
                />
                <motion.div
                    className="absolute inset-0 border-4 border-t-[var(--accent)] rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-[var(--accent)] font-medium tracking-widest uppercase text-sm"
            >
                Loading...
            </motion.p>

            {/* Top progress bar for secondary feedback */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent)] origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: [0, 0.5, 0.8, 0.95] }}
                transition={{ duration: 5, times: [0, 0.3, 0.6, 1] }}
            />
        </div>
    );
}
