"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

interface DockItem {
    name: string;
    href: string;
    icon?: React.ReactNode;
}

interface FloatingDockProps {
    items: DockItem[];
    className?: string;
    activeItem?: string;
}

export default function FloatingDock({ items, className = "", activeItem }: FloatingDockProps) {
    const mouseX = useMotionValue(Infinity);

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={`
                flex items-center gap-2 px-4 py-3 rounded-full
                glass-strong
                ${className}
            `}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: "spring",
                damping: 20,
                stiffness: 100,
                delay: 0.2
            }}
        >
            {items.map((item) => (
                <DockIcon
                    key={item.name}
                    item={item}
                    mouseX={mouseX}
                    isActive={activeItem === item.href.split("#")[1]}
                />
            ))}
        </motion.div>
    );
}

interface DockIconProps {
    item: DockItem;
    mouseX: ReturnType<typeof useMotionValue<number>>;
    isActive?: boolean;
}

function DockIcon({ item, mouseX, isActive }: DockIconProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [48, 72, 48]);
    const width = useSpring(widthSync, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    return (
        <Link href={item.href}>
            <motion.div
                ref={ref}
                style={{ width }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative flex items-center justify-center aspect-square cursor-pointer"
            >
                {/* Background glow on hover */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-[var(--accent)]"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: isHovered || isActive ? 0.15 : 0,
                        scale: isHovered || isActive ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                />

                {/* Icon or text */}
                <motion.span
                    className={`
                        text-sm font-medium relative z-10
                        ${isActive ? "text-[var(--accent)]" : "text-white/70"}
                    `}
                    animate={{
                        color: isHovered ? "var(--accent)" : isActive ? "var(--accent)" : "rgba(255,255,255,0.7)"
                    }}
                >
                    {item.icon || item.name.charAt(0)}
                </motion.span>

                {/* Tooltip */}
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 10,
                        scale: isHovered ? 1 : 0.8
                    }}
                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-md
                               bg-[var(--accent)] text-black text-xs font-medium whitespace-nowrap
                               pointer-events-none"
                >
                    {item.name}
                    {/* Tooltip arrow */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 
                                    bg-[var(--accent)] rotate-45" />
                </motion.div>

                {/* Active indicator dot */}
                {isActive && (
                    <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 w-1 h-1 rounded-full bg-[var(--accent)]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                )}
            </motion.div>
        </Link>
    );
}
