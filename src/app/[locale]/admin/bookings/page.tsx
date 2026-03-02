'use client';

import { useState, useEffect } from 'react';
import { CalendarDays, Search, Filter, Eye, CheckCircle2, XCircle, Clock, MoreVertical, Mail, Phone, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { bookingService } from '@/lib/services/bookingService';
import { tourService } from '@/lib/services/tourService';
import { Booking, Tour } from '@/types';

export default function AdminBookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [tours, setTours] = useState<Tour[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const [editedBooking, setEditedBooking] = useState<any>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [bookingData, tourData] = await Promise.all([
                bookingService.getAllBookings(),
                tourService.getAllTours()
            ]);
            setBookings(bookingData);
            setTours(tourData);
            setError(null);
        } catch (err: any) {
            console.error('Error fetching data:', err);
            setError('Failed to load data. Verify your database connection.');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: string, newStatus: Booking['status']) => {
        try {
            await bookingService.updateBookingStatus(id, newStatus);
            setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
        } catch (err: any) {
            alert('Error updating status: ' + err.message);
        }
    };

    const handleUpdateBooking = async () => {
        if (!editedBooking) return;
        try {
            setLoading(true);
            const updated = await bookingService.updateBooking(editedBooking.id, {
                tour_id: editedBooking.tour_id,
                guest_name: editedBooking.guest_name,
                guest_email: editedBooking.guest_email,
                guest_phone: editedBooking.guest_phone,
                travel_date: editedBooking.travel_date,
                pax: editedBooking.pax,
                total_price: editedBooking.total_price,
                status: editedBooking.status,
                notes: editedBooking.notes,
            });
            setBookings(bookings.map(b => b.id === updated.id ? updated : b));
            setSelectedBooking(updated);
            setIsEditing(false);
        } catch (err: any) {
            alert('Error updating booking: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredBookings = bookings.filter(b =>
        b.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.guest_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (b as any).tours?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-12">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-100">
                <div>
                    <h4 className="text-emerald-500 font-black uppercase text-[10px] tracking-[0.4em] mb-4">Reservation Desk</h4>
                    <h1 className="text-[#0b1315] font-black text-4xl md:text-5xl uppercase tracking-tighter leading-none">
                        Guest <br />
                        <span className="text-emerald-500 italic lowercase tracking-tight">bookings</span>
                    </h1>
                </div>
                <div className="flex items-center gap-4 bg-emerald-50 px-6 py-4 rounded-3xl border border-emerald-500/10 self-start md:self-auto group">
                    <CalendarDays size={20} className="text-emerald-500" />
                    <div className="flex flex-col">
                        <span className="text-[#0b1315] font-black text-xs uppercase tracking-widest leading-none">Schedule active</span>
                        <span className="text-gray-400 font-black text-[10px] uppercase tracking-widest mt-1">
                            {loading ? '---' : bookings.filter(b => b.status === 'confirmed').length + ' Active'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search guests or emails..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#f8f9fa] border border-gray-100 rounded-2xl py-5 pl-16 pr-8 text-[#0b1315] font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all shadow-inner"
                    />
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-5 bg-white border border-gray-100 rounded-2xl text-[#0b1315] font-black text-[10px] uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-sm">
                        <Filter size={16} /> Filters
                    </button>
                    <button onClick={fetchData} className="p-5 bg-white border border-gray-100 rounded-2xl hover:text-emerald-500 transition-colors shadow-sm">
                        <Loader2 className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Bookings Table / Content State */}
            {loading && bookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                    <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Retrieving reservations...</p>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-100 p-10 rounded-[3rem] text-center max-w-2xl mx-auto">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-6" />
                    <h3 className="text-red-900 font-black uppercase text-lg mb-2">Connection Issue</h3>
                    <p className="text-red-600/70 font-medium mb-6">{error}</p>
                    <button onClick={fetchData} className="bg-red-500 text-white px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-red-600 transition-all">Retry Link</button>
                </div>
            ) : (
                <div className="bg-white border border-gray-100 rounded-[3rem] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#f8f9fa] border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-6 text-gray-400 font-black uppercase text-[9px] tracking-widest">Guest Info</th>
                                    <th className="px-8 py-6 text-gray-400 font-black uppercase text-[9px] tracking-widest">Travel Date</th>
                                    <th className="px-8 py-6 text-gray-400 font-black uppercase text-[9px] tracking-widest">Financials</th>
                                    <th className="px-8 py-6 text-gray-400 font-black uppercase text-[9px] tracking-widest">Status</th>
                                    <th className="px-8 py-6 text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <AnimatePresence mode="popLayout">
                                    {filteredBookings.map((booking, i) => (
                                        <motion.tr
                                            key={booking.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="hover:bg-emerald-50/10 transition-colors group cursor-default"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-[#0b1315] font-black text-sm uppercase tracking-tight">{booking.guest_name}</span>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-emerald-500 font-bold text-[10px] uppercase tracking-wide">{(booking as any).tours?.title || 'Unknown Tour'}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-gray-500 font-bold text-xs uppercase tracking-widest">{booking.travel_date}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-[#0b1315] font-black text-sm">${Number(booking.total_price).toLocaleString()}</span>
                                                    <span className={`text-[8px] font-black uppercase tracking-[0.2em] mt-1 ${booking.payment_status === 'paid' ? 'text-emerald-500' : 'text-amber-500'
                                                        }`}>{booking.payment_status}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-600' :
                                                        booking.status === 'completed' ? 'bg-blue-100 text-blue-600' :
                                                            booking.status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'
                                                    }`}>
                                                    {booking.status === 'confirmed' ? <CheckCircle2 size={10} className="mr-2" /> :
                                                        booking.status === 'completed' ? <CheckCircle2 size={10} className="mr-2" /> :
                                                            booking.status === 'pending' ? <Clock size={10} className="mr-2" /> : <XCircle size={10} className="mr-2" />}
                                                    {booking.status}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedBooking(booking);
                                                            setIsDetailOpen(true);
                                                            setIsEditing(false);
                                                        }}
                                                        title="View Details"
                                                        className="p-2 text-gray-400 hover:text-emerald-500 transition-colors"
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                    <button title="More Actions" className="p-2 text-gray-400 hover:text-emerald-500 transition-colors"><MoreVertical size={18} /></button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                    {filteredBookings.length === 0 && (
                        <div className="text-center py-20">
                            <CalendarDays className="w-12 h-12 text-gray-100 mx-auto mb-4" />
                            <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest">No matching reservations found</p>
                        </div>
                    )}
                </div>
            )}

            <p className="text-center text-gray-300 font-black uppercase text-[9px] tracking-[0.5em] pt-8">
                End of Booking Logs
            </p>

            {/* Booking Detail Modal */}
            <AnimatePresence>
                {isDetailOpen && selectedBooking && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => { if (!loading) setIsDetailOpen(false); }}
                            className="fixed inset-0 bg-[#0b1315]/90 backdrop-blur-md z-[100]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[700px] md:max-h-[90vh] bg-white rounded-[3rem] shadow-2xl z-[101] overflow-hidden flex flex-col"
                        >
                            <div className="bg-[#0b1315] p-10 text-white relative">
                                <button
                                    onClick={() => setIsDetailOpen(false)}
                                    className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
                                >
                                    <XCircle size={24} />
                                </button>
                                <h4 className="text-emerald-500 font-black uppercase text-[10px] tracking-[0.4em] mb-4">Reservation Management</h4>
                                <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">
                                    {isEditing ? 'Editing Reservation' : selectedBooking.guest_name}
                                </h2>
                                {!isEditing && (
                                    <p className="text-gray-400 font-medium text-xs mt-4 uppercase tracking-widest">
                                        Ref: {selectedBooking.id.substring(0, 8)}
                                    </p>
                                )}
                            </div>

                            <div className="p-10 space-y-8 overflow-y-auto flex-1 bg-gray-50/30">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {isEditing ? (
                                        <>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block pl-2">Tour Package</label>
                                                <select
                                                    value={editedBooking.tour_id}
                                                    onChange={(e) => setEditedBooking({ ...editedBooking, tour_id: e.target.value })}
                                                    className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-6 text-sm font-bold text-black opacity-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                                >
                                                    {tours.map(tour => (
                                                        <option key={tour.id} value={tour.id}>{tour.title}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block pl-2">Guest Name</label>
                                                <input
                                                    type="text"
                                                    value={editedBooking.guest_name}
                                                    onChange={(e) => setEditedBooking({ ...editedBooking, guest_name: e.target.value })}
                                                    className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-6 text-sm font-bold text-black opacity-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block pl-2">Travel Date</label>
                                                <input
                                                    type="date"
                                                    value={editedBooking.travel_date}
                                                    onChange={(e) => setEditedBooking({ ...editedBooking, travel_date: e.target.value })}
                                                    className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-6 text-sm font-bold text-black opacity-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block pl-2">Guests (Pax)</label>
                                                <input
                                                    type="number"
                                                    value={editedBooking.pax}
                                                    onChange={(e) => setEditedBooking({ ...editedBooking, pax: parseInt(e.target.value) })}
                                                    className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-6 text-sm font-bold text-black opacity-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block pl-2">Total Price (Adjustment)</label>
                                                <div className="relative">
                                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-gray-400">$</span>
                                                    <input
                                                        type="number"
                                                        value={editedBooking.total_price}
                                                        onChange={(e) => setEditedBooking({ ...editedBooking, total_price: parseFloat(e.target.value) })}
                                                        className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-10 pr-6 text-sm font-bold opacity-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-black"
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="space-y-1 p-4 bg-white rounded-3xl border border-gray-100 shadow-sm">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Tour Package</span>
                                                <p className="text-sm font-black text-[#0b1315] uppercase tracking-tight">
                                                    {selectedBooking.tours?.title || 'Unknown Tour'}
                                                </p>
                                            </div>
                                            <div className="space-y-1 p-4 bg-white rounded-3xl border border-gray-100 shadow-sm">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Travel Date</span>
                                                <p className="text-sm font-black text-[#0b1315] uppercase tracking-tight">
                                                    {selectedBooking.travel_date}
                                                </p>
                                            </div>
                                            <div className="space-y-1 p-4 bg-white rounded-3xl border border-gray-100 shadow-sm">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Guests (Pax)</span>
                                                <p className="text-sm font-black text-[#0b1315] uppercase tracking-tight">
                                                    {selectedBooking.pax} Guests
                                                </p>
                                            </div>
                                            <div className="space-y-1 p-4 bg-white rounded-3xl border border-gray-100 shadow-sm">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Total Price</span>
                                                <p className="text-sm font-black text-emerald-600 uppercase tracking-tight">
                                                    ${Number(selectedBooking.total_price).toLocaleString()}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="h-px bg-gray-100 w-full" />

                                <div className="space-y-4">
                                    {isEditing ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block pl-2">Email Address</label>
                                                <input
                                                    type="email"
                                                    value={editedBooking.guest_email}
                                                    onChange={(e) => setEditedBooking({ ...editedBooking, guest_email: e.target.value })}
                                                    className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-6 text-sm font-bold text-black opacity-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block pl-2">Phone Number</label>
                                                <input
                                                    type="text"
                                                    value={editedBooking.guest_phone}
                                                    onChange={(e) => setEditedBooking({ ...editedBooking, guest_phone: e.target.value })}
                                                    className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-6 text-sm font-bold text-black opacity-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-4 group">
                                                <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-emerald-500 transition-colors shadow-sm">
                                                    <Mail size={20} />
                                                </div>
                                                <div>
                                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Email Address</span>
                                                    <p className="text-sm font-bold text-[#0b1315]">{selectedBooking.guest_email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 group">
                                                <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-emerald-500 transition-colors shadow-sm">
                                                    <Phone size={20} />
                                                </div>
                                                <div>
                                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Phone / WhatsApp</span>
                                                    <p className="text-sm font-bold text-[#0b1315]">{selectedBooking.guest_phone}</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="h-px bg-gray-100 w-full" />

                                <div className="space-y-4">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Internal Notice / Notes</span>
                                    {isEditing ? (
                                        <textarea
                                            value={editedBooking.notes || ''}
                                            onChange={(e) => setEditedBooking({ ...editedBooking, notes: e.target.value })}
                                            placeholder="Add important notes about this guest (e.g., special requests, dietary needs, discount reason)..."
                                            className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-6 text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-emerald-500/20 min-h-[120px] resize-none"
                                        />
                                    ) : (
                                        <div className="p-6 bg-emerald-50/30 border border-emerald-500/5 rounded-2xl">
                                            <p className={`text-sm ${selectedBooking.notes ? 'text-[#0b1315] font-medium' : 'text-gray-400 italic font-medium'}`}>
                                                {selectedBooking.notes || 'No internal notes added for this reservation.'}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="h-px bg-gray-100 w-full" />

                                <div className="space-y-4">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Update Status</span>
                                    <div className="flex flex-wrap gap-3">
                                        {[
                                            { id: 'pending', label: 'Pending', color: 'bg-amber-100 text-amber-700 border-amber-200' },
                                            { id: 'confirmed', label: 'Confirmed', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
                                            { id: 'completed', label: 'Completed', color: 'bg-blue-100 text-blue-700 border-blue-200' },
                                            { id: 'cancelled', label: 'Cancelled', color: 'bg-rose-100 text-rose-700 border-rose-200' },
                                        ].map((status) => (
                                            <button
                                                key={status.id}
                                                onClick={() => {
                                                    if (isEditing) {
                                                        setEditedBooking({ ...editedBooking, status: status.id });
                                                    } else {
                                                        handleStatusUpdate(selectedBooking.id, status.id as any);
                                                        setSelectedBooking({ ...selectedBooking, status: status.id });
                                                    }
                                                }}
                                                className={`flex-1 py-3 px-4 rounded-xl border-2 font-black uppercase text-[10px] tracking-widest transition-all ${(isEditing ? editedBooking.status : selectedBooking.status) === status.id
                                                    ? `${status.color.replace('bg-', 'ring-4 ring-offset-2 ring- opacity-100')} scale-[1.02] shadow-sm`
                                                    : 'bg-white text-gray-400 border-gray-100 opacity-60 grayscale hover:grayscale-0 hover:opacity-100'
                                                    } ${(isEditing ? editedBooking.status : selectedBooking.status) === status.id ? status.color : ''}`}
                                            >
                                                {status.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-10 bg-white border-t border-gray-100 flex gap-4">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="flex-1 py-5 bg-gray-100 text-[#0b1315] rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-gray-200 transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleUpdateBooking}
                                            disabled={loading}
                                            className="flex-1 py-5 bg-emerald-500 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3"
                                        >
                                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => {
                                                setEditedBooking({ ...selectedBooking });
                                                setIsEditing(true);
                                            }}
                                            className="flex-1 py-5 bg-emerald-50 text-emerald-600 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-emerald-100 transition-all"
                                        >
                                            Edit Reservation
                                        </button>
                                        <button
                                            onClick={() => setIsDetailOpen(false)}
                                            className="flex-1 py-5 bg-[#0b1315] text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-emerald-600 transition-all shadow-xl"
                                        >
                                            Close Details
                                        </button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
