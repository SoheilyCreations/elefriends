'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft, Save, Plus, Trash2, Image as ImageIcon,
    MapPin, Clock, DollarSign, Users, Info, ListChecks,
    Calendar, CheckCircle2, Loader2, AlertCircle, Compass, Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { tourService } from '@/lib/services/tourService';
import { destinationService } from '@/lib/services/destinationService';
import Link from 'next/link';
import { Destination } from '@/types';
import { useEffect } from 'react';

export default function NewTourPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [destinations, setDestinations] = useState<Destination[]>([]);

    // Form State
    const [formData, setFormData] = useState({
        destination_id: '',
        title: '',
        description: '',
        price: '',
        duration: '',
        max_guests: '',
        location: '',
        is_active: true,
        images: [''], // Array of image URLs
        highlights: [''], // Array of strings
        itinerary: [{ day: 1, title: '', activities: [''] }]
    });

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const data = await destinationService.getAllDestinations();
                setDestinations(data);
            } catch (err) {
                console.error('Error fetching destinations:', err);
            }
        };
        fetchDestinations();
    }, []);

    // Handlers for simple fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as any;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as any).checked : value
        }));
    };

    // Handlers for Dynamic Lists (Images, Highlights)
    const handleListItemChange = (listName: 'images' | 'highlights', index: number, value: string) => {
        const newList = [...formData[listName]];
        newList[index] = value;
        setFormData(prev => ({ ...prev, [listName]: newList }));
    };

    const addListItem = (listName: 'images' | 'highlights') => {
        setFormData(prev => ({ ...prev, [listName]: [...formData[listName], ''] }));
    };

    const removeListItem = (listName: 'images' | 'highlights', index: number) => {
        if (formData[listName].length <= 1 && listName === 'highlights') return;
        // In case of images, if zero left, we just have an empty array but for UI we might want to keep at least one field
        // but since we're moving to direct uploads, maybe we can have an empty list
        setFormData(prev => ({
            ...prev,
            [listName]: formData[listName].filter((_, i) => i !== index)
        }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setLoading(true); // Global loading or specific?
            const url = await tourService.uploadImage(file);
            setFormData(prev => ({
                ...prev,
                images: [...prev.images.filter(img => img !== ''), url]
            }));
        } catch (err) {
            console.error('Upload failed:', err);
            setError('Image upload failed. The jungle is too thick.');
        } finally {
            setLoading(false);
        }
    };

    // Handlers for Itinerary
    const addItineraryDay = () => {
        setFormData(prev => ({
            ...prev,
            itinerary: [
                ...prev.itinerary,
                { day: prev.itinerary.length + 1, title: '', activities: [''] }
            ]
        }));
    };

    const handleItineraryChange = (index: number, field: string, value: any) => {
        const newItinerary = [...formData.itinerary];
        (newItinerary[index] as any)[field] = value;
        setFormData(prev => ({ ...prev, itinerary: newItinerary }));
    };

    const handleActivityChange = (dayIndex: number, activityIndex: number, value: string) => {
        const newItinerary = [...formData.itinerary];
        newItinerary[dayIndex].activities[activityIndex] = value;
        setFormData(prev => ({ ...prev, itinerary: newItinerary }));
    };

    const addActivity = (dayIndex: number) => {
        const newItinerary = [...formData.itinerary];
        newItinerary[dayIndex].activities.push('');
        setFormData(prev => ({ ...prev, itinerary: newItinerary }));
    };

    const removeItineraryDay = (index: number) => {
        if (formData.itinerary.length <= 1) return;
        const newItinerary = formData.itinerary
            .filter((_, i) => i !== index)
            .map((day, i) => ({ ...day, day: i + 1 }));
        setFormData(prev => ({ ...prev, itinerary: newItinerary }));
    };

    const removeActivity = (dayIndex: number, activityIndex: number) => {
        if (formData.itinerary[dayIndex].activities.length <= 1) return;
        const newItinerary = [...formData.itinerary];
        newItinerary[dayIndex].activities = newItinerary[dayIndex].activities.filter((_, i) => i !== activityIndex);
        setFormData(prev => ({ ...prev, itinerary: newItinerary }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);

            // Basic validation
            if (!formData.title || !formData.price || !formData.location) {
                throw new Error('Please fill in the core safari details (Title, Price, Location).');
            }

            // Prepare data for Supabase
            const tourData = {
                ...formData,
                price: Number(formData.price),
                max_guests: Number(formData.max_guests),
                // Filter out empty items
                images: formData.images.filter(img => img.trim() !== ''),
                highlights: formData.highlights.filter(h => h.trim() !== ''),
                itinerary: formData.itinerary.map(day => ({
                    ...day,
                    activities: day.activities.filter(a => a.trim() !== '')
                }))
            };

            await tourService.createTour(tourData as any);
            setSuccess(true);
            setTimeout(() => router.push('/admin/tours'), 2000);
        } catch (err: any) {
            console.error('Error creating tour:', err);
            setError(err.message || 'The jungle winds are blocked. Failed to create tour.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 animate-bounce">
                    <CheckCircle2 size={40} />
                </div>
                <h1 className="text-4xl font-black text-[#0b1315] uppercase tracking-tighter">New Safari <br /><span className="text-emerald-500 italic lowercase tracking-tight">is live!</span></h1>
                <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest leading-none">Redirecting to management center...</p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-100">
                <div className="space-y-4">
                    <Link href="/admin/tours" className="flex items-center gap-2 text-gray-400 hover:text-emerald-500 transition-colors group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-widest leading-none">Back to Packages</span>
                    </Link>
                    <div>
                        <h4 className="text-emerald-500 font-black uppercase text-[10px] tracking-[0.4em] mb-4">Drafting Journey</h4>
                        <h1 className="text-[#0b1315] font-black text-4xl md:text-5xl uppercase tracking-tighter leading-none">
                            New Safari <br />
                            <span className="text-emerald-500 italic lowercase tracking-tight">blueprint</span>
                        </h1>
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-[#0b1315] hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-[0.2em] py-5 px-10 rounded-2xl transition-all shadow-xl flex items-center gap-3 self-start md:self-auto group disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Finalize Package
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 p-6 rounded-3xl flex items-center gap-4 text-red-600">
                    <AlertCircle size={24} />
                    <p className="font-bold text-sm uppercase tracking-tight">{error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Form Fields */}
                <div className="lg:col-span-2 space-y-12">

                    {/* Basic Info */}
                    <section className="space-y-8 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                        <h3 className="text-[#0b1315] font-black uppercase text-xl tracking-tighter flex items-center gap-3">
                            <Info size={20} className="text-emerald-500" /> Core Details
                        </h3>
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] block ml-2">Package Title</label>
                                <input
                                    name="title" value={formData.title} onChange={handleChange}
                                    placeholder="e.g., The Majestic Gathering"
                                    className="w-full bg-[#f8f9fa] border border-transparent rounded-2xl py-5 px-8 text-[#0b1315] font-black uppercase text-sm tracking-tight focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all shadow-inner"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] block ml-2">Overview Description</label>
                                <textarea
                                    name="description" value={formData.description} onChange={handleChange} rows={4}
                                    placeholder="Describe the cinematic safari experience..."
                                    className="w-full bg-[#f8f9fa] border border-transparent rounded-2xl py-5 px-8 text-gray-600 font-medium text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all shadow-inner resize-none"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Logistics & Pricing */}
                    <section className="space-y-8 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                        <h3 className="text-[#0b1315] font-black uppercase text-xl tracking-tighter flex items-center gap-3">
                            <Compass size={20} className="text-emerald-500" /> Logistics
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] block ml-2">Assigned Destination</label>
                                <div className="relative">
                                    <Compass size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <select
                                        name="destination_id"
                                        value={formData.destination_id}
                                        onChange={handleChange}
                                        className="w-full bg-[#f8f9fa] border border-transparent rounded-2xl py-5 pl-16 pr-8 text-[#0b1315] font-bold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all shadow-inner appearance-none"
                                    >
                                        <option value="">Select Destination</option>
                                        {destinations.map(dest => (
                                            <option key={dest.id} value={dest.id}>{dest.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] block ml-2">Precise Location (City / Park Name)</label>
                                <div className="relative">
                                    <MapPin size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        name="location" value={formData.location} onChange={handleChange}
                                        placeholder="e.g., Minneriya"
                                        className="w-full bg-[#f8f9fa] border border-transparent rounded-2xl py-5 pl-16 pr-8 text-[#0b1315] font-bold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all shadow-inner"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] block ml-2">Duration</label>
                                <div className="relative">
                                    <Clock size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        name="duration" value={formData.duration} onChange={handleChange}
                                        placeholder="e.g., 4 Hours"
                                        className="w-full bg-[#f8f9fa] border border-transparent rounded-2xl py-5 pl-16 pr-8 text-[#0b1315] font-bold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all shadow-inner"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] block ml-2">Base Price (USD)</label>
                                <div className="relative">
                                    <DollarSign size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="number" name="price" value={formData.price} onChange={handleChange}
                                        placeholder="0.00"
                                        className="w-full bg-[#f8f9fa] border border-transparent rounded-2xl py-5 pl-16 pr-8 text-[#0b1315] font-black text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all shadow-inner"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] block ml-2">Max Personnel (Pax)</label>
                                <div className="relative">
                                    <Users size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="number" name="max_guests" value={formData.max_guests} onChange={handleChange}
                                        placeholder="Jeep capacity"
                                        className="w-full bg-[#f8f9fa] border border-transparent rounded-2xl py-5 pl-16 pr-8 text-[#0b1315] font-bold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all shadow-inner"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Itinerary */}
                    <section className="space-y-8 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[#0b1315] font-black uppercase text-xl tracking-tighter flex items-center gap-3">
                                <Calendar size={20} className="text-emerald-500" /> Step-by-Step Experience
                            </h3>
                            <button
                                type="button" onClick={addItineraryDay}
                                className="text-emerald-500 font-black uppercase text-[10px] tracking-widest hover:underline flex items-center gap-2"
                            >
                                <Plus size={14} /> Add Day
                            </button>
                        </div>

                        <div className="space-y-10">
                            {formData.itinerary.map((day, dIdx) => (
                                <div key={dIdx} className="p-8 bg-[#f8f9fa] rounded-[2.5rem] border border-gray-100 space-y-6 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                        <span className="text-8xl font-black text-[#0b1315]">0{day.day}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 relative z-10">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-black text-xs">
                                                {day.day}
                                            </div>
                                            <input
                                                value={day.title}
                                                onChange={(e) => handleItineraryChange(dIdx, 'title', e.target.value)}
                                                placeholder="Day Title (e.g., Arrival & Sunset Drive)"
                                                className="bg-transparent border-none text-[#0b1315] font-black uppercase text-sm tracking-tight focus:ring-0 w-full"
                                            />
                                        </div>
                                        <button
                                            type="button" onClick={() => removeItineraryDay(dIdx)}
                                            className="text-gray-300 hover:text-red-500 transition-colors p-2"
                                            title="Remove Day"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <div className="space-y-4 relative z-10">
                                        {day.activities.map((act, aIdx) => (
                                            <div key={aIdx} className="flex gap-4 items-center">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                                                <input
                                                    value={act}
                                                    onChange={(e) => handleActivityChange(dIdx, aIdx, e.target.value)}
                                                    placeholder="Activity detail..."
                                                    className="w-full bg-white border border-transparent rounded-xl py-3 px-4 text-gray-600 font-medium text-xs focus:ring-1 focus:ring-emerald-500/20 focus:bg-white transition-all shadow-sm"
                                                />
                                                <button
                                                    type="button" onClick={() => removeActivity(dIdx, aIdx)}
                                                    className="text-gray-200 hover:text-red-400 transition-colors"
                                                    title="Remove Activity"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button" onClick={() => addActivity(dIdx)}
                                            className="text-gray-400 font-black uppercase text-[8px] tracking-[0.3em] hover:text-emerald-500 ml-6 flex items-center gap-2"
                                        >
                                            <Plus size={10} /> Add Activity
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar Fields (Images, Highlights, Status) */}
                <div className="space-y-12">

                    {/* Status & Visibility */}
                    <section className="bg-[#0b1315] p-10 rounded-[3rem] text-white space-y-8">
                        <h3 className="text-emerald-500 font-black uppercase text-xs tracking-[0.3em] mb-4">Availability</h3>
                        <div className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-2xl">
                            <div className="flex flex-col gap-1">
                                <span className="font-bold text-xs uppercase tracking-widest leading-none">Market Status</span>
                                <span className="text-emerald-500/60 font-medium text-[10px] tracking-widest uppercase">Visible to guests</span>
                            </div>
                            <button
                                onClick={() => setFormData(p => ({ ...p, is_active: !p.is_active }))}
                                className={`w-14 h-8 rounded-full transition-all relative ${formData.is_active ? 'bg-emerald-500' : 'bg-white/10'}`}
                            >
                                <motion.div
                                    animate={{ x: formData.is_active ? 28 : 4 }}
                                    className="w-6 h-6 bg-white rounded-full absolute top-1 shadow-2xl"
                                />
                            </button>
                        </div>
                    </section>

                    {/* Image Collection */}
                    <section className="space-y-8 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[#0b1315] font-black uppercase text-lg tracking-tighter flex items-center gap-3">
                                <ImageIcon size={20} className="text-emerald-500" /> Gallery (Photos)
                            </h3>
                            <div className="relative">
                                <input
                                    type="file"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="image-upload"
                                    accept="image/*"
                                    disabled={loading}
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="cursor-pointer text-emerald-500 p-2 hover:bg-emerald-50 rounded-xl transition-colors flex items-center gap-2"
                                >
                                    <Plus size={18} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Upload</span>
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {formData.images.filter(img => img !== '').map((img, idx) => (
                                <div key={idx} className="relative group aspect-square rounded-2xl overflow-hidden border border-gray-100 bg-[#f8f9fa]">
                                    <img src={img} alt="Safari preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            onClick={() => removeListItem('images', idx)}
                                            className="bg-white/20 hover:bg-red-500 text-white p-3 rounded-full backdrop-blur-md transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="aspect-square rounded-2xl bg-[#f8f9fa] border-2 border-dashed border-gray-100 flex items-center justify-center">
                                    <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Highlights (Flash Cards) */}
                    <section className="space-y-8 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[#0b1315] font-black uppercase text-lg tracking-tighter flex items-center gap-3">
                                <ListChecks size={20} className="text-emerald-500" /> Top Highlights
                            </h3>
                            <button
                                type="button" onClick={() => addListItem('highlights')}
                                className="text-emerald-500 p-2 hover:bg-emerald-50 rounded-xl transition-colors"
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {formData.highlights.map((h, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <input
                                        value={h}
                                        onChange={(e) => handleListItemChange('highlights', idx, e.target.value)}
                                        placeholder="Quick wow factor..."
                                        className="w-full bg-[#f8f9fa] border border-transparent rounded-xl py-4 px-5 text-gray-500 text-xs font-bold uppercase tracking-tight focus:ring-1 focus:ring-emerald-500 shadow-inner"
                                    />
                                    <button
                                        onClick={() => removeListItem('highlights', idx)}
                                        className="text-gray-300 hover:text-red-500 transition-colors p-2"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
