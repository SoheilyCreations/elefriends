'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Destination, Tour } from '@/types';
import { destinationService } from '@/lib/services/destinationService';
import { tourService } from '@/lib/services/tourService';
import { Loader2, ArrowLeft, MapPin, Calendar, Users, ArrowRight, Sun, Wind, Mountain, PawPrint, Sparkles, PhoneCall, Compass, Camera, Globe, Clock, Thermometer } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';

export default function DestinationDetail() {
    const params = useParams();
    const slug = params.slug as string;

    const [destination, setDestination] = useState<Destination | null>(null);
    const [tours, setTours] = useState<Tour[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const destData = await destinationService.getDestinationBySlug(slug);
                setDestination(destData);
                setActiveImage(destData.image);

                const toursData = await tourService.getToursByDestination(destData.id);
                setTours(toursData);
            } catch (error) {
                console.error('Error fetching destination data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc]">
                <div className="flex flex-col items-center gap-6">
                    <div className="relative">
                        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                        <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-xl animate-pulse" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-gray-300 ml-[0.6em]">Aligning Wilderness</span>
                </div>
            </div>
        );
    }

    if (!destination) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white p-4">
                <div className="text-center space-y-6">
                    <h1 className="text-3xl font-black text-[#0b1315] uppercase tracking-tighter">Destination Uncharted</h1>
                    <Link href="/destinations" className="inline-flex items-center gap-2 text-emerald-600 font-bold uppercase text-[10px] tracking-widest hover:gap-4 transition-all">
                        <ArrowLeft size={14} /> Back to Discovery
                    </Link>
                </div>
            </div>
        );
    }

    const galleryImages = [
        destination.image,
        ...tours.flatMap(t => t.images)
    ].filter((img, i, self) => self.indexOf(img) === i).slice(0, 12);

    return (
        <div className="min-h-screen bg-[#fcfcfc] pb-32 font-sans selection:bg-emerald-500 selection:text-white">
            
            {/* Ultra-Clean Hero */}
            <div className="relative h-[75vh] w-full overflow-hidden bg-[#0b1315]">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={activeImage || destination.image}
                        alt={destination.title}
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                </motion.div>
                
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fcfcfc]" />
                
                {/* Minimalist Header Overlay */}
                <div className="absolute top-0 left-0 w-full p-8 md:p-12 z-20">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <Link href="/destinations" className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#0b1315] transition-all">
                                <ArrowLeft size={16} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Explore All</span>
                        </Link>
                    </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-4xl"
                    >
                        <h4 className="text-emerald-400 font-black uppercase text-[10px] tracking-[0.6em] mb-6 ml-[0.6em]">Experience Sri Lanka</h4>
                        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white uppercase tracking-tighter leading-[0.8] mb-8 mix-blend-difference">
                            {destination.title}
                        </h1>
                        <div className="flex items-center justify-center gap-4 text-white/40 font-bold uppercase text-[9px] tracking-[0.3em]">
                            <span className="w-8 h-[1px] bg-white/20" />
                            {destination.subtitle || 'Nature Preserve'}
                            <span className="w-8 h-[1px] bg-white/20" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Architecture */}
            <div className="max-w-7xl mx-auto px-4 lg:px-8 -mt-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    
                    {/* Main Narrative Column */}
                    <div className="lg:col-span-8 space-y-32">
                        
                        {/* Quick Insights Pills */}
                        <div className="flex flex-wrap gap-4">
                            {[
                                { icon: Sun, label: 'Best Time', value: 'Feb - Oct' },
                                { icon: Thermometer, label: 'Temp', value: '29°C Avg' },
                                { icon: MapPin, label: 'Region', value: destination.subtitle || 'North Central' },
                                { icon: Clock, label: 'Travel', value: '4.5 hrs from CBO' }
                            ].map((pill, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6 + (i * 0.1) }}
                                    className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-6 py-3 shadow-sm hover:shadow-md transition-all cursor-default"
                                >
                                    <pill.icon className="w-4 h-4 text-emerald-500" />
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{pill.label}</span>
                                        <span className="text-xs font-black text-[#0b1315] uppercase tracking-tight">{pill.value}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Editorial Story */}
                        <div className="space-y-12">
                            <div className="flex items-center gap-4">
                                <Sparkles className="text-emerald-500 w-5 h-5 animate-pulse" />
                                <h2 className="text-3xl font-black text-[#0b1315] uppercase tracking-tighter">The Heritage Story</h2>
                            </div>
                            <div className="prose prose-emerald max-w-none">
                                <p className="text-gray-600 text-xl md:text-2xl leading-[1.6] font-medium tracking-tight">
                                    {destination.description}
                                </p>
                            </div>
                        </div>

                        {/* Wilderness Rhythm Section (Replacing Video) */}
                        <div className="space-y-16">
                            <div className="flex flex-col gap-2">
                                <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.4em]">Strategic Discovery</span>
                                <h3 className="text-4xl font-black text-[#0b1315] uppercase tracking-tighter leading-none">The Wild Rhythm</h3>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {/* Probability Grid */}
                                <div className="space-y-8">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0b1315]/40 border-b border-gray-100 pb-4">
                                        Wildlife Probability Index
                                    </h4>
                                    <div className="grid grid-cols-1 gap-6">
                                        {[
                                            { label: 'Ceylon Leopard', prob: 88, icon: '🐆' },
                                            { label: 'Asian Elephant', prob: 96, icon: '🐘' },
                                            { label: 'Sloth Bear', prob: 64, icon: '🐻' },
                                            { label: 'White Bellied Eagle', prob: 92, icon: '🦅' }
                                        ].map((item, i) => (
                                            <div key={i} className="group">
                                                <div className="flex justify-between items-end mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xl">{item.icon}</span>
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#0b1315] group-hover:text-emerald-600 transition-colors">{item.label}</span>
                                                    </div>
                                                    <span className="text-xs font-black text-emerald-500">{item.prob}%</span>
                                                </div>
                                                <div className="h-[2px] w-full bg-gray-100 rounded-full overflow-hidden">
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${item.prob}%` }}
                                                        transition={{ duration: 1.5, delay: i * 0.1, ease: "circOut" }}
                                                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Safari Chronology */}
                                <div className="bg-[#0b1315] rounded-[3rem] p-12 text-white shadow-2xl shadow-[#0b1315]/20">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 mb- aggregation border-b border-white/10 pb-4 mb-10">
                                        Typical Safari Rituals
                                    </h4>
                                    <div className="space-y-8 relative">
                                        <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-emerald-500/50 via-white/10 to-transparent" />
                                        {[
                                            { time: '05:30 AM', event: 'Dawn Gates Opening', desc: 'The golden hour for forest light' },
                                            { time: '07:30 AM', event: 'Predator Peak Hour', desc: 'Active hunting window for big cats' },
                                            { time: '12:00 PM', event: 'Hidden Villu Retreat', desc: 'Watching bears near water holes' },
                                            { time: '04:30 PM', event: 'Golden Herd Arrival', desc: 'Elephants gather in vast clearings' }
                                        ].map((item, i) => (
                                            <div key={i} className="flex gap-6 items-start relative pl-2 group">
                                                <div className="w-[14px] h-[14px] rounded-full bg-emerald-500 mt-1 shrink-0 z-10 border-2 border-[#0b1315] transition-transform group-hover:scale-150" />
                                                <div className="space-y-1">
                                                    <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest block">{item.time}</span>
                                                    <p className="text-xs font-black uppercase tracking-tight leading-none mb-1">{item.event}</p>
                                                    <p className="text-[10px] font-medium text-white/40">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Refined Gallery Section */}
                        <div className="space-y-12">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.4em]">Visual Archive</span>
                                    <h3 className="text-4xl font-black text-[#0b1315] uppercase tracking-tighter">Snapshots from the Wild</h3>
                                </div>
                                <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[#0b1315] bg-white border border-gray-100 px-6 py-3 rounded-full hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                                    <Camera size={14} /> Full Gallery
                                </button>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {galleryImages.map((img, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 0.98 }}
                                        className={`relative overflow-hidden rounded-[2rem] bg-gray-100 ${
                                            i % 3 === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'
                                        }`}
                                    >
                                        <Image src={img} alt={`Gallery ${i}`} fill className="object-cover transition-transform duration-1000 hover:scale-110" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Curated Excursions */}
                        <div id="tours-section" className="space-y-16">
                            <div className="text-center pt-16">
                                <div className="h-1px w-20 bg-emerald-500/20 mx-auto mb-8" />
                                <h3 className="text-4xl md:text-6xl font-black text-[#0b1315] uppercase tracking-tighter leading-none">
                                    Curated <br /> Experiences
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {tours.map((tour) => (
                                    <Link key={tour.id} href={`/tours/${tour.id}`} className="group">
                                        <div className="relative h-96 rounded-[3rem] overflow-hidden bg-gray-100 border border-white hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-700">
                                            <Image
                                                src={tour.images[0] || destination.image}
                                                alt={tour.title}
                                                fill
                                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1315]/90 via-[#0b1315]/20 to-transparent" />
                                            
                                            <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-2">
                                                <span className="text-emerald-400 font-black text-sm tracking-tight">${tour.price}</span>
                                            </div>

                                            <div className="absolute bottom-10 left-10 right-10">
                                                <h4 className="text-2xl font-black text-white uppercase tracking-tight leading-none mb-6 group-hover:text-emerald-400 transition-colors">
                                                    {tour.title}
                                                </h4>
                                                <div className="flex items-center gap-6 text-white/60">
                                                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest">
                                                        <Calendar size={14} className="text-emerald-500" />
                                                        {tour.duration}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest">
                                                        <Users size={14} className="text-emerald-500" />
                                                        {tour.max_guests} Guests
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Minimalist Sticky Sidebar */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                        <div className="bg-white border border-gray-100 p-10 md:p-12 rounded-[3.5rem] shadow-2xl shadow-[#0b1315]/5 relative overflow-hidden group">
                           <div className="relative z-10 space-y-10">
                                <div className="w-16 h-16 rounded-[2rem] bg-emerald-50 flex items-center justify-center transition-transform group-hover:rotate-12 duration-500">
                                    <Compass className="w-8 h-8 text-emerald-500" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-black text-[#0b1315] uppercase tracking-tighter leading-none">Tailor Your <br /> Safari Story</h3>
                                    <p className="text-gray-400 font-medium leading-[1.6] text-sm md:text-base">
                                        Looking for a specialized wildlife sequence? Our experts curate itineraries specifically for {destination.title}.
                                    </p>
                                </div>
                                <div className="space-y-4 pt-6 text-[10px] font-black text-[#0b1315]/40 uppercase tracking-[0.2em]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                                            <PhoneCall size={14} />
                                        </div>
                                        Personal Counselor
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                                            <Globe size={14} />
                                        </div>
                                        100% Eco-Certified
                                    </div>
                                </div>
                                <Link 
                                    href="/contact" 
                                    className="flex items-center justify-between w-full p-6 bg-emerald-500 text-white rounded-[2rem] font-black uppercase text-[10px] tracking-[0.2em] transition-all hover:bg-[#0b1315] shadow-xl shadow-emerald-500/20 group/btn"
                                >
                                    Start Planning
                                    <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                                </Link>
                                <p className="text-center text-[9px] font-black text-[#0b1315]/20 uppercase tracking-[0.1em]">
                                    Response time: &lt; 2 hours
                                </p>
                           </div>
                           
                           {/* Decorative Elements */}
                           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-100 transition-colors" />
                        </div>

                        {/* Sub-card: Logistics */}
                        <div className="mt-8 bg-emerald-50/50 rounded-[2.5rem] p-10 border border-emerald-100/30">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0b1315] mb-6">Expert Note</h5>
                            <p className="text-xs font-medium text-emerald-800/60 leading-relaxed">
                                &ldquo;Recommended for photographers during the late dry season (July-Sept) for unrivaled leopard sightings near the drying villus.&rdquo;
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
