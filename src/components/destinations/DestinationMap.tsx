'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Compass, Sparkles, Calendar, Map, Info, Camera, Zap, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface TourOverview {
    id: string;
    title: string;
    duration: string;
    price: string;
    slug: string;
}

interface MapDestination {
    id: string;
    title: string;
    slug: string;
    x: number; // percentage from left
    y: number; // percentage from top
    image: string;
    description: string;
    highlights: string[];
    bestTime: string;
    area: string;
    activities: string[];
    wildlifeChance: string;
    tours: TourOverview[];
}

const mapDestinations: MapDestination[] = [
    {
        id: 'wilpattu',
        title: 'Wilpattu NP',
        slug: 'wilpattu-national-park',
        x: 25,
        y: 40,
        image: '/img/img1.jpg',
        description: 'Dry zone forest and legendary leopard sightings among the "villus". Sri Lanka\'s largest and oldest national park, offering a truly wild and untamed safari experience away from the crowds.',
        highlights: ['Leopards', 'Sloth Bears', 'Villus'],
        bestTime: 'Feb - Oct',
        area: '1,317 km²',
        activities: ['Full-day Jeep Safari', 'Photography', 'Camping'],
        wildlifeChance: 'High (Leopards)',
        tours: [
            { id: 't1', title: 'Morning Leopard Track', duration: '4 Hours', price: '45', slug: 'wilpattu-morning-safari' },
            { id: 't2', title: 'Full-Day Deep Jungle Safari', duration: '8 Hours', price: '85', slug: 'wilpattu-full-day' }
        ]
    },
    {
        id: 'wasgamuwa',
        title: 'Wasgamuwa NP',
        slug: 'wasgamuwa-national-park',
        x: 62,
        y: 45,
        image: '/img/img2.jpg',
        description: 'Spectacular wilderness in the heart of the central plains. Known for its large herds of elephants and diverse birdlife in a remote, less-visited setting.',
        highlights: ['Elephants', 'Bears', 'Birds'],
        bestTime: 'May - Sep',
        area: '393 km²',
        activities: ['Jeep Safari', 'Bird Watching'],
        wildlifeChance: 'Very High (Elephants)',
        tours: [
            { id: 't3', title: 'Elephant Gathering Safari', duration: '3.5 Hours', price: '40', slug: 'wasgamuwa-elephant-safari' }
        ]
    },
    {
        id: 'minneriya',
        title: 'Minneriya NP',
        slug: 'minneriya-national-park',
        x: 52,
        y: 35,
        image: '/img/img3.jpg',
        description: 'The epicenter of the world-famous Great Gathering. Hundreds of elephants congregate around the ancient Minneriya tank during the dry season, creating a spectacular wildlife phenomenon.',
        highlights: ['The Gathering', 'Elephants', 'Macaques'],
        bestTime: 'Jul - Oct',
        area: '88.9 km²',
        activities: ['Evening Safari', 'Nature Photography'],
        wildlifeChance: 'Guaranteed (Elephants)',
        tours: [
            { id: 't4', title: 'The Great Gathering Safari', duration: '4 Hours', price: '50', slug: 'minneriya-great-gathering' },
            { id: 't5', title: 'Morning Wildlife Safari', duration: '5 Hours', price: '65', slug: 'minneriya-morning-safari' }
        ]
    },
    {
        id: 'yala',
        title: 'Yala NP',
        slug: 'yala-national-park',
        x: 66,
        y: 69,
        image: '/img/img4.jpg',
        description: 'Sri Lanka’s most famous park, home to the elusive Ceylon Leopard. Features a diverse landscape of dry woodland, scrub, and stunning coastlines with a high density of apex predators.',
        highlights: ['Leopards', 'Elephants', 'Crocodiles'],
        bestTime: 'Feb - Jul',
        area: '979 km²',
        activities: ['Morning Safari', 'Birding', 'Beach Walks'],
        wildlifeChance: 'High (Big 3)',
        tours: [
            { id: 't6', title: 'Premium Leopard Safari', duration: '4 Hours', price: '55', slug: 'yala-premium-safari' },
            { id: 't7', title: 'Exclusive Full-Day Tour', duration: '10 Hours', price: '120', slug: 'yala-full-day' }
        ]
    },
    {
        id: 'horton',
        title: 'Horton Plains',
        slug: 'horton-plains-national-park',
        x: 55,
        y: 72,
        image: '/img/img5.jpg',
        description: 'Mist-shrouded grasslands and the breathtaking World’s End drop. A unique highland plateau featuring endemic flora and fauna, perfect for scenic hikes and spotting Sambar deer.',
        highlights: ['World\'s End', 'Sambar Deer', 'Baker\'s Falls'],
        bestTime: 'Jan - Mar',
        area: '31.6 km²',
        activities: ['Trekking', 'Nature Trails', 'Photography'],
        wildlifeChance: 'Medium (Endemics)',
        tours: [
            { id: 't8', title: 'Worlds End Sunrise Trek', duration: '5 Hours', price: '35', slug: 'horton-worlds-end-trek' }
        ]
    },
    {
        id: 'kumana',
        title: 'Kumana NP',
        slug: 'kumana-national-park',
        x: 76,
        y: 64,
        image: '/img/img6.jpg',
        description: 'Prime wetlands and a premier bird sanctuary in the East. A paradise for ornithologists, hosting thousands of migratory birds and offering quiet, scenic landscapes.',
        highlights: ['Migratory Birds', 'Wetlands', 'Leopards'],
        bestTime: 'Apr - Jul',
        area: '356.6 km²',
        activities: ['Bird Safari', 'Camping', 'Photography'],
        wildlifeChance: 'High (Avian Life)',
        tours: [
            { id: 't9', title: 'Avian Paradise Wetland Safari', duration: '4.5 Hours', price: '45', slug: 'kumana-wetland-safari' },
            { id: 't10', title: 'Wilderness Camping', duration: '2 Days / 1 Night', price: '180', slug: 'kumana-camping' }
        ]
    },
    {
        id: 'sinharaja',
        title: 'Sinharaja Forest',
        slug: 'sinharaja-forest-reserve',
        x: 35,
        y: 76,
        image: '/img/img7.jpg',
        description: 'Rare Wet Zone Rainforest, a UNESCO World Heritage site. A biodiversity hotspot with a staggering concentration of endemic trees, insects, amphibians, and birds.',
        highlights: ['Endemic Birds', 'Rainforest', 'Amphibians'],
        bestTime: 'Dec - Apr',
        area: '88.6 km²',
        activities: ['Guided Trekking', 'Bird Watching'],
        wildlifeChance: 'High (Endemic Birds)',
        tours: [
            { id: 't11', title: 'Deep Rainforest Trek', duration: '6 Hours', price: '40', slug: 'sinharaja-discovery-trek' }
        ]
    }
];

export default function DestinationMap() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <section className="py-24 relative bg-white overflow-hidden">
            {/* Artistic background blur */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* Left Side: Map Container */}
                    <div className="relative aspect-[3/5] w-full max-w-[500px] mx-auto group lg:col-span-7">
                        {/* Premium Ecosystem Map Image */}
                        <div className="absolute inset-0 bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-2xl">
                            <Image 
                                src="/map3.png" 
                                alt="Sri Lanka Ecosystem Map" 
                                fill 
                                className="object-cover opacity-90 transition-transform duration-700"
                            />
                            {/* Subtle dark overlay for better pin visibility if needed */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10" />
                        </div>

                        {/* Interactive Pins */}
                        {mapDestinations.map((dest) => (
                            <div
                                key={dest.id}
                                className="absolute transition-all duration-300 z-20"
                                style={{ left: `${dest.x}%`, top: `${dest.y}%` }}
                                onMouseEnter={() => setHoveredId(dest.id)}
                            >
                                <motion.div
                                    animate={{ 
                                        scale: hoveredId === dest.id ? 1.4 : 1,
                                        y: hoveredId === dest.id ? -10 : 0
                                    }}
                                    className={`relative cursor-pointer flex items-center justify-center ${hoveredId === dest.id ? 'z-50' : 'z-20'}`}
                                >
                                    {/* Pulse Effect */}
                                    {hoveredId === dest.id && (
                                        <motion.div 
                                            initial={{ scale: 0.8, opacity: 0.5 }}
                                            animate={{ scale: 2, opacity: 0 }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                            className="absolute w-8 h-8 bg-emerald-500 rounded-full"
                                        />
                                    )}
                                    <div className={`p-2 rounded-full shadow-lg border transition-all ${hoveredId === dest.id ? 'bg-emerald-500 border-white text-white rotate-[360deg]' : 'bg-white border-gray-100 text-emerald-500'}`}>
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    
                                    {/* Small Label Always Visible on desktop */}
                                    <div className={`hidden md:block absolute top-10 whitespace-nowrap px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-[#0b1315] text-[10px] font-black uppercase tracking-widest shadow-md border border-emerald-200 transition-all ${hoveredId === dest.id ? 'opacity-100 scale-110' : 'opacity-90'}`}>
                                        {dest.title.split(' ')[0]}
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    {/* Right Side: Detail Panel */}
                    <div className="flex flex-col h-full lg:col-span-5 h-[650px]">
                        {/* Dynamic Preview Card */}
                        <div className="relative w-full bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] h-full flex flex-col">
                            <AnimatePresence mode="wait">
                                {hoveredId ? (
                                    mapDestinations.filter(d => d.id === hoveredId).map((dest) => (
                                        <motion.div
                                            key={dest.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute inset-0 flex flex-col h-full"
                                        >
                                            {/* Image Header */}
                                            <div className="relative h-[240px] w-full shrink-0">
                                                <Image 
                                                    src={dest.image} 
                                                    alt={dest.title} 
                                                    fill 
                                                    className="object-cover" 
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                                <div className="absolute top-6 left-6 bg-emerald-500/90 backdrop-blur-sm text-white text-[10px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full flex items-center gap-2">
                                                    <Sparkles className="w-3 h-3" />
                                                    Featured Region
                                                </div>
                                                <div className="absolute bottom-6 left-6 right-6">
                                                    <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none mb-2">{dest.title}</h3>
                                                </div>
                                            </div>
                                            
                                            {/* Scrollable Details */}
                                            <div className="p-6 flex flex-col flex-1 overflow-y-auto custom-scrollbar">
                                                <p className="text-gray-600 text-sm md:text-sm font-medium leading-relaxed mb-6">{dest.description}</p>
                                                
                                                <div className="grid grid-cols-2 gap-3 mb-6">
                                                    <div className="bg-gray-50/80 rounded-2xl p-3 border border-gray-100 flex flex-col gap-1">
                                                        <span className="flex items-center gap-1.5 text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                                                            <Calendar className="w-3 h-3" /> Best Time
                                                        </span>
                                                        <span className="text-emerald-700 font-black text-xs uppercase">{dest.bestTime}</span>
                                                    </div>
                                                    <div className="bg-gray-50/80 rounded-2xl p-3 border border-gray-100 flex flex-col gap-1">
                                                        <span className="flex items-center gap-1.5 text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                                                            <Map className="w-3 h-3" /> Area size
                                                        </span>
                                                        <span className="text-emerald-700 font-black text-xs uppercase">{dest.area}</span>
                                                    </div>
                                                    
                                                    <div className="bg-gray-50/80 rounded-2xl p-3 border border-gray-100 flex flex-col gap-1 col-span-2">
                                                        <span className="flex items-center gap-1.5 text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                                                            <Zap className="w-3 h-3" /> Wildlife Sighting Chance
                                                        </span>
                                                        <span className="text-emerald-700 font-black text-xs uppercase">{dest.wildlifeChance}</span>
                                                    </div>

                                                    <div className="bg-gray-50/80 rounded-2xl p-3 border border-gray-100 flex flex-col gap-1 col-span-2">
                                                        <span className="flex items-center gap-1.5 text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                                                            <Sparkles className="w-3 h-3" /> Key Highlights
                                                        </span>
                                                        <div className="flex flex-wrap gap-2 mt-1.5">
                                                            {dest.highlights.map(h => (
                                                                <span key={h} className="bg-white border border-gray-200 text-gray-700 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm">
                                                                    {h}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* NEW: Available Tours Section */}
                                                    <div className="col-span-2 mt-2">
                                                        <h4 className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-3">
                                                            <Compass className="w-3.5 h-3.5 text-emerald-500" /> Available Excursions & Tours
                                                        </h4>
                                                        <div className="flex flex-col gap-2.5">
                                                            {dest.tours.map(tour => (
                                                                <Link 
                                                                    href={`/tours/${tour.slug}`}
                                                                    key={tour.id}
                                                                    className="group flex flex-row items-center justify-between p-3.5 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg hover:border-emerald-200 transition-all cursor-pointer"
                                                                >
                                                                    <div className="flex flex-col gap-1">
                                                                        <span className="text-[#0b1315] font-black text-xs uppercase tracking-tight group-hover:text-emerald-600 transition-colors">
                                                                            {tour.title}
                                                                        </span>
                                                                        <span className="text-gray-400 font-bold text-[9px] uppercase tracking-widest">
                                                                            {tour.duration}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-4">
                                                                        <div className="flex flex-col items-end">
                                                                            <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">From</span>
                                                                            <span className="text-emerald-600 font-black text-sm leading-none">${tour.price}</span>
                                                                        </div>
                                                                        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                                                                            <ArrowRight className="w-3.5 h-3.5 text-emerald-500 group-hover:text-white" />
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-gradient-to-b from-gray-50 to-white"
                                    >
                                        <div className="w-32 h-32 relative mb-8">
                                            <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-20" />
                                            <div className="absolute inset-0 bg-emerald-50 rounded-full flex items-center justify-center">
                                                <Compass className="w-12 h-12 text-emerald-300" />
                                            </div>
                                        </div>
                                        <h4 className="text-2xl font-black text-[#0b1315] uppercase tracking-tight mb-4">Interactive Map</h4>
                                        <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-sm mx-auto mb-8">
                                            Hover over the markers on the map to explore destination details, wildlife highlights, available tours, and best times to visit.
                                        </p>
                                        
                                        <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest border border-gray-100 px-6 py-3 rounded-full bg-white shadow-sm">
                                            <Info className="w-4 h-4" />
                                            Select a point to begin
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
