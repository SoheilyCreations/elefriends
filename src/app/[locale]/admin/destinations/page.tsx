'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, Plus, Loader2, Edit2, Trash2,
    Image as ImageIcon, XCircle, Save,
    TrendingUp, ExternalLink
} from 'lucide-react';
import Image from 'next/image';
import { Destination } from '@/types';
import { destinationService } from '@/lib/services/destinationService';

export default function AdminDestinations() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState<Partial<Destination> | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await destinationService.getAllDestinations();
            setDestinations(data);
        } catch (error) {
            console.error('Error fetching destinations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenEdit = (dest?: Destination) => {
        setSelectedDestination(dest || {
            title: '',
            subtitle: '',
            description: '',
            image: '',
            slug: ''
        });
        setIsEditModalOpen(true);
    };

    const handleSave = async () => {
        if (!selectedDestination) return;

        try {
            setIsSaving(true);
            const { id, ...data } = selectedDestination;

            // Auto generate slug if missing
            if (!data.slug) {
                data.slug = data.title?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
            }

            if (id) {
                await destinationService.updateDestination(id as string, data);
            } else {
                await destinationService.createDestination(data as Omit<Destination, 'id' | 'created_at'>);
            }

            setIsEditModalOpen(false);
            fetchData();
        } catch (error) {
            console.error('Error saving destination:', error);
            alert('Failed to save destination. Check console for details.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploadingImage(true);
            const url = await destinationService.uploadImage(file);
            setSelectedDestination(prev => prev ? { ...prev, image: url } : null);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Image upload failed');
        } finally {
            setUploadingImage(false);
        }
    };

    return (
        <div className="space-y-12 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-gray-100">
                <div className="space-y-4">
                    <h4 className="text-emerald-500 font-black uppercase text-[10px] tracking-[0.4em]">Region Management</h4>
                    <h1 className="text-[#0b1315] font-black text-4xl md:text-5xl uppercase tracking-tighter leading-none">
                        Destinations <br />
                        <span className="text-emerald-500 italic lowercase tracking-tight">& hotspots</span>
                    </h1>
                </div>
                <button
                    onClick={() => handleOpenEdit()}
                    className="flex items-center justify-center gap-3 px-10 py-5 bg-[#0b1315] text-white rounded-[2rem] font-black uppercase text-[10px] tracking-[0.2em] hover:bg-emerald-500 transition-all shadow-xl shadow-gray-200"
                >
                    <Plus size={18} /> New Destination
                </button>
            </div>

            {/* Content Display */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                    <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Loading regions...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {destinations.map((dest, i) => (
                        <motion.div
                            key={dest.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="relative h-48 overflow-hidden bg-gray-100">
                                {dest.image ? (
                                    <Image
                                        src={dest.image}
                                        alt={dest.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                        <ImageIcon size={40} />
                                    </div>
                                )}
                                <div className="absolute top-6 right-6">
                                    <button
                                        onClick={() => handleOpenEdit(dest)}
                                        className="p-3 bg-white/90 backdrop-blur-md rounded-2xl text-[#0b1315] hover:bg-emerald-500 hover:text-white transition-all shadow-lg"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-8 space-y-4">
                                <div>
                                    <h3 className="text-lg font-black text-[#0b1315] uppercase tracking-tight">{dest.title}</h3>
                                    <p className="text-sm font-bold text-emerald-500 italic mt-1">{dest.subtitle}</p>
                                </div>
                                <p className="text-gray-400 text-xs font-medium leading-relaxed line-clamp-2">
                                    {dest.description}
                                </p>
                                <div className="pt-4 flex items-center justify-between border-t border-gray-50">
                                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Slug: {dest.slug}</span>
                                    <a
                                        href={`/destinations/${dest.slug}`}
                                        target="_blank"
                                        className="text-gray-400 hover:text-emerald-500 transition-colors"
                                    >
                                        <ExternalLink size={14} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Edit / Create Modal */}
            <AnimatePresence>
                {isEditModalOpen && selectedDestination && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEditModalOpen(false)}
                            className="absolute inset-0 bg-[#0b1315]/90 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden flex flex-col max-h-[90vh] shadow-2xl"
                        >
                            <div className="bg-[#0b1315] p-10 text-white relative">
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
                                >
                                    <XCircle size={24} />
                                </button>
                                <h4 className="text-emerald-500 font-black uppercase text-[10px] tracking-[0.4em] mb-4">Content Studio</h4>
                                <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">
                                    {selectedDestination.id ? 'Edit Destination' : 'New Destination'}
                                </h2>
                            </div>

                            <div className="p-10 space-y-8 overflow-y-auto flex-1 bg-gray-50/30">
                                {/* Image Upload */}
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block pl-2">Cover Image</label>
                                    <div className="relative h-48 w-full bg-white border border-dashed border-gray-200 rounded-3xl overflow-hidden group">
                                        {selectedDestination.image ? (
                                            <>
                                                <Image src={selectedDestination.image} alt="Preview" fill className="object-cover" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <label className="cursor-pointer bg-white text-[#0b1315] px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:scale-110 transition-transform">
                                                        {uploadingImage ? 'Uploading...' : 'Change Photo'}
                                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                                    </label>
                                                </div>
                                            </>
                                        ) : (
                                            <label className="w-full h-full flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-emerald-50/50 transition-colors">
                                                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
                                                    {uploadingImage ? <Loader2 className="animate-spin" /> : <ImageIcon size={20} />}
                                                </div>
                                                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none">Upload Main Photo</span>
                                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                            </label>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block pl-2">Title</label>
                                        <input
                                            type="text"
                                            value={selectedDestination.title}
                                            onChange={(e) => setSelectedDestination({ ...selectedDestination, title: e.target.value })}
                                            className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-6 text-sm font-bold text-black opacity-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                            placeholder="e.g. Minneriya Park"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block pl-2">Subtitle / Tagline</label>
                                        <input
                                            type="text"
                                            value={selectedDestination.subtitle}
                                            onChange={(e) => setSelectedDestination({ ...selectedDestination, subtitle: e.target.value })}
                                            className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-6 text-sm font-bold text-black opacity-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                            placeholder="e.g. World's Largest Gathering"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block pl-2">Description</label>
                                    <textarea
                                        value={selectedDestination.description}
                                        onChange={(e) => setSelectedDestination({ ...selectedDestination, description: e.target.value })}
                                        className="w-full bg-white border border-gray-200 rounded-[2rem] py-4 px-6 text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-emerald-500/20 min-h-[150px] resize-none"
                                        placeholder="Describe what makes this place special..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block pl-2">SEO Slug (Auto-generated if empty)</label>
                                    <input
                                        type="text"
                                        value={selectedDestination.slug}
                                        onChange={(e) => setSelectedDestination({ ...selectedDestination, slug: e.target.value })}
                                        className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-6 text-sm font-bold text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        placeholder="minneriya-park"
                                    />
                                </div>
                            </div>

                            <div className="p-10 bg-white border-t border-gray-100">
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving || uploadingImage}
                                    className="w-full py-5 bg-emerald-500 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={18} />}
                                    {selectedDestination.id ? 'Push Updates' : 'Publish Destination'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
