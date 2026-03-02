'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ChevronRight, Lock, Wallet, Landmark, CreditCard, User, Phone, Mail, Clock, Calendar, Users, Home, Printer, Share2, Loader2, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { ElephantIcon } from '@/components/icons/ElephantIcon';

function CheckoutContent() {
    const searchParams = useSearchParams();
    const [isClient, setIsClient] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'bank' | 'card'>('cash');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const tourId = searchParams.get('tour') || 'Safari Package';
    const tourName = searchParams.get('tourName') || tourId.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
    const guests = searchParams.get('guests') || '1';
    const date = searchParams.get('date') || 'Select Date';
    const timeSlot = searchParams.get('timeSlot') || '';
    const name = searchParams.get('name') || '';
    const email = searchParams.get('email') || '';
    const phone = searchParams.get('phone') || '';
    const total = searchParams.get('total') || '0';
    const advance = searchParams.get('advance') || '0';

    if (!isClient) return null;

    const getTimeLabel = (id: string) => {
        switch (id) {
            case 'morning': return 'Morning (6:00 AM)';
            case 'afternoon': return 'Afternoon (2:00 PM)';
            case 'full-day': return 'Full Day (6:00 AM)';
            default: return id;
        }
    };

    const handleFinalSubmit = async () => {
        try {
            setIsSubmitting(true);
            setError(null);

            // 1. Prepare booking data
            const bookingData = {
                tour_id: tourId,
                guest_name: name,
                guest_email: email,
                guest_phone: phone,
                travel_date: date,
                pax: parseInt(guests),
                total_price: parseFloat(total),
                status: 'pending' as const,
                payment_status: paymentMethod === 'card' ? 'unpaid' : 'unpaid' as const,
            };

            // 2. Save to Supabase
            const { bookingService } = await import('@/lib/services/bookingService');
            await bookingService.createBooking(bookingData);

            // 3. Show success
            setIsSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err: any) {
            console.error('Booking failed:', err);
            setError('Failed to process your booking. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="pt-32 pb-24 min-h-screen bg-[#f0f2f5] font-sans relative overflow-hidden">
                {/* Background Elephant Pattern - Subtle */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.02] flex flex-wrap gap-24 justify-around p-24 overflow-hidden">
                    <ElephantIcon className="w-64 h-64 rotate-12" />
                    <ElephantIcon className="w-64 h-64 -rotate-12" />
                    <ElephantIcon className="w-64 h-64 rotate-45" />
                    <ElephantIcon className="w-64 h-64 -rotate-45" />
                    <ElephantIcon className="w-64 h-64" />
                    <ElephantIcon className="w-64 h-64 rotate-180" />
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="bg-white rounded-[3rem] shadow-2xl shadow-emerald-500/10 border border-emerald-50 overflow-hidden relative">

                        {/* Elephant Watermark */}
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none -mr-20 -mt-20">
                            <ElephantIcon className="w-96 h-96" />
                        </div>

                        {/* Success Header */}
                        <div className="bg-[#0b1315] p-12 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-emerald-500/5 backdrop-blur-3xl" />
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="bg-emerald-500 p-4 rounded-3xl shadow-[0_0_40px_rgba(16,185,129,0.4)] mb-8 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                                    <CheckCircle2 className="w-12 h-12 text-white" />
                                </div>
                                <h2 className="text-emerald-400 font-bold tracking-[0.3em] uppercase text-xs mb-3">Booking Confirmed</h2>
                                <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">Thank You!</h1>
                                <p className="text-gray-400 mt-4 max-w-lg mx-auto font-medium">
                                    Your safari adventure with <span className="text-emerald-500">ELEFRIENDS</span> is now confirmed. Get ready for an unforgettable journey into the wild.
                                </p>
                            </div>
                        </div>

                        {/* Summary Section */}
                        <div className="p-8 md:p-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                                {/* Reference & Details */}
                                <div className="space-y-8">
                                    <div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Booking Reference</span>
                                        <p className="text-2xl font-black text-[#0b1315] font-mono">#ELF-{Math.floor(100000 + Math.random() * 900000)}</p>
                                    </div>

                                    <div className="bg-[#f8f9fa] rounded-3xl p-6 border border-gray-100 relative group overflow-hidden">
                                        <div className="absolute right-4 bottom-4 opacity-[0.05] group-hover:scale-110 transition-transform duration-700">
                                            <ElephantIcon className="w-16 h-16" />
                                        </div>
                                        <h3 className="font-black text-[#0b1315] uppercase text-sm mb-4 tracking-wider flex items-center gap-2">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                            Trip Summary
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-emerald-500/10 rounded-lg"><Clock className="w-4 h-4 text-emerald-600" /></div>
                                                <div>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase">{tourName}</p>
                                                    <p className="text-xs font-bold text-[#0b1315]">{date} | {getTimeLabel(timeSlot)}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-emerald-500/10 rounded-lg"><Users className="w-4 h-4 text-emerald-600" /></div>
                                                <div>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase">Travelers</p>
                                                    <p className="text-xs font-bold text-[#0b1315]">{guests} Guest(s)</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-emerald-500/10 rounded-lg"><Wallet className="w-4 h-4 text-emerald-600" /></div>
                                                <div>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase">Total Cost</p>
                                                    <p className="text-xs font-bold text-[#0b1315]">${total}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Next Steps */}
                                <div className="space-y-6">
                                    <h3 className="font-black text-[#0b1315] uppercase text-sm tracking-widest">Next Steps</h3>

                                    <div className="flex gap-4">
                                        <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs ring-4 ring-emerald-50">1</div>
                                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                            A detailed confirmation email has been sent to <span className="font-bold text-[#0b1315]">{email}</span>. Please check your inbox and spam folder.
                                        </p>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs ring-4 ring-emerald-50">2</div>
                                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                            Our safari manager will contact you via <span className="font-bold text-[#0b1315]">{phone}</span> (WhatsApp) to finalize pickup locations.
                                        </p>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs ring-4 ring-emerald-50">3</div>
                                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                            Don't forget your camera! We'll provide binoculars, water, and local snacks during the tour.
                                        </p>
                                    </div>

                                    <div className="pt-6 flex flex-wrap gap-3">
                                        <button className="bg-emerald-50 text-emerald-600 font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-100 transition-all">
                                            <Printer className="w-3 h-3" /> Print Invoice
                                        </button>
                                        <button className="bg-emerald-50 text-emerald-600 font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-100 transition-all">
                                            <Share2 className="w-3 h-3" /> Share Safari
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Elephant Message */}
                            <div className="mt-16 bg-emerald-500/5 rounded-3xl p-8 border border-emerald-500/10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                                <ElephantIcon className="w-20 h-20 text-emerald-600 opacity-80" />
                                <div>
                                    <h4 className="font-black text-[#0b1315] uppercase text-sm mb-1">Gentle Giants Await</h4>
                                    <p className="text-sm text-gray-500 italic">"The only creatures that are evolved enough to convey pure love are dogs and elephants." — Let's witness that bond in the wild together.</p>
                                </div>
                            </div>

                            <div className="mt-12 text-center">
                                <Link
                                    href="/"
                                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm uppercase tracking-widest py-5 px-12 rounded-2xl transition-all shadow-xl hover:shadow-emerald-500/30 flex items-center justify-center gap-3 w-full md:w-auto md:inline-flex"
                                >
                                    <Home className="w-5 h-5" />
                                    Go Back Home
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-24 min-h-screen bg-[#f0f2f5] font-sans relative overflow-hidden">
            {/* Background Elephant Pattern - Subtle */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] flex flex-wrap gap-24 justify-around p-24 overflow-hidden">
                <ElephantIcon className="w-64 h-64 rotate-12" />
                <ElephantIcon className="w-64 h-64 -rotate-12" />
                <ElephantIcon className="w-64 h-64 rotate-45" />
                <ElephantIcon className="w-64 h-64 -rotate-45" />
                <ElephantIcon className="w-64 h-64" />
                <ElephantIcon className="w-64 h-64 rotate-180" />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="mb-12">
                    <h2 className="text-emerald-500 font-bold tracking-[0.2em] uppercase text-xs mb-3">Almost There</h2>
                    <h1 className="text-4xl md:text-5xl font-black text-[#0b1315] uppercase tracking-tight mb-4">Finalize Booking</h1>
                    <div className="flex items-center text-sm font-medium text-gray-400">
                        <span className="text-emerald-500">Details Confirmed</span>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="text-[#0b1315]">Payment Option</span>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span>Finish</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Payment Options */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Customer Summary Card */}
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                            <h3 className="text-xl font-black text-[#0b1315] uppercase tracking-tight mb-6 flex items-center gap-3">
                                <User className="w-5 h-5 text-emerald-500" />
                                Your Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Name</span>
                                    <p className="text-sm font-bold text-[#0b1315]">{name}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone</span>
                                    <p className="text-sm font-bold text-[#0b1315]">{phone}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email</span>
                                    <p className="text-sm font-bold text-[#0b1315]">{email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method Selector */}
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden">
                            <h3 className="text-xl font-black text-[#0b1315] uppercase tracking-tight mb-8">Choose Payment Method</h3>

                            {error && (
                                <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600 mb-6">
                                    <AlertCircle size={18} />
                                    <p className="font-bold text-xs uppercase tracking-tight">{error}</p>
                                </div>
                            )}

                            {/* Subtle Elephant element */}
                            <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
                                <ElephantIcon className="w-48 h-48" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                <button
                                    onClick={() => setPaymentMethod('cash')}
                                    className={`p-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${paymentMethod === 'cash' ? 'border-emerald-500 bg-emerald-50/50' : 'border-gray-100 hover:border-emerald-200'}`}
                                >
                                    <Wallet className={`w-8 h-8 ${paymentMethod === 'cash' ? 'text-emerald-500' : 'text-gray-400'}`} />
                                    <span className={`text-xs font-black uppercase tracking-wider ${paymentMethod === 'cash' ? 'text-[#0b1315]' : 'text-gray-500'}`}>Pay on Arrival</span>
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('bank')}
                                    className={`p-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${paymentMethod === 'bank' ? 'border-emerald-500 bg-emerald-50/50' : 'border-gray-100 hover:border-emerald-200'}`}
                                >
                                    <Landmark className={`w-8 h-8 ${paymentMethod === 'bank' ? 'text-emerald-500' : 'text-gray-400'}`} />
                                    <span className={`text-xs font-black uppercase tracking-wider ${paymentMethod === 'bank' ? 'text-[#0b1315]' : 'text-gray-500'}`}>Bank Transfer</span>
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('card')}
                                    className={`p-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${paymentMethod === 'card' ? 'border-emerald-500 bg-emerald-50/50' : 'border-gray-100 hover:border-emerald-200'}`}
                                >
                                    <CreditCard className={`w-8 h-8 ${paymentMethod === 'card' ? 'text-emerald-500' : 'text-gray-400'}`} />
                                    <span className={`text-xs font-black uppercase tracking-wider ${paymentMethod === 'card' ? 'text-[#0b1315]' : 'text-gray-500'}`}>Card (Online)</span>
                                </button>
                            </div>

                            {/* Payment Method Specific Content */}
                            <div className="min-h-[160px]">
                                {paymentMethod === 'cash' && (
                                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-emerald-800 relative overflow-hidden">
                                        <div className="absolute -right-4 -bottom-4 opacity-[0.1]">
                                            <ElephantIcon className="w-20 h-20" />
                                        </div>
                                        <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4" />
                                            Cash on Arrival Selected
                                        </h4>
                                        <p className="text-sm leading-relaxed opacity-80">
                                            Your booking will be reserved instantly. You can pay the total amount directly to our guide when you arrive for the safari. We accept LKR, USD, and EUR.
                                        </p>
                                    </div>
                                )}

                                {paymentMethod === 'bank' && (
                                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                                        <h4 className="font-bold text-sm mb-4 text-[#0b1315]">Our Bank Details</h4>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase">Bank Name</span>
                                                <span className="text-sm font-bold text-[#0b1315]">Bank of Ceylon (BOC)</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase">Account Name</span>
                                                <span className="text-sm font-bold text-[#0b1315]">Elefriend Sri Lanka Pvt Ltd</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-2">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase">Account Number</span>
                                                <span className="text-sm font-bold text-emerald-600">88234-567-890</span>
                                            </div>
                                        </div>
                                        <p className="mt-4 text-[10px] text-gray-400 italic font-medium text-center">Please send the transfer receipt to info@elefriends.com or WhatsApp.</p>
                                    </div>
                                )}

                                {paymentMethod === 'card' && (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Card Details</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    className="w-full bg-[#f8f9fa] border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                                    placeholder="**** **** **** ****"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="text" className="w-full bg-[#f8f9fa] border border-gray-200 rounded-xl py-3 px-4 text-sm" placeholder="MM/YY" />
                                            <input type="text" className="w-full bg-[#f8f9fa] border border-gray-200 rounded-xl py-3 px-4 text-sm" placeholder="CVC" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleFinalSubmit}
                                type="button"
                                disabled={isSubmitting}
                                className="w-full bg-[#0b1315] hover:bg-[#1a2528] disabled:opacity-50 text-white font-black text-sm uppercase tracking-widest py-5 px-8 rounded-2xl transition-all shadow-xl mt-8 flex items-center justify-center gap-3"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                )}
                                {isSubmitting ? 'Confirming...' : (paymentMethod === 'cash' ? 'Confirm Booking' : paymentMethod === 'bank' ? 'I Have Transferred' : 'Pay & Confirm')}
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-5 h-fit">
                        <div className="bg-[#0b1315] p-8 rounded-[2rem] shadow-xl text-white relative overflow-hidden">
                            {/* Pattern overlay */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                            <h3 className="text-xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                                <Landmark className="w-5 h-5 text-emerald-500" />
                                Booking Summary
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Safari Tour</h4>
                                    <p className="font-bold text-lg text-white">{tourName}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex gap-3 items-center">
                                        <Calendar className="w-4 h-4 text-emerald-500" />
                                        <div>
                                            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Date</h4>
                                            <p className="text-xs font-bold">{date}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <Clock className="w-4 h-4 text-emerald-500" />
                                        <div>
                                            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Time Slot</h4>
                                            <p className="text-xs font-bold uppercase">{getTimeLabel(timeSlot)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-center">
                                    <Users className="w-4 h-4 text-emerald-500" />
                                    <div>
                                        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Guests</h4>
                                        <p className="text-xs font-bold">{guests} Person(s)</p>
                                    </div>
                                </div>

                                <div className="h-[1px] bg-white/10 w-full my-6" />

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-gray-400 text-sm font-medium">
                                        <span>Subtotal</span>
                                        <span className="text-white font-bold">${parseFloat(total).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-gray-400 text-sm font-medium">
                                        <span>Taxes & Service Charge</span>
                                        <span className="text-emerald-400 font-bold uppercase text-[10px]">Included</span>
                                    </div>

                                    <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                                        <span className="font-black text-xl uppercase tracking-tighter">Total Cost</span>
                                        <span className="font-black text-3xl text-emerald-400 tracking-tighter">${parseFloat(total).toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Deposit Notification */}
                                {paymentMethod === 'card' && (
                                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 mt-8">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Pay Only Deposit</span>
                                            <span className="text-white font-black text-2xl">${parseFloat(advance).toFixed(2)}</span>
                                        </div>
                                        <p className="text-[10px] text-gray-500 leading-normal">Remaining balance of ${(parseFloat(total) - parseFloat(advance)).toFixed(2)} will be settled on the day of the safari.</p>
                                    </div>
                                )}

                            </div>
                        </div>

                        {/* Help Box */}
                        <div className="mt-8 px-8">
                            <h4 className="text-xs font-bold text-[#0b1315] uppercase tracking-widest mb-2">Need Help?</h4>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                Feel free to contact our safari manager via WhatsApp if you need immediate assistance with your booking.
                                <br />
                                <span className="text-emerald-600 font-bold">+94 77 123 4567</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center">Loading...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}
