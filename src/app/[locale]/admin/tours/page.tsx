'use client';

import { useState, useEffect } from 'react';
import { Package, Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { tourService } from '@/lib/services/tourService';
import { Tour } from '@/types';
import Link from 'next/link';

export default function AdminTours() {
    const [tours, setTours] = useState<Tour[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchTours();
    }, []);

    const fetchTours = async () => {
        try {
            setLoading(true);
            const data = await tourService.getAllTours();
            setTours(data);
            setError(null);
        } catch (err: any) {
            console.error('Error fetching tours:', err);
            setError('Failed to load safari packages. Make sure your database tables are created and .env.local is configured correctly.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this tour?')) return;
        try {
            await tourService.deleteTour(id);
            setTours(tours.filter(t => t.id !== id));
            router.refresh();
        } catch (err: any) {
            alert('Error deleting tour: ' + err.message);
        }
    };

    const filteredTours = tours.filter(t =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-12">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-100">
                <div>
                    <h4 className="text-emerald-500 font-black uppercase text-[10px] tracking-[0.4em] mb-4">Inventory Management</h4>
                    <h1 className="text-[#0b1315] font-black text-4xl md:text-5xl uppercase tracking-tighter leading-none">
                        Safari <br />
                        <span className="text-emerald-500 italic lowercase tracking-tight">packages</span>
                    </h1>
                </div>
                <Link href="/admin/tours/new" className="bg-emerald-500 hover:bg-emerald-400 text-[#0b1315] font-black text-xs uppercase tracking-[0.2em] py-5 px-10 rounded-2xl transition-all shadow-xl hover:shadow-emerald-500/20 transform hover:-translate-y-1 flex items-center gap-3 self-start md:self-auto group">
                    <Plus size={18} className="group-hover:rotate-90 transition-transform duration-500" />
                    Create New Tour
                </Link>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search safaris..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#f8f9fa] border border-gray-100 rounded-2xl py-5 pl-16 pr-8 text-[#0b1315] font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all shadow-inner"
                    />
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-5 bg-white border border-gray-100 rounded-2xl text-[#0b1315] font-black text-[10px] uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-sm">
                        <Filter size={16} /> Filters
                    </button>
                    <button onClick={fetchTours} className="p-5 bg-white border border-gray-100 rounded-2xl hover:text-emerald-500 transition-colors shadow-sm">
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Tours Table / Content State */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                    <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Synchronizing with wild...</p>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-100 p-10 rounded-[3rem] text-center max-w-2xl mx-auto">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-6" />
                    <h3 className="text-red-900 font-black uppercase text-lg mb-2">Connection Issue</h3>
                    <p className="text-red-600/70 font-medium mb-6">{error}</p>
                    <button onClick={fetchTours} className="bg-red-500 text-white px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-red-600 transition-all">Retry Link</button>
                </div>
            ) : (
                <div className="bg-white border border-gray-100 rounded-[3rem] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#f8f9fa] border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-6 text-gray-400 font-black uppercase text-[9px] tracking-widest">Safari Details</th>
                                    <th className="px-8 py-6 text-gray-400 font-black uppercase text-[9px] tracking-widest">Location</th>
                                    <th className="px-8 py-6 text-gray-400 font-black uppercase text-[9px] tracking-widest">Status</th>
                                    <th className="px-8 py-6 text-gray-400 font-black uppercase text-[9px] tracking-widest">Price</th>
                                    <th className="px-8 py-6 text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <AnimatePresence mode="popLayout">
                                    {filteredTours.map((tour, i) => (
                                        <motion.tr
                                            key={tour.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="hover:bg-emerald-50/10 transition-colors group cursor-default"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 shrink-0">
                                                        <Package size={20} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[#0b1315] font-black text-sm uppercase tracking-tight">{tour.title}</span>
                                                        <span className="text-gray-400 font-medium text-[8px] uppercase tracking-widest mt-1">Ref ID: {tour.id.substring(0, 8)}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-gray-500 font-bold text-xs uppercase tracking-widest">{tour.location}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${tour.is_active ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'
                                                    }`}>
                                                    {tour.is_active ? 'Active' : 'Draft'}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-[#0b1315] font-black text-sm">${tour.price}</span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button title="View Content" className="p-2 text-gray-400 hover:text-emerald-500 transition-colors"><Eye size={18} /></button>
                                                    <Link href={`/admin/tours/${tour.id}`} title="Modify" className="p-2 text-gray-400 hover:text-emerald-500 transition-colors">
                                                        <Edit size={18} />
                                                    </Link>
                                                    <button onClick={() => handleDelete(tour.id)} title="Remove" className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                    {filteredTours.length === 0 && (
                        <div className="text-center py-20">
                            <Package className="w-12 h-12 text-gray-100 mx-auto mb-4" />
                            <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest">No matching packages discovered</p>
                        </div>
                    )}
                </div>
            )}

            <p className="text-center text-gray-300 font-black uppercase text-[9px] tracking-[0.5em] pt-8">
                End of Safari List
            </p>
        </div>
    );
}
