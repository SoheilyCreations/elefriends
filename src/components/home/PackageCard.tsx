'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { useState } from 'react';
import BookingModal from '@/components/booking/BookingModal';

interface PackageCardProps {
    id: string;
    title: string;
    subtitle: string;
    duration: string;
    price: number;
    image: string;
}

export default function PackageCard({ id, title, subtitle, duration, price, image }: PackageCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-[2rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-300 group flex flex-col relative"
            >
                {/* Full card clickable link */}
                <Link href={`/tours/${id}`} className="absolute inset-0 z-0" aria-label={`View details for ${title}`} />

                <div className="relative aspect-[4/3] w-full overflow-hidden z-10 pointer-events-none">
                    {image ? (
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover object-[50%_65%] transform group-hover:scale-105 transition-transform duration-700 ease-out"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full bg-slate-200" />
                    )}

                    {/* Dark Pill Badge for Price */}
                    <div className="absolute top-4 right-4 bg-[#0b1315] text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                        ${price}
                    </div>
                </div>

                <div className="p-8 flex flex-col flex-grow pointer-events-none z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-4 h-4 text-emerald-500" />
                        <span className="text-emerald-500 font-bold text-xs tracking-wider uppercase">{duration}</span>
                    </div>

                    <h3 className="text-xl font-black text-[#0b1315] mb-2 uppercase leading-tight">{title}</h3>
                    <p className="text-sm font-medium text-gray-500 mb-8 flex-grow leading-relaxed">
                        {subtitle}
                    </p>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-auto relative z-20 pointer-events-auto">
                        <Link href={`/tours/${id}`} className="text-[#0b1315] font-bold text-xs uppercase tracking-wider hover:text-emerald-500 transition-colors">
                            Details
                        </Link>
                        <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsModalOpen(true); }}
                            className="bg-emerald-500 hover:bg-emerald-400 text-[#0b1315] font-black text-[10px] uppercase tracking-[0.2em] py-4 px-8 rounded-2xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </motion.div>

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                packageId={id}
                packageTitle={title}
                packagePrice={price}
                packageImage={image}
            />
        </>
    );
}
