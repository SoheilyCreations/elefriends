'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, CalendarDays, MapPin, Settings, LogOut, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
    { name: 'Overview', path: '/admin', icon: <LayoutDashboard size={18} /> },
    { name: 'Safari Tours', path: '/admin/tours', icon: <Package size={18} /> },
    { name: 'Destinations', path: '/admin/destinations', icon: <MapPin size={18} /> },
    { name: 'Bookings', path: '/admin/bookings', icon: <CalendarDays size={18} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={18} /> },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-screen bg-[#0b1315] border-r border-white/5 flex flex-col p-6 sticky top-0 overflow-y-auto">
            {/* Branding */}
            <div className="flex items-center gap-3 mb-10 px-2 font-black text-white text-xl tracking-tighter italic">
                ELEFRIENDS <span className="text-emerald-500 font-bold not-italic text-[10px] uppercase tracking-widest mt-1">Admin</span>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname.endsWith(item.path);
                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${isActive
                                ? 'bg-emerald-500 text-[#0b1315]'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                {item.icon}
                                <span className="text-xs font-black uppercase tracking-widest leading-none mt-0.5">{item.name}</span>
                            </div>
                            {isActive && <ChevronRight size={14} />}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout button */}
            <button className="mt-10 flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all">
                <LogOut size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Logout</span>
            </button>
        </aside>
    );
}
