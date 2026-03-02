'use client';

import { motion } from 'framer-motion';
import { Users, MapPin, Milestone, Sun } from 'lucide-react';

const stats = [
    { label: 'Happy Travelers', value: '5,000+', icon: Users },
    { label: 'Safari Tours', value: '1,200+', icon: MapPin },
    { label: 'Expert Guides', value: '15+', icon: Milestone },
    { label: 'Wildlife Sightings', value: '98%', icon: Sun },
];

export default function StatsSection() {
    return (
        <section className="bg-[#0b1315] py-20 relative overflow-hidden border-y border-white/5">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-emerald-500 group-hover:bg-emerald-500/10 transition-all duration-300 transform group-hover:rotate-6">
                                <stat.icon className="w-7 h-7 text-emerald-500" />
                            </div>
                            <h4 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter uppercase">{stat.value}</h4>
                            <p className="text-emerald-400 font-bold text-[10px] uppercase tracking-[0.2em]">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
