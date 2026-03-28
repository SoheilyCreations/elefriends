'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface WordRevealProps {
    text: string;
    className?: string;
    delay?: number;
}

export default function WordReveal({ text, className = "", delay = 0 }: WordRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: delay * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    const words = text.split(" ");

    return (
        <motion.div
            ref={ref}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.25em" }}
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={className}
        >
            {words.map((word, index) => (
                <motion.span
                    variants={child}
                    key={index}
                    style={{ display: "inline-block" }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}
