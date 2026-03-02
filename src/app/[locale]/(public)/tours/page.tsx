'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Compass, Sparkles, MapPin, Loader2 } from 'lucide-react';
import PackageCard from '@/components/home/PackageCard';
import { ElephantIcon } from '@/components/icons/ElephantIcon';
import { tourService } from '@/lib/services/tourService';
import { Tour } from '@/types';

export default function ToursPage() {
    const { scrollY } = useScroll();
    const yHeader = useTransform(scrollY, [0, 400], [0, 100]);
    const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);

    const [packages, setPackages] = useState<Tour[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const data = await tourService.getAllTours();
                // Filter only active packages for the public
                setPackages(data.filter(p => p.is_active));
            } catch (err) {
                console.error('Error fetching packages:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    return (
        <div className="min-h-screen bg-white selection:bg-emerald-500/30 overflow-x-hidden">

            {/* Cinematic Header Section */}
            <section className="relative h-[100dvh] flex flex-col justify-start items-center overflow-hidden bg-[#0b1315]">
                <motion.div
                    style={{ y: yHeader, opacity: opacityHero }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src="/img/img1.jpg"
                        alt="Safari Background"
                        fill
                        className="object-cover opacity-60 scale-110"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-[#0b1315]/40 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0b1315]/80 via-transparent to-transparent z-10" />
                </motion.div>

                {/* Subtle Watermark */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10 flex items-center justify-center">
                    <ElephantIcon className="w-[100vw] h-[100vw] md:w-[50vw] md:h-[50vw] text-emerald-500 transform -rotate-12" />
                </div>

                <div className="relative z-20 text-center px-4 max-w-7xl pt-64 pb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
                            <Sparkles className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.4em]">Handcrafted Journeys</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-black text-white uppercase tracking-tighter leading-[0.8] mb-8 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
                            Safari<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 italic px-4 -ml-4">Collections</span>
                        </h1>
                        <p className="text-white font-bold text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                            Every mile a memory. Every encounter a story. <br className="hidden md:block" />
                            Explore our signature collection of Habarana wildlife experiences.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Packages Grid Section */}
            <section className="py-32 relative z-20 -mt-10">
                <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-20 gap-8 border-b border-gray-100 pb-16">
                        <div className="max-w-xl">
                            <h2 className="text-emerald-500 font-black tracking-[0.4em] uppercase text-[10px] mb-4 flex items-center gap-3">
                                <MapPin className="w-4 h-4" />
                                Available Slots
                            </h2>
                            <h3 className="text-4xl md:text-5xl font-black text-[#0b1315] uppercase tracking-tighter leading-[0.9]">
                                Explore our <br />
                                <span className="text-emerald-500 italic px-4 lowercase tracking-tight">signature experiences</span>
                            </h3>
                        </div>
                        <div className="md:text-right">
                            <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.2em] mb-2 font-mono">Status: High demand</p>
                            <p className="text-gray-500 text-sm font-medium italic border-l-2 md:border-l-0 md:border-r-2 border-emerald-500/20 px-6">
                                "The best time for safari is whenever <br className="hidden lg:block" /> you choose to be wild."
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {packages.map((pkg, index) => (
                            <motion.div
                                key={pkg.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                            >
                                <PackageCard
                                    id={pkg.id}
                                    title={pkg.title}
                                    subtitle={pkg.description.substring(0, 100) + '...'}
                                    duration={pkg.duration}
                                    price={pkg.price}
                                    image={pkg.images?.[0] || '/img/img5.jpg'}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
