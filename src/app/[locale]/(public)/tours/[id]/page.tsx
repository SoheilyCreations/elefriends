'use client';

import React, { useState, useRef, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Clock, Users, ShieldCheck, Map, ArrowLeft, CheckCircle2, Star, Calendar, Camera, Leaf, Sparkles, Loader2 } from 'lucide-react';
import BookingModal from '@/components/booking/BookingModal';
import { ElephantIcon } from '@/components/icons/ElephantIcon';
import { tourService } from '@/lib/services/tourService';
import { Tour } from '@/types';

export default function TourDetailsPage({ params }: { params: any }) {
    // Robust param unwrapping for Next.js 15+
    const resolvedParams = params instanceof Promise ? use(params) : params;
    const { id } = resolvedParams;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    const [tourInfo, setTourInfo] = useState<Tour | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTour = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const data = await tourService.getTourById(id);
                setTourInfo(data);
            } catch (err) {
                console.error('Error fetching tour:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchTour();
    }, [id]);

    // Parallax effects
    const yHero = useTransform(scrollY, [0, 500], [0, 200]);
    const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0b1315]">
                <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
            </div>
        );
    }

    if (!tourInfo) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b1315] text-white p-6 text-center">
                <h2 className="text-4xl font-black uppercase mb-4">The Trail is Gone</h2>
                <p className="text-gray-400 mb-2">Package ID: {id || 'Unknown'}</p>
                <p className="text-gray-400 mb-8">We couldn't find this specific safari experience.</p>
                <Link href="/tours" className="text-emerald-500 font-bold uppercase tracking-widest hover:underline">Return to Collection</Link>
            </div>
        );
    }

    const heroImage = tourInfo.images && tourInfo.images.length > 0 ? tourInfo.images[0] : '/img/img5.jpg';
    const tourHighlights = tourInfo.highlights || [];

    return (
        <div className="min-h-screen font-sans bg-white selection:bg-emerald-500/30 overflow-x-hidden relative">

            {/* Background Watermark */}
            <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-0 flex items-center justify-center pointer-events-none">
                <ElephantIcon className="w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] text-emerald-500 transform rotate-12" />
            </div>

            {/* Cinematic Hero Header */}
            <section className="relative h-[100dvh] flex flex-col justify-start overflow-hidden bg-[#0b1315]">
                <motion.div
                    style={{ y: yHero, opacity: opacityHero }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={heroImage}
                        alt={tourInfo.title}
                        fill
                        className="object-cover object-[50%_65%] scale-110"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1315] via-[#0b1315]/70 to-[#0b1315]/40 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0b1315]/80 via-transparent to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b1315]/80 via-transparent to-transparent z-10" />
                </motion.div>

                <div className="relative z-20 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto w-full pb-32 pt-64">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link href="/tours" className="inline-flex items-center text-emerald-400 hover:text-white font-black text-[10px] uppercase tracking-[0.4em] transition-all mb-8 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full group">
                            <ArrowLeft className="w-3 h-3 mr-3 group-hover:-translate-x-2 transition-transform" />
                            Back to Collection
                        </Link>
                        <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-4 text-white uppercase leading-[0.8] drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
                            {tourInfo.title.split(' ').length > 1 ? tourInfo.title.split(' ').slice(0, -1).join(' ') : tourInfo.title}<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 italic px-4 -ml-2">
                                {tourInfo.title.split(' ').length > 1 ? tourInfo.title.split(' ').slice(-1) : 'Safari'}
                            </span>
                        </h1>
                        <p className="text-gray-300 font-bold text-lg md:text-xl max-w-xl border-l-4 border-emerald-500/60 pl-8 mt-6">
                            {tourInfo.description.substring(0, 150)}...
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 -mt-10 relative z-30 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* Left Column: Deep Dive */}
                    <div className="lg:col-span-8 space-y-16">

                        {/* Quick Stats Bar - Glassmorphism */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-2 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100"
                        >
                            <div className="flex flex-col items-center justify-center p-6 bg-emerald-50/50 rounded-[2rem]">
                                <Clock className="w-6 h-6 text-emerald-500 mb-2" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Time</span>
                                <span className="text-sm font-black text-[#0b1315]">{tourInfo.duration}</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-6 rounded-[2rem]">
                                <Users className="w-6 h-6 text-emerald-500 mb-2" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Limit</span>
                                <span className="text-sm font-black text-[#0b1315]">Max 6</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-6 bg-emerald-50/50 rounded-[2rem]">
                                <ShieldCheck className="w-6 h-6 text-emerald-500 mb-2" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Safety</span>
                                <span className="text-sm font-black text-[#0b1315]">Certified</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-6 rounded-[2rem]">
                                <Map className="w-6 h-6 text-emerald-500 mb-2" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Zone</span>
                                <span className="text-sm font-black text-[#0b1315]">Habarana</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-10"
                        >
                            <div className="relative">
                                <h2 className="text-emerald-500 font-black tracking-[0.4em] uppercase text-[10px] mb-4 flex items-center gap-3">
                                    <Leaf className="w-4 h-4" />
                                    The Narrative
                                </h2>
                                <h3 className="text-4xl md:text-5xl font-black text-[#0b1315] uppercase tracking-tighter leading-none mb-8">
                                    Where the wild <br />
                                    <span className="text-emerald-500 italic lowercase tracking-tight">meets the soul</span>
                                </h3>
                                <p className="text-gray-500 text-lg leading-relaxed font-medium">
                                    {tourInfo.description}
                                </p>
                            </div>

                            {/* Icons Grid for Highlights */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 relative">
                                <div className="absolute -right-20 top-0 opacity-[0.03] pointer-events-none hidden lg:block">
                                    <ElephantIcon className="w-64 h-64 text-emerald-500 rotate-12" />
                                </div>
                                {tourHighlights.map((item, idx) => (
                                    <div key={idx} className="flex gap-6 items-center p-6 bg-white rounded-3xl border border-gray-100 hover:border-emerald-500/20 transition-all group shadow-sm">
                                        <div className="bg-emerald-50/50 w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-emerald-500 transition-colors">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500 group-hover:text-white" />
                                        </div>
                                        <span className="text-[#0b1315] font-black uppercase text-xs tracking-widest">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Day Itinerary Section */}
                        {tourInfo.itinerary && tourInfo.itinerary.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="space-y-12 pb-20 mt-16"
                            >
                                <div className="relative">
                                    <h2 className="text-emerald-500 font-black tracking-[0.4em] uppercase text-[10px] mb-4 flex items-center gap-3">
                                        <Map className="w-4 h-4 ml-2" />
                                        The Expedition
                                    </h2>
                                    <h3 className="text-4xl md:text-5xl font-black text-[#0b1315] uppercase tracking-tighter leading-none mb-12">
                                        Day by day <br />
                                        <span className="text-emerald-500 italic lowercase tracking-tight">itinerary breakdown</span>
                                    </h3>

                                    <div className="space-y-4">
                                        {tourInfo.itinerary.map((day, dIdx) => (
                                            <div key={dIdx} className="group pb-12 last:pb-0 relative">
                                                {/* Timeline Line */}
                                                {tourInfo.itinerary && dIdx !== (tourInfo.itinerary.length - 1) && (
                                                    <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-100 group-hover:bg-emerald-500/20 transition-colors" />
                                                )}

                                                <div className="flex gap-8 relative z-10">
                                                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-white border border-gray-100 text-[#0b1315] flex items-center justify-center font-black text-xs shadow-sm group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all duration-500 mt-2">
                                                        {day.day}
                                                    </div>
                                                    <div className="space-y-4 pt-1">
                                                        <h4 className="text-xl font-black text-[#0b1315] uppercase tracking-tight">{day.title}</h4>
                                                        <ul className="space-y-4">
                                                            {day.activities.map((act, aIdx) => (
                                                                <li key={aIdx} className="flex gap-4 text-gray-500 font-medium text-sm">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                                                    {act}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Right Column: High-conversion Sticky Booking */}
                    <div className="lg:col-span-4 self-start sticky top-32">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative"
                        >
                            {/* Decorative Safari Glow */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/20 blur-[80px] rounded-full pointer-events-none" />

                            <div className="bg-[#0b1315] rounded-[2.5rem] p-8 md:p-9 border border-white/10 shadow-2xl relative overflow-hidden group">
                                {/* Thin Glassmorphic Header */}
                                <div className="flex flex-col gap-3 mb-8">
                                    <div className="bg-emerald-500/10 self-start px-4 py-1.5 rounded-full border border-emerald-500/20">
                                        <span className="text-emerald-400 font-black text-[9px] uppercase tracking-[0.2em] flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            Instant Booking
                                        </span>
                                    </div>
                                    <div className="flex gap-0.5 px-1">
                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-2.5 h-2.5 text-emerald-500 fill-emerald-500" />)}
                                    </div>
                                </div>

                                {/* Price Reveal */}
                                <div className="mb-8">
                                    <span className="text-gray-500 font-black text-[9px] uppercase tracking-[0.4em] mb-2 block">Total investment</span>
                                    <div className="flex items-baseline gap-2">
                                        <h2 className="text-6xl font-black text-white tracking-tighter leading-none">${tourInfo.price}</h2>
                                        <span className="text-gray-500 font-bold text-xs uppercase tracking-widest mt-1">/pax</span>
                                    </div>
                                </div>

                                {/* Simplified High-Impact Stats */}
                                <div className="grid grid-cols-2 gap-3 mb-8">
                                    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                                        <span className="text-gray-500 font-black text-[8px] uppercase tracking-widest mb-1 block">Deposit</span>
                                        <span className="text-white font-black text-base">${tourInfo.price * 0.25}</span>
                                    </div>
                                    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                                        <span className="text-gray-500 font-black text-[8px] uppercase tracking-widest mb-1 block">Safety</span>
                                        <span className="text-white font-black text-base">Certified</span>
                                    </div>
                                </div>

                                {/* Quick Perks */}
                                <div className="space-y-4 mb-10 px-1">
                                    {[
                                        { icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />, label: 'Verified Guide included' },
                                        { icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />, label: 'All Park fees included' },
                                        { icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />, label: 'Free cancellation' }
                                    ].map((perk, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            {perk.icon}
                                            <span className="text-gray-400 font-bold text-[11px] uppercase tracking-widest leading-none">{perk.label}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Primary Action */}
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#0b1315] font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl transition-all shadow-xl hover:shadow-emerald-500/20 transform hover:-translate-y-1 active:scale-95 group relative overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Secure This Journey
                                        <Sparkles className="w-3.5 h-3.5" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                                </button>

                                <p className="text-center text-gray-600 font-black text-[9px] uppercase tracking-[0.4em] mt-8 group-hover:text-emerald-500/40 transition-colors cursor-default">
                                    98.4% Success Rate
                                </p>
                            </div>
                        </motion.div>
                    </div>

                </div>

                {/* Full Width Why Choose Us Section */}
                <div className="mt-24 relative overflow-hidden">
                    <div className="flex flex-col items-center text-center mb-16">
                        <h2 className="text-emerald-500 font-black tracking-[0.4em] uppercase text-[10px] mb-4 flex items-center gap-3">
                            <Sparkles className="w-4 h-4" />
                            Why Choose Us
                        </h2>
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0b1315] uppercase tracking-tighter leading-none">
                            The Elefriends <br />
                            <span className="text-emerald-500 italic lowercase tracking-tight">Difference</span>
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: <Camera className="w-6 h-6" />,
                                title: 'Photography Ready',
                                text: 'Our drivers are trained to position jeeps at perfect angles for your shots.',
                                delay: 0.1
                            },
                            {
                                icon: <Leaf className="w-6 h-6" />,
                                title: 'Ethical Approach',
                                text: 'Respectful distance ensured, zero stress for the magnificent wildlife.',
                                delay: 0.2
                            },
                            {
                                icon: <ShieldCheck className="w-6 h-6" />,
                                title: 'Certified Guides',
                                text: 'Expert trackers with deep knowledge of elephant family structures.',
                                delay: 0.3
                            },
                            {
                                icon: <Map className="w-6 h-6" />,
                                title: 'Off-Road Mastery',
                                text: 'Navigating secret trails to avoid crowds and find hidden herds.',
                                delay: 0.4
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: item.delay }}
                                className="p-8 bg-white rounded-[2rem] border border-gray-100 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] transition-all group shadow-sm hover:border-emerald-500/20"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                                    {item.icon}
                                </div>
                                <h4 className="text-[#0b1315] font-black uppercase text-sm tracking-widest mb-3">{item.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-24 border-t border-gray-100 pt-24">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                        <div>
                            <h2 className="text-emerald-500 font-black tracking-[0.4em] uppercase text-[10px] mb-4 flex items-center gap-3">
                                <Star className="w-4 h-4 fill-emerald-500" />
                                Guest Experience
                            </h2>
                            <h3 className="text-4xl md:text-5xl font-black text-[#0b1315] uppercase tracking-tighter">
                                What our <span className="text-emerald-500 italic lowercase tracking-tight">explorers say</span>
                            </h3>
                        </div>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-5 h-5 text-emerald-500 fill-emerald-500" />
                            ))}
                            <span className="ml-2 font-black text-[#0b1315]">4.9/5.0</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { name: 'Sarah Jenkins', date: 'Feb 2024', comment: 'Absolutely breathtaking! The morning mist and the elephants gathering by the water was like a scene from a movie.', avatar: 'SJ' },
                            { name: 'Marc Dubois', date: 'Jan 2024', comment: 'Our guide was so knowledgeable. We didn’t just see elephants, we learned about their family structures and behavior.', avatar: 'MD' },
                            { name: 'Elena Rossi', date: 'Dec 2023', comment: 'Professional, safe, and truly ethical. They kept a respectful distance which I really appreciated.', avatar: 'ER' }
                        ].map((review, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-emerald-50/10 p-8 rounded-[2rem] border border-emerald-500/5 shadow-sm"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center font-black text-white text-xs">
                                        {review.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-[#0b1315] text-sm uppercase">{review.name}</h4>
                                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{review.date}</p>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed italic">"{review.comment}"</p>
                            </motion.div>
                        ))}
                    </div>
                    {/* Final CTA Section */}
                    <div className="mt-24">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative h-[60vh] rounded-[4rem] overflow-hidden group"
                        >
                            <Image
                                src={heroImage}
                                alt="Final CTA"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-[2s]"
                            />
                            <div className="absolute inset-0 bg-[#0b1315]/70 backdrop-blur-[2px]" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h3 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.9]">
                                        Ready for the<br />
                                        <span className="text-emerald-500 italic lowercase tracking-tight">ultimate journey?</span>
                                    </h3>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="bg-emerald-500 hover:bg-emerald-400 text-[#0b1315] font-black text-sm uppercase tracking-[0.2em] py-6 px-12 rounded-2xl transition-all shadow-[0_30px_60px_-15px_rgba(16,185,129,0.5)] transform hover:-translate-y-2 active:scale-95 relative overflow-hidden group"
                                    >
                                        <span className="relative z-10">Secure Your Experience</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                                    </button>
                                    <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.4em] mt-10 opacity-60">
                                        Limited Slots Available for March - April
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                packageId={tourInfo.id}
                packageTitle={tourInfo.title}
                packagePrice={tourInfo.price}
                packageImage={heroImage}
            />
        </div>
    );
}

