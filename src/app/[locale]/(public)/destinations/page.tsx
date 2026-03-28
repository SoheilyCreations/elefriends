'use client';

import { useEffect, useState } from 'react';
import { Destination, Tour } from '@/types';
import { destinationService } from '@/lib/services/destinationService';
import { tourService } from '@/lib/services/tourService';
import DestinationMap from '@/components/destinations/DestinationMap';
import { Loader2, Calendar, Users, ArrowRight, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

export default function DestinationsPage() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
    const [tours, setTours] = useState<Tour[]>([]);
    const [loadingTours, setLoadingTours] = useState(false);
    const [activeDestination, setActiveDestination] = useState<Destination | null>(null);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const data = await destinationService.getAllDestinations();
                const sorted = data.sort((a, b) => (a.display_order ?? 999) - (b.display_order ?? 999));
                setDestinations(sorted);
            } catch (error) {
                console.error('Failed to fetch destinations:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDestinations();
    }, []);

    useEffect(() => {
        if (!selectedSlug || destinations.length === 0) {
            setTours([]);
            setActiveDestination(null);
            return;
        }

        const destination = destinations.find((d) => d.slug === selectedSlug);
        if (!destination) {
            setTours([]);
            setActiveDestination(null);
            return;
        }

        setActiveDestination(destination);

        const fetchTours = async () => {
            setLoadingTours(true);
            try {
                const data = await tourService.getToursByDestination(destination.id);
                // Only show top 4
                setTours(data.slice(0, 4));
            } catch (error) {
                console.error('Failed to fetch tours:', error);
                setTours([]);
            } finally {
                setLoadingTours(false);
            }
        };
        fetchTours();
    }, [selectedSlug, destinations]);

    return (
        <div className="min-h-screen bg-[#f0f2f5] pt-32 pb-24 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="text-center mb-16 px-4">
                    <h2 className="text-emerald-500 font-bold tracking-[0.2em] uppercase text-xs mb-3">Explore Sri Lanka</h2>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#0b1315] uppercase tracking-tight mb-8">
                        The North <br />
                        <span className="text-emerald-500 italic lowercase tracking-tight">central network</span>
                    </h1>
                </div>

                {/* Interactive Map Visualization */}
                <div className="mb-24">
                    <DestinationMap onHoverChange={setSelectedSlug} />
                </div>

                {/* Dynamic Tours Section */}
                <div className="mb-12 flex flex-col items-center">
                    <div className="h-20 w-[1.5px] bg-emerald-500/20 mb-8" />
                    <h2 className="text-emerald-500 font-black tracking-[0.4em] uppercase text-xs text-center transition-all">
                        {selectedSlug && activeDestination 
                            ? `Experiences in ${activeDestination.title}` 
                            : 'Select a location on the map'}
                    </h2>
                </div>

                {/* Tours Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                    </div>
                ) : !selectedSlug ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <MapPin className="w-12 h-12 text-gray-300 mb-4" />
                        <p className="text-gray-400 font-medium max-w-sm">
                            Hover over a destination on the interactive map above to uncover our curated tours and safaris available there.
                        </p>
                    </div>
                ) : loadingTours ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                    </div>
                ) : tours.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {tours.map((tour) => (
                            <Link key={tour.id} href={`/tours/${tour.id}`} className="group h-full">
                                <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-emerald-500/30 hover:shadow-[0_20px_50px_-12px_rgba(16,185,129,0.15)] transition-all duration-500 flex flex-col h-full">
                                    <div className="relative h-48 overflow-hidden shrink-0">
                                        <Image
                                            src={tour.images[0] || activeDestination?.image || '/placeholder.jpg'}
                                            alt={tour.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-full shadow-lg">
                                            <span className="text-emerald-400 font-black text-xs">${tour.price}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6 flex flex-col flex-1">
                                        <h4 className="text-sm font-black text-[#0b1315] uppercase tracking-tight line-clamp-2 mb-4 group-hover:text-emerald-600 transition-colors">
                                            {tour.title}
                                        </h4>
                                        <div className="flex items-center gap-4 text-gray-500 mb-6 mt-auto">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={14} className="text-emerald-500" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">{tour.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Users size={14} className="text-emerald-500" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">{tour.max_guests} Guests</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 group/btn">
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-600 transition-colors">
                                                Discover
                                            </span>
                                            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center group-hover/btn:bg-emerald-500 transition-colors">
                                                <ArrowRight size={14} className="text-emerald-500 group-hover/btn:text-white transform group-hover/btn:translate-x-0.5 transition-all" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <MapPin className="w-6 h-6 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight mb-2">No active tours</h3>
                        <p className="text-gray-500 font-medium text-sm">
                            We are currently designing exclusive experiences for this location.
                        </p>
                    </div>
                )}
                
                {tours.length >= 4 && selectedSlug && (
                    <div className="mt-12 text-center">
                        <Link href={`/destinations/${selectedSlug}`} className="inline-flex items-center gap-3 bg-white border border-gray-200 text-[#0b1315] font-black uppercase tracking-[0.15em] text-[10px] px-8 py-3.5 rounded-full hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm hover:shadow-md">
                            View All For {activeDestination?.title}
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
}
