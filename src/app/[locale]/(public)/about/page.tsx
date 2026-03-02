'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ShieldCheck, Globe, ArrowRight, Camera, Leaf, Instagram, Facebook } from 'lucide-react';
import { ElephantIcon } from '@/components/icons/ElephantIcon';

export default function AboutPage() {
    return (
        <div className="min-h-screen font-sans bg-white selection:bg-emerald-500/30 overflow-x-hidden relative">

            {/* Background Watermark */}
            <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-0 flex items-center justify-center">
                <ElephantIcon className="w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] text-emerald-500 transform rotate-12" />
            </div>

            {/* Cinematic Hero Section */}
            <section className="relative h-[100dvh] flex flex-col justify-center items-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-[#0b1315]">
                    <Image
                        src="/img/img2.jpg"
                        alt="About Elefriends Safari"
                        fill
                        className="object-cover object-[50%_65%] opacity-60 scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0b1315]/80 via-transparent to-white z-10" />
                </div>

                <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-4 mb-8"
                    >
                        <div className="h-px w-12 bg-emerald-500/40" />
                        <h2 className="text-emerald-500 font-black uppercase tracking-[0.4em] text-[10px]">
                            Established 2014
                        </h2>
                        <div className="h-px w-12 bg-emerald-500/40" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-8xl font-black tracking-tighter mb-8 text-white uppercase leading-[0.9] drop-shadow-2xl"
                    >
                        Guardian of the <br />
                        <span className="text-emerald-500 italic lowercase tracking-tight">Gentle Giants</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-700 max-w-2xl mx-auto font-medium text-lg leading-relaxed px-4"
                    >
                        We are more than a safari company. We are a collective of conservationists and local guides dedicated to preserving Sri Lanka's wildlife heritage.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
                >
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Scroll to Explore</span>
                        <div className="w-px h-16 bg-gray-200" />
                    </div>
                </motion.div>
            </section>

            {/* Our Philosophy Grid */}
            <section className="py-32 relative z-10 px-4 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-emerald-500 font-black tracking-[0.4em] uppercase text-[10px] mb-6 flex items-center gap-3">
                            <Sparkles className="w-4 h-4" />
                            Our DNA
                        </h3>
                        <h2 className="text-4xl md:text-6xl font-black text-[#0b1315] uppercase tracking-tighter leading-none mb-8">
                            Respecting the <br />
                            <span className="text-emerald-500 italic lowercase tracking-tight">wild rhythm</span>
                        </h2>
                        <div className="space-y-6 text-gray-500 font-medium leading-relaxed">
                            <p>
                                Founded in the heart of Habarana, Elefriends Sri Lanka was born from a simple realization: the best way to see the wild is to leave it exactly as you found it.
                            </p>
                            <p>
                                Our founders, third-generation native guides, grew up alongside the giants of Minneriya and Kaudulla. This deep connection translated into a safari model that values quiet observation over intrusion.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mt-12">
                            {[
                                { icon: <Heart className="w-5 h-5" />, label: 'Ethical Observation' },
                                { icon: <ShieldCheck className="w-5 h-5" />, label: 'Certified Expertise' },
                                { icon: <Globe className="w-5 h-5" />, label: 'Local Community' },
                                { icon: <Leaf className="w-5 h-5" />, label: 'Zero Carbon Goal' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-500/5 group hover:border-emerald-500/20 transition-all">
                                    <div className="text-emerald-500 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <span className="text-[#0b1315] font-black uppercase text-[10px] tracking-widest">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative group">
                            <Image
                                src="/img/img3.jpg"
                                alt="Ethical Safari"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-[2s]"
                            />
                            <div className="absolute inset-0 bg-[#0b1315]/10 group-hover:bg-transparent transition-colors" />
                        </div>
                        {/* Experience Badge */}
                        <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 hidden md:block">
                            <div className="text-5xl font-black text-[#0b1315] tracking-tighter mb-1">10+</div>
                            <div className="text-emerald-500 font-black text-[10px] uppercase tracking-widest leading-none">Years of <br />Conservation</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why We Are Different - Glassmorphic Cards */}
            <section className="py-24 bg-[#0b1315] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-24 left-1/4 w-96 h-96 bg-emerald-500 blur-[120px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-emerald-500 font-black tracking-[0.4em] uppercase text-[10px] mb-4">Core Principles</h2>
                        <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                            The heart of <br />
                            <span className="text-emerald-500 italic lowercase tracking-tight">Elefriends</span>
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Camera className="w-8 h-8" />,
                                title: 'Ethical Framing',
                                text: 'We never approach closer than 100 meters. We use the wild landscape to frame your shots, not the stress of the animal.'
                            },
                            {
                                icon: <ShieldCheck className="w-8 h-8" />,
                                title: 'Native Wisdom',
                                text: 'Every guide is born and raised in these jungles, possessing knowledge that no training manual can provide.'
                            },
                            {
                                icon: <Leaf className="w-8 h-8" />,
                                title: 'True Legacy',
                                text: '25% of our profits go directly to local reforestation projects and community-led wildlife protection.'
                            }
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] hover:bg-white/10 transition-all group"
                            >
                                <div className="w-16 h-16 rounded-[2rem] bg-emerald-500/20 flex items-center justify-center text-emerald-500 mb-8 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                                    {card.icon}
                                </div>
                                <h4 className="text-white font-black uppercase text-lg tracking-tight mb-4">{card.title}</h4>
                                <p className="text-gray-400 font-medium text-sm leading-relaxed">{card.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-32 px-4 md:px-12 lg:px-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="relative h-[60vh] rounded-[4rem] overflow-hidden group max-w-7xl mx-auto shadow-2xl"
                >
                    <Image
                        src="/img/img1.jpg"
                        alt="Join our journey"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-[2s]"
                    />
                    <div className="absolute inset-0 bg-[#0b1315]/60 backdrop-blur-[2px]" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                        <h3 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
                            Be part of the <br />
                            <span className="text-emerald-500 italic lowercase tracking-tight">wild conservation</span>
                        </h3>
                        <Link
                            href="/contact"
                            className="bg-white hover:bg-emerald-500 hover:text-white text-[#0b1315] font-black text-xs md:text-sm uppercase tracking-[0.2em] py-6 px-12 rounded-2xl transition-all shadow-2xl transform hover:-translate-y-2 active:scale-95 flex items-center gap-3 group"
                        >
                            Connect with us
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Newsletter / Follow Us section with elephant theme */}
            <section className="py-24 border-t border-gray-100 px-4 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto text-center flex flex-col items-center">
                    <h4 className="text-[#0b1315] font-black uppercase text-xs tracking-[0.4em] mb-10">Follow the herd</h4>
                    <div className="flex gap-10">
                        {[
                            { name: 'Instagram', icon: <Instagram className="w-6 h-6" />, link: '#' },
                            { name: 'Facebook', icon: <Facebook className="w-6 h-6" />, link: '#' },
                            { name: 'TripAdvisor', icon: <Globe className="w-6 h-6" />, link: '#' }
                        ].map((social, i) => (
                            <motion.a
                                key={i}
                                href={social.link}
                                whileHover={{ y: -5, scale: 1.1 }}
                                className="flex flex-col items-center gap-3 text-gray-400 hover:text-emerald-500 transition-all duration-300"
                            >
                                <div className="p-4 bg-emerald-50 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                    {social.icon}
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest">{social.name}</span>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
