'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Users, Package, Wallet, CheckCircle2, Clock, CalendarDays, Loader2, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { bookingService } from '@/lib/services/bookingService';
import { tourService } from '@/lib/services/tourService';
import { Booking, Tour } from '@/types';

export default function AdminOverview() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [tours, setTours] = useState<Tour[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [bookingsData, toursData] = await Promise.all([
                    bookingService.getAllBookings(),
                    tourService.getAllTours()
                ]);
                setBookings(bookingsData);
                setTours(toursData);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const totalRevenue = bookings
        .filter(b => b.status === 'completed')
        .reduce((sum, b) => sum + Number(b.total_price), 0);

    const activeBookings = bookings.filter(b => b.status === 'confirmed').length;

    const stats = [
        { label: 'Total Sales', value: `$${totalRevenue.toLocaleString()}`, change: 'Completed Only', icon: <Wallet className="text-emerald-500" /> },
        { label: 'Upcoming Tours', value: activeBookings.toString(), change: 'Confirmed', icon: <CalendarDays className="text-emerald-500" /> },
        { label: 'Safari Packages', value: tours.length.toString(), change: tours.filter(t => t.is_active).length + ' Active', icon: <Package className="text-emerald-500" /> },
        { label: 'Total Inquiries', value: bookings.length.toString(), change: 'All states', icon: <Users size={20} className="text-emerald-500" /> },
    ];

    return (
        <div className="space-y-12">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-100">
                <div>
                    <h4 className="text-emerald-500 font-black uppercase text-[10px] tracking-[0.4em] mb-4">Command Center</h4>
                    <h1 className="text-[#0b1315] font-black text-4xl md:text-5xl uppercase tracking-tighter leading-none">
                        Dashboard <br />
                        <span className="text-emerald-500 italic lowercase tracking-tight">overview</span>
                    </h1>
                </div>
                <div className="flex items-center gap-4 bg-emerald-50 px-6 py-4 rounded-3xl border border-emerald-500/10 self-start md:self-auto group">
                    <Clock size={20} className={`text-emerald-500 ${loading ? 'animate-spin' : 'animate-pulse'}`} />
                    <div className="flex flex-col">
                        <span className="text-[#0b1315] font-black text-xs uppercase tracking-widest leading-none">Real-time status</span>
                        <span className="text-gray-400 font-black text-[10px] uppercase tracking-widest mt-1">
                            {loading ? 'Synchronizing...' : 'Operational'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Top Row: Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group flex flex-col justify-between min-h-[220px]"
                    >
                        <div className="flex justify-between items-start mb-10 text-emerald-500 transition-transform group-hover:scale-110">
                            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center p-3">
                                {stat.icon}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/40">{stat.change}</span>
                        </div>
                        <div>
                            <span className="text-gray-400 font-black uppercase text-[10px] tracking-[0.3em] mb-2 block">{stat.label}</span>
                            <h3 className="text-[#0b1315] text-3xl font-black tracking-tighter">{loading ? '...' : stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Second Row: Recent Activity & Latest Bookings Table */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between pb-2">
                        <h3 className="text-[#0b1315] font-black uppercase text-xl tracking-tighter">Recent Inquiries</h3>
                        <button className="text-emerald-500 font-black uppercase text-[10px] tracking-widest hover:underline">View All &rarr;</button>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-[3rem] overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#f8f9fa] border-b border-gray-100">
                                    <tr>
                                        <th className="px-8 py-6 text-gray-400 font-black uppercase text-[9px] tracking-widest">Guest</th>
                                        <th className="px-8 py-6 text-gray-400 font-black uppercase text-[9px] tracking-widest">Travel Date</th>
                                        <th className="px-8 py-6 text-gray-400 font-black uppercase text-[9px] tracking-widest">Status</th>
                                        <th className="px-8 py-6 text-gray-400 font-black uppercase text-[9px] tracking-widest">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={4} className="px-8 py-20 text-center">
                                                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mx-auto mb-4" />
                                                <span className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Retrieving logs...</span>
                                            </td>
                                        </tr>
                                    ) : bookings.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-8 py-20 text-center text-gray-400 font-black uppercase text-[10px] tracking-widest">
                                                No inquiries recorded yet
                                            </td>
                                        </tr>
                                    ) : (
                                        bookings.slice(0, 5).map((booking, i) => (
                                            <tr key={i} className="hover:bg-emerald-50/10 transition-colors group cursor-default">
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-col">
                                                        <span className="text-[#0b1315] font-black text-sm uppercase tracking-tight">{booking.guest_name}</span>
                                                        <span className="text-gray-400 font-medium text-[9px] uppercase tracking-widest mt-1">{booking.guest_email}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-gray-500 font-bold text-xs uppercase tracking-widest">{booking.travel_date}</span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-600' :
                                                            booking.status === 'completed' ? 'bg-blue-100 text-blue-600' :
                                                                booking.status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'
                                                        }`}>
                                                        {booking.status}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-[#0b1315] font-black text-sm">${Number(booking.total_price).toLocaleString()}</span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <h3 className="text-[#0b1315] font-black uppercase text-xl tracking-tighter">System Health</h3>
                    <div className="bg-[#0b1315] p-10 rounded-[4rem] text-white relative overflow-hidden group">
                        <div className="absolute right-[-20%] bottom-[-20%] opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                            <TrendingUp size={240} className="text-emerald-500" />
                        </div>

                        <div className="relative z-10 space-y-8">
                            <div>
                                <h4 className="text-emerald-500 font-black uppercase text-[10px] tracking-[0.4em] mb-4 flex items-center gap-2">
                                    <TrendingUp size={14} /> Performance
                                </h4>
                                <p className="text-gray-400 font-medium text-sm leading-relaxed mb-6">
                                    System is connected to **Supabase** cloud database. Real-time updates enabled.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                                    <span className="text-gray-500 font-black text-[9px] uppercase tracking-widest block mb-1">Status</span>
                                    <span className="text-emerald-500 font-black text-xs leading-none uppercase tracking-widest flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                        Live Connection
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
