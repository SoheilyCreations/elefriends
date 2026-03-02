'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Wildlife Photographer",
        text: "The 'Great Gathering' was at its peak. Our guide, Ravi, was incredibly knowledgeable. He knew exactly where to position the jeep for the best light without disturbing the herd. Truly life-changing.",
        image: "/img/img5.jpg"
    },
    {
        name: "Marc & Elena",
        role: "Travel Bloggers",
        text: "Sustainability was our top priority when booking a safari in Sri Lanka. Elefriends exceeded all expectations. No plastic, no crowding the animals, just pure natural beauty. Highest recommendation!",
        image: "/img/img6.jpg"
    },
    {
        name: "Daniel Smith",
        role: "Family Traveler",
        text: "Traveling with two young kids can be tough, but the Elefriends team made us feel so safe and comfortable. The kids are still talking about the baby elephant we saw for hours! A must-do!",
        image: "/img/img7.jpg"
    }
];

export default function TestimonialsSection() {
    return (
        <section className="py-32 bg-[#0b1315] relative overflow-hidden flex flex-col items-center">
            {/* Background pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none">
                <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500 rounded-full blur-[150px] -mr-48 -mt-48" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-emerald-500 rounded-full blur-[150px] -ml-48 -mb-48 opacity-30" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
                <div className="text-center mb-24">
                    <h2 className="text-emerald-400 font-bold tracking-[0.4em] uppercase text-xs mb-4">Voices from the wild</h2>
                    <h3 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.8]">Traveler<br /><span className="text-emerald-500 italic lowercase">Stories</span></h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-md relative group hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className="bg-emerald-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-8 transform -rotate-6 group-hover:rotate-0 transition-transform">
                                <Quote className="w-6 h-6 text-[#0b1315]" />
                            </div>

                            <div className="flex gap-1 mb-6">
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 text-emerald-500 fill-emerald-500" />)}
                            </div>

                            <p className="text-gray-300 font-medium leading-relaxed italic mb-10 text-lg">
                                "{t.text}"
                            </p>

                            <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                                <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-lg transform group-hover:scale-110 transition-transform">
                                    <Image src={t.image} alt={t.name} fill className="object-cover" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-white font-black uppercase text-sm mb-1 tracking-wide">{t.name}</h4>
                                    <p className="text-emerald-500 font-bold text-[10px] uppercase tracking-widest leading-none">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
