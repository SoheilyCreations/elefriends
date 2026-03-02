'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Mail, User } from 'lucide-react';
import Image from 'next/image';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    packageId: string;
    packageTitle: string;
    packagePrice: number;
    packageImage: string;
}

export default function BookingModal({
    isOpen,
    onClose,
    packageId,
    packageTitle,
    packagePrice,
    packageImage
}: BookingModalProps) {
    const [guests, setGuests] = useState(1);
    const [date, setDate] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [timeSlot, setTimeSlot] = useState('');

    const safariTimeSlots = [
        { id: 'morning', label: 'Morning Safari', time: '06:00 AM - 10:00 AM' },
        { id: 'afternoon', label: 'Afternoon Safari', time: '02:00 PM - 06:00 PM' },
        { id: 'full-day', label: 'Full Day Safari', time: '06:00 AM - 06:00 PM' },
    ];

    const totalPrice = packagePrice * guests;
    const advancePayment = totalPrice * 0.25;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const searchParams = new URLSearchParams({
            tour: packageId,
            tourName: packageTitle,
            guests: guests.toString(),
            date,
            timeSlot: timeSlot,
            name,
            email,
            phone,
            total: totalPrice.toString(),
            advance: advancePayment.toString()
        });
        window.location.href = `/checkout?${searchParams.toString()}`;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 shadow-2xl overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="bg-[#0b1315] border border-white/10 w-full max-w-4xl rounded-3xl overflow-hidden flex flex-col md:flex-row relative mt-auto mb-auto"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-md transition-colors"
                                aria-label="Close modal"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Left Side: Image & Summary */}
                            <div className="w-full md:w-5/12 relative min-h-[200px] md:min-h-full">
                                <Image
                                    src={packageImage}
                                    alt={packageTitle}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1315] via-[#0b1315]/40 to-transparent" />
                                <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                                    <h3 className="text-emerald-500 font-bold text-xs uppercase tracking-widest mb-2">Selected Tour</h3>
                                    <h2 className="text-2xl font-black uppercase leading-tight mb-2">{packageTitle}</h2>
                                    <p className="text-gray-300 font-medium">${packagePrice} per person</p>
                                </div>
                            </div>

                            {/* Right Side: Form */}
                            <div className="w-full md:w-7/12 p-8 md:px-10 md:py-8 overflow-y-auto max-h-[85vh]">
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8">Book Your Safari</h3>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Personal Info */}
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                        <User className="h-4 w-4 text-gray-500" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
                                                    placeholder="+94 77 123 4567"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <Mail className="h-4 w-4 text-gray-500" />
                                                </div>
                                                <input
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Trip Details */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tour Date</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <Calendar className="h-4 w-4 text-emerald-500" />
                                                </div>
                                                <input
                                                    type="date"
                                                    required
                                                    min={new Date().toISOString().split('T')[0]}
                                                    value={date}
                                                    onChange={(e) => setDate(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium [color-scheme:dark]"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Number of Guests</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <Users className="h-4 w-4 text-emerald-500" />
                                                </div>
                                                <input
                                                    type="number"
                                                    required
                                                    min="1"
                                                    max="10"
                                                    value={guests}
                                                    onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Time Slot Selection */}
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Preferred Time Slot</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {safariTimeSlots.map((slot) => (
                                                <button
                                                    key={slot.id}
                                                    type="button"
                                                    onClick={() => setTimeSlot(slot.id)}
                                                    className={`p-3 rounded-xl border text-left transition-all ${timeSlot === slot.id
                                                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                                                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
                                                        }`}
                                                >
                                                    <div className="text-[10px] font-black uppercase mb-1">{slot.label}</div>
                                                    <div className="text-[10px] font-medium leading-tight">{slot.time}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Dynamic Pricing Box */}
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-400 text-sm font-medium">Total Price ({guests} {guests === 1 ? 'Guest' : 'Guests'})</span>
                                            <span className="text-white font-bold text-lg">${totalPrice.toFixed(2)}</span>
                                        </div>

                                        <div className="h-px w-full bg-white/10 my-3" />

                                        <div className="flex justify-between items-center">
                                            <div>
                                                <span className="text-emerald-400 font-bold block text-sm">Pay 25% Advance Today</span>
                                                <span className="text-gray-500 text-[10px]">Balance due on arrival</span>
                                            </div>
                                            <span className="text-emerald-400 font-black text-xl">${advancePayment.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={!date || !name || !email || !phone || !timeSlot}
                                        className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold uppercase tracking-wider py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25 mt-4"
                                    >
                                        Proceed to Payment Options
                                    </button>
                                </form>


                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
