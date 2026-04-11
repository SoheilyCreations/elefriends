'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Destination, Tour } from '@/types';
import { destinationService } from '@/lib/services/destinationService';
import { tourService } from '@/lib/services/tourService';
import { Loader2, ArrowLeft, MapPin, Calendar, Users, ArrowRight, Sun, Wind, Mountain, PawPrint, Sparkles, PhoneCall, Compass, Camera, Globe, Clock, Thermometer, Binoculars, Ticket } from 'lucide-react';
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
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const galleryImages = [
        ...(destination?.image ? [destination.image] : []),
        ...(destination?.images || []),
        ...tours.flatMap(t => t.images || [])
    ].filter((img, i, self) => !!img && self.indexOf(img) === i).slice(0, 10);

    useEffect(() => {
        if (galleryImages.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [galleryImages.length]);

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

    return (
        <div className="min-h-screen bg-[#fcfcfc] pb-32 font-sans selection:bg-emerald-500 selection:text-white">
            
            {/* Cinematic Gallery Hero */}
            <div className="relative h-[90vh] w-full overflow-hidden bg-[#0b1315]">
                {/* Auto-playing Gallery */}
                <div className="absolute inset-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={galleryImages[currentImageIndex]}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={galleryImages[currentImageIndex]}
                                alt={destination.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Refined Cinematic Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0b1315]/70 via-[#0b1315]/20 to-[#fcfcfc]" />
                <div className="absolute inset-0 bg-black/10" />

                {/* Minimalist Header Overlay */}
                <div className="absolute top-0 left-0 w-full p-8 md:p-12 z-20">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <Link href="/destinations" className="flex items-center gap-3 text-white/60 hover:text-emerald-400 transition-all group font-black uppercase text-[10px] tracking-[0.3em]">
                            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
                            Explore All
                        </Link>
                    </div>
                </div>

                {/* Hero Content */}
                <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10 pt-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6 max-w-6xl"
                    >
                        <div className="flex items-center justify-center gap-4">
                            <div className="h-[1px] w-8 md:w-12 bg-emerald-500/50" />
                            <span className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.6em]">Premium Sanctuary</span>
                            <div className="h-[1px] w-8 md:w-12 bg-emerald-500/50" />
                        </div>
                        
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] font-black text-white uppercase tracking-[-0.04em] leading-[0.85] drop-shadow-2xl px-4 break-words">
                            {destination.title.trim()}
                        </h1>

                        <div className="flex flex-col items-center gap-6 pt-8">
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Architecture */}
            <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    
                    {/* Main Narrative Column */}
                    <div className="lg:col-span-8 space-y-20">
                        
                        {/* Editorial Narratives - Moved to Top */}
                        <div className="relative -mt-16 bg-white rounded-[3rem] p-10 md:p-16 shadow-xl shadow-emerald-900/5 border border-emerald-50">
                            <div className="flex flex-col gap-10">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-[1px] bg-emerald-500" />
                                        <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.4em]">The Heritage Folio</span>
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-black text-[#0b1315] uppercase tracking-[-0.04em] leading-none">
                                        Discover <br /> <span className="text-emerald-500">{destination.title}</span>
                                    </h2>
                                </div>
                                <div className="relative">
                                    <p className="text-gray-500 text-lg md:text-xl leading-[1.8] font-medium tracking-tight max-w-4xl">
                                        {destination.description || `Experience the breathtaking beauty and rich biodiversity of ${destination.title}. A destination where nature and civilization maintain a delicate, ancient balance.`}
                                    </p>

                                </div>
                            </div>
                        </div>

                        {/* Essential Insights - Style matched with Rhythm Cards */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-[1px] bg-emerald-500" />
                                <span className="text-emerald-500 font-black text-[9px] uppercase tracking-[0.4em]">Essential Insights</span>
                            </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { 
                                            icon: Sun, 
                                            label: 'Optimal Window', 
                                            value: destination.insight_window_value || 'Feb — Oct', 
                                            desc: destination.insight_window_desc || 'The dry season offers peak wildlife congregation near water sources.' 
                                        },
                                        { 
                                            icon: Thermometer, 
                                            label: 'Climate Profile', 
                                            value: destination.insight_climate_value || '29°C Average', 
                                            desc: destination.insight_climate_desc || 'Tropical warmth with refreshing mist during the dawn hours.' 
                                        },
                                        { 
                                            icon: Clock, 
                                            label: 'Logistics/Time', 
                                            value: destination.insight_logistics_value || '4.5H Drive', 
                                            desc: destination.insight_logistics_desc || 'A scenic journey from Colombo through the heart of the dry zone.' 
                                        },
                                        { 
                                            icon: MapPin, 
                                            label: 'Geography', 
                                            value: destination.insight_geography_value || 'Northern Plains', 
                                            desc: destination.insight_geography_desc || destination.subtitle || 'A unique biosphere of dry-evergreen forests and sprawling villus.' 
                                        }
                                    ].map((pill, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group relative flex items-start gap-5 p-6 rounded-[2rem] bg-white border border-transparent hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-500"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shrink-0">
                                            <pill.icon className="w-5 h-5" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h4 className="text-sm font-black text-[#0b1315] uppercase tracking-tight">{pill.label}</h4>
                                                <span className="text-[8px] font-bold text-emerald-500/40 uppercase tracking-widest">{pill.value}</span>
                                            </div>
                                            <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                                                {pill.desc}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Refined Gallery Section - Masonry Hybrid */}
                        <div className="space-y-12">
                            <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                    <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.4em]">Visual Archive</span>
                                    <h3 className="text-4xl font-black text-[#0b1315] uppercase tracking-tighter leading-none">Frozen <br /> Moments</h3>
                                </div>
                                <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 px-8 py-4 rounded-full hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                                    <Camera size={16} /> View All Artifacts
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {galleryImages.map((img, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className={`relative overflow-hidden rounded-[2.5rem] bg-gray-100 group cursor-zoom-in ${
                                            i === 0 ? 'col-span-2 row-span-2 h-[500px]' : 
                                            i === 1 ? 'col-span-2 h-[240px]' :
                                            'h-[240px]'
                                        }`}
                                    >
                                        <Image 
                                            src={img} 
                                            alt={`Gallery ${i}`} 
                                            fill 
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                                            sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                                        />
                                        <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                            <Sparkles className="text-white w-8 h-8 scale-0 group-hover:scale-100 transition-transform duration-500 delay-100" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Curated Excursions - Premium Cards */}
                        <div id="tours-section" className="space-y-12 pt-12">
                            <div className="flex flex-col items-center text-center space-y-6">
                                <div className="w-20 h-[1.5px] bg-emerald-500 rounded-full" />
                                <h3 className="text-6xl md:text-8xl font-black text-[#0b1315] uppercase tracking-[-0.05em] leading-[0.85]">
                                    Curated <br /> <span className="text-transparent inline-block" style={{ WebkitTextStroke: '2px #0b1315' }}>Experiences</span>
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {tours.length > 0 ? tours.map((tour) => (
                                    <Link key={tour.id} href={`/tours/${tour.id}`} className="group relative">
                                        <div className="absolute -inset-2 bg-emerald-500/5 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                        <div className="relative h-[28rem] rounded-[3.5rem] overflow-hidden bg-white border border-white hover:border-emerald-100 transition-all duration-700">
                                            <Image
                                                src={tour.images?.[0] || destination.image}
                                                alt={tour.title}
                                                fill
                                                className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1315] via-[#0b1315]/50 to-transparent" />
                                            
                                            <div className="absolute top-10 right-10 flex flex-col items-end gap-2 text-right">
                                                <div className="bg-[#0b1315]/60 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3">
                                                    <span className="text-emerald-400 font-extrabold text-xl tracking-tight">${tour.price}</span>
                                                </div>
                                                <span className="text-[9px] font-black text-white/70 uppercase tracking-[0.2em]">Starting Per Adult</span>
                                            </div>

                                            <div className="absolute bottom-12 left-12 right-12 space-y-6">
                                                <div className="space-y-2">
                                                    <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.4em] drop-shadow-sm">Signature Safari</span>
                                                    <h4 className="text-2xl font-black text-white uppercase tracking-tight leading-none group-hover:text-emerald-400 transition-colors">
                                                        {tour.title}
                                                    </h4>
                                                </div>
                                                <div className="flex items-center gap-6 text-white/60">
                                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/15 backdrop-blur-md rounded-full px-5 py-2.5 border border-white/10">
                                                        <Calendar size={14} className="text-emerald-500" />
                                                        {tour.duration}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/15 backdrop-blur-md rounded-full px-5 py-2.5 border border-white/10">
                                                        <Users size={14} className="text-emerald-500" />
                                                        {tour.max_guests} Guests
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )) : (
                                    <div className="col-span-full py-20 text-center space-y-4 bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-200">
                                        <Sparkles className="w-8 h-8 text-emerald-300 mx-auto" />
                                        <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">More curated experiences coming soon.</p>
                                    </div>
                                )}
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
                                </div>
                                
                                <div className="space-y-4">
                                        <div className="flex items-start gap-4 p-5 rounded-3xl bg-emerald-50 border border-emerald-100/50 group/item hover:bg-emerald-100 transition-colors duration-500">
                                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-emerald-500 shadow-sm group-hover/item:scale-110 transition-transform">
                                                <Ticket size={22} className="group-hover/item:rotate-12 transition-transform" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-[#0b1315] font-extrabold text-[13px] uppercase tracking-tight leading-none mb-1">Limited Daily Entries</p>
                                                <p className="text-emerald-600 font-bold text-[11px] leading-tight opacity-80">Secure your safari spot now.</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 p-5 rounded-3xl bg-emerald-50 border border-emerald-100/50 group/item hover:bg-emerald-100 transition-colors duration-500">
                                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-emerald-500 shadow-sm group-hover/item:scale-110 transition-transform">
                                                <Binoculars size={22} className="group-hover/item:-rotate-12 transition-transform" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <p className="text-[#0b1315] font-extrabold text-[13px] uppercase tracking-tight leading-none">98% Success Rate</p>
                                                    <Sparkles size={12} className="text-emerald-500 animate-pulse" />
                                                </div>
                                                <p className="text-emerald-600 font-bold text-[11px] leading-tight opacity-80">For Elephant sightings.</p>
                                            </div>
                                        </div>
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
