'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Sparkles, ShieldCheck, Heart, Instagram, Facebook, Globe } from 'lucide-react';
import Image from 'next/image';
import { ElephantIcon } from '@/components/icons/ElephantIcon';

export default function ContactPage() {
    return (
        <div className="min-h-screen font-sans bg-white selection:bg-emerald-500/30 overflow-x-hidden relative">

            {/* Background Watermark */}
            <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-0 flex items-center justify-center">
                <ElephantIcon className="w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] text-emerald-500 transform rotate-12" />
            </div>

            {/* Cinematic Contact Hero */}
            <section className="relative h-[100dvh] flex flex-col justify-center items-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-[#0b1315]">
                    <Image
                        src="/img/img2.jpg"
                        alt="Contact Elefriends Safari"
                        fill
                        className="object-cover opacity-50 scale-105"
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
                            Always Connected
                        </h2>
                        <div className="h-px w-12 bg-emerald-500/40" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-8xl font-black tracking-tighter mb-8 text-white uppercase leading-[0.9] drop-shadow-2xl"
                    >
                        Start Your <br />
                        <span className="text-emerald-500 italic lowercase tracking-tight">safari story</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-700 max-w-xl mx-auto font-medium text-lg leading-relaxed px-4"
                    >
                        Whether it's a special request or a simple question, we are here to help you plan the perfect wilderness experience.
                    </motion.p>
                </div>
            </section>

            {/* Contact Layout */}
            <section className="relative z-10 py-32 px-4 md:px-12 lg:px-24 -mt-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                        {/* Left Side: Contact Methods */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="lg:col-span-5 space-y-12"
                        >
                            <div>
                                <h3 className="text-emerald-500 font-black tracking-[0.4em] uppercase text-[10px] mb-6 flex items-center gap-3">
                                    <Sparkles className="w-4 h-4" />
                                    Get In Touch
                                </h3>
                                <h2 className="text-4xl md:text-5xl font-black text-[#0b1315] uppercase tracking-tighter leading-none mb-8">
                                    Reach out <br />
                                    <span className="text-emerald-500 italic lowercase tracking-tight">instantly</span>
                                </h2>
                                <p className="text-gray-500 font-medium leading-relaxed">
                                    Our team of experts is dedicated to ensuring you have all the information you need before embarking on your adventure.
                                </p>
                            </div>

                            <div className="space-y-8">
                                {[
                                    { icon: <MapPin className="w-6 h-6" />, title: 'Safari Headquarters', detail: 'Main Road, Habarana, North Central Province, Sri Lanka' },
                                    { icon: <Mail className="w-6 h-6" />, title: 'Email Address', detail: 'info@elefriends.com / bookings@elefriends.com' },
                                    { icon: <Phone className="w-6 h-6" />, title: 'Direct Reach', detail: '+94 777 123 456 (WhatsApp Available)' },
                                    { icon: <Clock className="w-6 h-6" />, title: 'Operating window', detail: 'Every Day: 6:00 AM - 10:00 PM (IST)' }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ x: 10 }}
                                        className="flex gap-6 items-start group cursor-default"
                                    >
                                        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm border border-emerald-500/10">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-[#0b1315] font-black uppercase tracking-widest text-xs mb-2">{item.title}</h4>
                                            <p className="text-gray-400 font-medium text-sm leading-relaxed max-w-xs">{item.detail}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Trust Badge Card */}
                            <div className="bg-emerald-50/50 p-8 rounded-[3rem] border border-emerald-500/5 relative overflow-hidden group">
                                <div className="absolute right-[-20%] bottom-[-20%] opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                                    <ElephantIcon className="w-48 h-48 text-emerald-500" />
                                </div>
                                <div className="relative z-10 flex items-center gap-6">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                                        <ShieldCheck className="w-8 h-8 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-[#0b1315] font-black uppercase text-xs tracking-widest mb-1">Guaranteed Response</h4>
                                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest leading-none">Under 2 Hours</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Side: Contact Form Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="lg:col-span-7 bg-white p-1 md:p-1.5 rounded-[4rem] shadow-2xl border border-gray-100 relative overflow-hidden group"
                        >
                            <div className="bg-[#0b1315] p-10 md:p-16 rounded-[3.5rem] relative z-10">
                                <h3 className="text-white font-black uppercase text-2xl tracking-tighter mb-10 flex items-center gap-4">
                                    Send us a message
                                    <Heart className="w-6 h-6 text-emerald-500 fill-emerald-500" />
                                </h3>

                                <form className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] ml-2 block">Your Name</label>
                                            <input
                                                type="text"
                                                className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 px-6 text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white/10 transition-all placeholder:text-gray-700 shadow-inner"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] ml-2 block">Email address</label>
                                            <input
                                                type="email"
                                                className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 px-6 text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white/10 transition-all placeholder:text-gray-700 shadow-inner"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] ml-2 block">Subject</label>
                                        <select className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 px-6 text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white/10 transition-all shadow-inner appearance-none cursor-pointer">
                                            <option className="bg-[#0b1315]">Booking Inquiry</option>
                                            <option className="bg-[#0b1315]">Custom Safari Package</option>
                                            <option className="bg-[#0b1315]">Photography Request</option>
                                            <option className="bg-[#0b1315]">Feedback / Other</option>
                                        </select>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] ml-2 block">Your Message</label>
                                        <textarea
                                            rows={5}
                                            className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 px-6 text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white/10 transition-all placeholder:text-gray-700 shadow-inner resize-none"
                                            placeholder="Tell us about your dream safari journey..."
                                        />
                                    </div>

                                    <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#0b1315] font-black text-sm uppercase tracking-[0.25em] py-7 rounded-2xl transition-all shadow-xl hover:shadow-emerald-500/20 transform hover:-translate-y-2 active:scale-95 group relative overflow-hidden">
                                        <span className="relative z-10 flex items-center justify-center gap-3">
                                            Send Message
                                            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                                    </button>
                                </form>
                            </div>

                            {/* Decorative Safari Elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 blur-[60px] pointer-events-none" />
                        </motion.div>
                    </div>
                </div>
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
