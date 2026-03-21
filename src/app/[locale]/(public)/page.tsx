'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import DestinationCard from '@/components/home/DestinationCard';
import PackageCard from '@/components/home/PackageCard';
import StatsSection from '@/components/home/StatsSection';
import AboutStorySection from '@/components/home/AboutStorySection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import { ShieldCheck, UserCheck, Car, Award, ArrowRight, Play, Compass, Map, Sparkles } from 'lucide-react';
import { ElephantIcon } from '@/components/icons/ElephantIcon';
import { SriLankanMap, LiyawelPattern } from '@/components/icons/HeritageIcons';

export default function HomePage() {
    const heroRef = useRef<HTMLElement>(null);
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const { scrollY } = useScroll();

    // Parallax & Scroll effects
    const yBg = useTransform(scrollY, [0, 500], [0, 150]);
    const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);
    const scaleHero = useTransform(scrollY, [0, 400], [1, 1.1]);

    // Static Data matched to exact design image
    const destinations = [
        { title: 'Minneriya National Park', subtitle: 'Famous for the great elephant gathering.', image: '/img/img1.jpg', link: '/tours?dest=minneriya' },
        { title: 'Kaudulla National Park', subtitle: 'A vast haven for elephants.', image: '/img/img2.jpg', link: '/tours?dest=kaudulla' },
        { title: 'Eco Hurulu Park', subtitle: 'A greener habitat for roaming wildlife.', image: '/img/img3.jpg', link: '/tours?dest=hurulu' },
        { title: 'Habarana Village', subtitle: 'Experience traditional Sri Lanka life.', image: '/img/img4.jpg', link: '/tours?dest=habarana' },
    ];

    const packages = [
        {
            id: 'minneriya-morning',
            title: 'Minneriya Morning Safari',
            subtitle: 'Witness the morning light with the herd.',
            duration: '4 HOURS',
            price: 40,
            image: '/img/img5.jpg'
        },
        {
            id: 'kaudulla-afternoon',
            title: 'Kaudulla Afternoon Safari',
            subtitle: 'Witness the gathering at sunset.',
            duration: '4 HOURS',
            price: 50,
            image: '/img/img6.jpg'
        },
        {
            id: 'full-day-wildlife',
            title: 'Full Day Wildlife Adventure',
            subtitle: 'Comprehensive tour of the best parks.',
            duration: '10 HOURS',
            price: 150,
            image: '/img/img7.jpg'
        }
    ];

    return (
        <div className="min-h-screen selection:bg-emerald-500/30 font-sans bg-white overflow-x-hidden relative">

            {/* Video Modal */}
            {isVideoOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b1315]/95 backdrop-blur-md p-4">
                    <button 
                        onClick={() => setIsVideoOpen(false)}
                        className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-emerald-400 z-50 p-2 transition-colors cursor-pointer"
                    >
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="w-[95vw] md:w-[85vw] max-w-5xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-[0_0_60px_rgba(16,185,129,0.3)] relative border border-white/10"
                    >
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src="https://player.vimeo.com/video/1175789228?autoplay=1&loop=1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" 
                            title="Elephant Safari Film" 
                            className="absolute inset-0 w-full h-full"
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                            allowFullScreen
                        ></iframe>
                    </motion.div>
                </div>
            )}


            {/* Hero Section - Full Screen & Immersive */}
            <section ref={heroRef} className="relative h-[100dvh] flex flex-col justify-start overflow-hidden">
                {/* Background Image with advanced layers */}
                <motion.div
                    style={{ y: yBg, scale: scaleHero }}
                    className="absolute inset-0 z-0 bg-[#0b1315]"
                >
                    <Image
                        src="/img/hero-safari.png"
                        alt="Majestic Safari Elephant"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b1315] via-[#0b1315]/20 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1315] via-transparent to-transparent z-10" />
                </motion.div>

                {/* Animated Background Elements */}
                <div className="absolute -left-20 top-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none z-10" />
                <div className="absolute right-0 bottom-1/4 w-[40vw] h-[40vw] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none z-10" />

                {/* Subtle Elephant Watermark for theme feeling */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-10 overflow-hidden flex items-center justify-center">
                    <ElephantIcon className="w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] text-emerald-500 absolute -right-[20%] top-[10%] transform rotate-12" />
                    <SriLankanMap className="w-[30vw] h-auto text-emerald-500 absolute left-[5%] bottom-[5%] opacity-40 rotate-[15deg] blur-[2px]" />
                </div>

                <motion.div
                    style={{ opacity: opacityHero }}
                    className="relative z-20 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto w-full flex flex-col items-start pt-32"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-4 mb-8 bg-white/5 backdrop-blur-md border border-white/10 px-8 py-2.5 rounded-full shadow-2xl"
                    >
                        <ElephantIcon className="w-5 h-5 text-emerald-400" />
                        <h2 className="text-emerald-400 font-bold uppercase tracking-[0.5em] text-[10px] md:text-xs">
                            Sri Lanka's Ethical Safari Experts
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "circOut" }}
                        className="relative"
                    >
                        <h1 className="font-black tracking-tighter mb-4 text-white uppercase drop-shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col items-start">
                            <span className="text-3xl md:text-5xl lg:text-[4rem] leading-none mb-1 opacity-90">In to the</span>
                            <div className="flex items-baseline gap-4 mb-2">
                                <span className="text-6xl md:text-7xl lg:text-[8rem] text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 italic leading-[0.8] drop-shadow-none pr-4">World</span>
                                <span className="text-3xl md:text-5xl lg:text-[4rem] opacity-90">of</span>
                            </div>
                            <span className="text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.85]">Gentle Giants</span>
                        </h1>

                        {/* Immersive Floating Badge */}
                        <motion.div
                            initial={{ opacity: 0, rotate: -25, scale: 0.5 }}
                            animate={{ opacity: 1, rotate: -8, scale: 1 }}
                            transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
                            className="absolute -right-16 bottom-24 md:-right-24 md:bottom-24 bg-white/10 backdrop-blur-3xl border border-white/20 p-8 rounded-[3rem] hidden xl:block shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] group"
                        >
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="text-emerald-400 font-black text-6xl mb-1 tabular-nums transition-transform group-hover:scale-110">98%</div>
                                <div className="text-gray-200 font-bold text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-center leading-relaxed max-w-[180px]">of Our guests<br />spot elefriends</div>
                                <div className="flex gap-2 mt-6">
                                    {[1, 2, 3, 4, 5].map(i => <motion.div key={i} animate={{ scale: [1, 1.3, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, delay: i * 0.2 }} className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />)}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-base md:text-xl text-gray-300 md:leading-relaxed mb-10 max-w-2xl font-bold border-l-4 border-emerald-500/60 pl-8 mt-12"
                    >
                        Witness the <span className="text-emerald-400 italic">"Great Gathering"</span>—the world's most spectacular wildlife ritual, led by those who truly belong to the wild.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-wrap gap-10 items-center"
                    >
                        <Link
                            href="/tours"
                            className="group bg-emerald-500 hover:bg-emerald-400 text-[#0b1315] font-black text-sm uppercase tracking-[0.3em] py-7 px-20 rounded-3xl shadow-[0_30px_70px_-15px_rgba(16,185,129,0.5)] transition-all transform hover:-translate-y-3 flex items-center gap-6"
                        >
                            Explore Trips
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-4 transition-transform" />
                        </Link>

                        <div 
                            onClick={() => setIsVideoOpen(true)}
                            className="flex items-center gap-8 group cursor-pointer hover:scale-110 transition-all duration-500"
                        >
                            <div className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center p-2 group-hover:border-emerald-500 shadow-2xl">
                                <div className="w-full h-full bg-emerald-500/10 rounded-full flex items-center justify-center group-hover:bg-emerald-500 transition-all">
                                    <Play className="w-8 h-8 text-white fill-white group-hover:text-[#0b1315] group-hover:fill-[#0b1315] ml-2 transition-all" />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white font-black text-sm uppercase tracking-[0.4em]">Watch Film</span>
                                <span className="text-emerald-500/60 font-black text-[10px] uppercase tracking-widest mt-1">Experience the wild</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bottom Scroll Indicator - Right Side Cinematic */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-12 right-6 md:right-16 flex flex-col items-center gap-6 z-20"
                >
                    <span className="text-[11px] text-emerald-400 font-black uppercase tracking-[0.6em] vertical-rl h-24 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">Scroll Deep</span>
                    <div className="h-20 w-[1.5px] bg-emerald-500/30 relative flex justify-center mt-2 group">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/50 to-emerald-500 rounded-full" />
                        
                        {/* Subtle Chevron Arrow Head */}
                        <motion.svg 
                            animate={{ y: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            className="absolute -bottom-3 w-4 h-4 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" 
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </motion.svg>
                    </div>
                </motion.div>
            </section>

            {/* Stats Section Integrated */}
            <StatsSection />

            {/* About Story Section Integrated */}
            <AboutStorySection />

            {/* Popular Destinations Section - Refined */}
            <section className="py-24 bg-white relative z-10 overflow-hidden">
                {/* Decorative background number with parallax */}
                <motion.div
                    style={{ y: useTransform(scrollY, [1000, 2000], [0, -100]) }}
                    className="absolute top-0 right-0 text-[30rem] font-black text-gray-50 select-none pointer-events-none -mt-40 -mr-20 z-0"
                >
                    01
                </motion.div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10"
                    >
                        <div className="max-w-xl">
                            <h2 className="text-emerald-500 font-black tracking-[0.4em] uppercase text-[10px] mb-4 flex items-center gap-3">
                                <Compass className="w-4 h-4" />
                                Iconic Habitats
                            </h2>
                            <h3 className="text-5xl md:text-7xl font-black text-[#0b1315] uppercase tracking-tighter leading-[0.8]">
                                The Wild<br />
                                <span className="text-emerald-500 italic lowercase tracking-tight">destinations</span>
                            </h3>
                        </div>
                        <Link href="/destinations" className="group flex items-center gap-4 bg-[#f8f9fa] border border-gray-100 p-6 rounded-3xl hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-300">
                            <span className="text-[#0b1315] font-black text-xs uppercase tracking-widest group-hover:text-white">View All Zones</span>
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform shadow-sm">
                                <ArrowRight className="w-5 h-5 text-[#0b1315]" />
                            </div>
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {destinations.map((dest, index) => (
                            <motion.div
                                key={dest.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                            >
                                <DestinationCard {...dest} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Safari Packages Section - Refined */}
            <section className="py-24 relative z-10 bg-[#f8f9fa] overflow-hidden">
                {/* Asymmetrical pattern with parallax */}
                <motion.div
                    style={{ scale: useTransform(scrollY, [1500, 2500], [1, 1.2]) }}
                    className="absolute top-0 right-[-10%] w-[60%] aspect-square rounded-full border-[80px] border-[#eff1f3] pointer-events-none transform -translate-y-1/2 opacity-60 z-0"
                />

                <motion.div
                    style={{ rotate: useTransform(scrollY, [1500, 2500], [0, 45]) }}
                    className="absolute bottom-0 left-0 p-12 opacity-[0.02] pointer-events-none"
                >
                    <ElephantIcon className="w-96 h-96" />
                </motion.div>

                {/* Local Heritage Vibe Pattern */}
                <div className="absolute top-[20%] right-[10%] opacity-[0.015] pointer-events-none z-0">
                    <LiyawelPattern className="w-[60vw] h-auto text-emerald-500" />
                </div>
                <div className="absolute bottom-[20%] left-[5%] opacity-[0.015] pointer-events-none z-0 rotate-180">
                    <LiyawelPattern className="w-[40vw] h-auto text-emerald-500" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8"
                    >
                        <div className="text-center md:text-left">
                            <h2 className="text-emerald-500 font-bold tracking-[0.4em] uppercase text-xs mb-4">Curated Experiences</h2>
                            <h3 className="text-5xl md:text-6xl font-black text-[#0b1315] uppercase tracking-tighter leading-[0.9]">Signature <br />Tours</h3>
                        </div>
                        <p className="text-gray-500 font-medium max-w-md text-sm text-center md:text-right leading-relaxed italic border-r-2 border-emerald-500/20 pr-8">
                            "Every safari is an unwritten story. Our signature packages ensure yours is worth telling a thousand times."
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {packages.map((pkg, index) => (
                            <motion.div
                                key={pkg.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: index * 0.15 }}
                            >
                                <PackageCard {...pkg} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Integrated */}
            <TestimonialsSection />

            {/* FAQ Section - Refined */}
            <section className="py-24 bg-white relative z-10 overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center mb-20"
                    >
                        <div className="bg-emerald-500/10 p-4 rounded-3xl mb-6">
                            <Map className="w-8 h-8 text-emerald-500" />
                        </div>
                        <h2 className="text-emerald-500 font-bold tracking-[0.4em] uppercase text-xs mb-4">Common Queries</h2>
                        <h3 className="text-5xl md:text-6xl font-black text-[#0b1315] uppercase tracking-tighter text-center">Frequently Asked</h3>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {[
                            { q: "What is the best time for safari?", a: "The best time is usually between May and September in Minneriya and Kaudulla to witness the elephant gathering." },
                            { q: "Are children allowed?", a: "Yes, our safaris are completely family-friendly and safe for children of all ages. We have special comfort seats." },
                            { q: "What should we wear?", a: "Light, comfortable cotton clothing in neutral colors like beige, khaki or green. Don't forget hats & sunscreen!" },
                            { q: "Do you offer private jeeps?", a: "Absolutely. All our standard bookings provide a private vehicle and guide for your group to ensure the best experience." }
                        ].map((faq, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="bg-[#f8f9fa] p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all group"
                            >
                                <h4 className="text-[#0b1315] font-black uppercase tracking-wide mb-4 flex items-start gap-4">
                                    <span className="text-emerald-500 font-black">Q.</span>
                                    {faq.q}
                                </h4>
                                <div className="pl-8 border-l-2 border-emerald-500/20">
                                    <p className="text-gray-500 text-sm leading-relaxed font-medium">
                                        {faq.a}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-32 bg-[#0b1315] relative overflow-hidden">
                <motion.div
                    style={{ scale: useTransform(scrollY, [2500, 3500], [1, 1.3]), opacity: 0.2 }}
                    className="absolute inset-0 z-0"
                >
                    <Image src="/img/img2.jpg" alt="Final CTA background" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1315] via-[#0b1315]/80 to-[#0b1315]" />
                </motion.div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <ElephantIcon className="w-24 h-24 text-emerald-400 opacity-30 mx-auto mb-10" />
                        <h2 className="text-emerald-500 font-black tracking-[0.4em] uppercase text-xs mb-6">Ready for the adventure?</h2>
                        <h3 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-12">
                            The wild is calling <br />
                            <span className="text-emerald-500 italic lowercase tracking-tight">are you ready?</span>
                        </h3>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row justify-center items-center gap-6"
                    >
                        <Link
                            href="/tours"
                            className="group bg-emerald-500 hover:bg-emerald-400 text-[#0b1315] font-black text-sm uppercase tracking-widest py-6 px-16 rounded-2xl shadow-2xl transition-all transform hover:-translate-y-2 flex items-center gap-4 w-full sm:w-auto"
                        >
                            Book Your Slot
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                        </Link>
                        <Link
                            href="/contact"
                            className="group bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-sm uppercase tracking-widest py-6 px-16 rounded-2xl transition-all w-full sm:w-auto"
                        >
                            Talk to Guide
                        </Link>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
