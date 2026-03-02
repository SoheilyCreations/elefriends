'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Destination, Tour } from '@/types';
import { destinationService } from '@/lib/services/destinationService';
import { tourService } from '@/lib/services/tourService';
import { Loader2, MapPin, Calendar, Users, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DestinationDetail() {
    const params = useParams();
    const slug = params.slug as string;

    const [destination, setDestination] = useState<Destination | null>(null);
    const [tours, setTours] = useState<Tour[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const destData = await destinationService.getDestinationBySlug(slug);
                setDestination(destData);

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
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
            </div>
        );
    }

    if (!destination) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Destination Not Found</h1>
                    <Link href="/destinations" className="text-emerald-600 font-semibold hover:underline">
                        Back to all destinations
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
                <Image
                    src={destination.image}
                    alt={destination.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h4 className="text-emerald-400 font-black uppercase text-xs tracking-[0.4em] mb-4">Exploring Sri Lanka</h4>
                            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
                                {destination.title}
                            </h1>
                            <p className="text-xl text-gray-200 font-medium max-w-2xl">
                                {destination.subtitle}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-8 space-y-12">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-black text-[#0b1315] uppercase tracking-tight">About this destination</h2>
                        <div className="h-1.5 w-20 bg-emerald-500 rounded-full" />
                        <p className="text-gray-600 text-lg leading-relaxed font-medium">
                            {destination.description}
                        </p>
                    </div>

                    {/* Tours list */}
                    <div className="space-y-10">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                            <h3 className="text-2xl font-black text-[#0b1315] uppercase tracking-tight">Available Experiences</h3>
                            <span className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest leading-none">
                                {tours.length} Tours Found
                            </span>
                        </div>

                        {tours.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-8 gap-6">
                                {tours.map((tour) => (
                                    <Link key={tour.id} href={`/tours/${tour.id}`}>
                                        <div className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:border-emerald-500/20 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
                                            <div className="relative h-64 overflow-hidden">
                                                <Image
                                                    src={tour.images[0] || destination.image}
                                                    alt={tour.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute top-6 right-6 px-4 py-2 bg-black/80 backdrop-blur-md rounded-full">
                                                    <span className="text-white font-black text-sm">${tour.price}</span>
                                                </div>
                                            </div>
                                            <div className="p-8 space-y-4">
                                                <h4 className="text-lg font-black text-[#0b1315] uppercase tracking-tight line-clamp-2 min-h-[3.5rem] group-hover:text-emerald-600 transition-colors">
                                                    {tour.title}
                                                </h4>
                                                <div className="flex items-center gap-6 text-gray-400">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar size={14} className="text-emerald-500" />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest">{tour.duration}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Users size={14} className="text-emerald-500" />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest">{tour.max_guests} Guests</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between pt-4 border-t border-gray-50 group/btn">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">View Experience</span>
                                                    <ArrowRight size={16} className="text-emerald-600 transform group-hover/btn:translate-x-2 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="p-12 bg-gray-50 rounded-[3rem] text-center">
                                <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">No tours available for this destination yet.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-[#0b1315] p-10 rounded-[3rem] text-white space-y-6">
                        <h3 className="text-2xl font-black uppercase tracking-tight">Need a custom plan?</h3>
                        <p className="text-gray-400 font-medium">
                            If you have specific requirements or want to combine multiple destinations, our team can help you design the perfect safari.
                        </p>
                        <Link href="/contact" className="block w-full py-5 bg-emerald-500 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] text-center hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20">
                            Contact Specialist
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
