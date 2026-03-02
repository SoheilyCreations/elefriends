'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Phone, Mail, Instagram, Facebook, Twitter, Leaf } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const t = useTranslations('Navigation');
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const pathSegments = pathname.split('/').filter(Boolean);
    const isLocaleOnly = pathSegments.length <= 1; // e.g. /en or /
    const isHeroPage = isLocaleOnly ||
        pathname.includes('/tours') ||
        pathname.includes('/destinations') ||
        pathname.includes('/packages') ||
        pathname.includes('/about') ||
        pathname.includes('/contact');
    const shouldBeWhite = scrolled || isHeroPage;

    return (
        <header className="fixed w-full z-50 top-0 left-0 flex flex-col">
            {/* Top Bar */}
            <div className={`w-full bg-[#0b1315] text-gray-400 text-xs px-4 md:px-8 flex justify-between items-center transition-all duration-300 overflow-hidden ${scrolled ? 'h-0 opacity-0 py-0 border-none' : 'h-10 opacity-100 py-2 border-b border-white/5'}`}>
                <div className="flex items-center gap-6">
                    <span className="text-emerald-400 font-bold tracking-widest uppercase text-[9px]">Ayubowan</span>
                    <span className="flex items-center gap-2"><Phone className="w-3 h-3" /> +94 112 345 678</span>
                    <span className="flex items-center gap-2"><Mail className="w-3 h-3" /> info@elefriends.com</span>
                </div>
                <div className="flex items-center gap-4 font-semibold text-gray-300">
                    <Link href="/en" className="hover:text-emerald-400">EN</Link>
                    <span className="text-gray-600">|</span>
                    <Link href="/de" className="hover:text-emerald-400">DE</Link>
                    <span className="text-gray-600">|</span>
                    <Link href="/fr" className="hover:text-emerald-400">FR</Link>
                </div>
            </div>

            {/* Main Nav */}
            <nav className={`w-full transition-all duration-300 ${scrolled ? 'bg-[#0b1315]/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="bg-emerald-500 p-2 rounded-xl transition-transform group-hover:scale-110">
                            <Leaf className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className={`text-xl font-black leading-none tracking-tight transition-colors duration-300 ${shouldBeWhite ? 'text-white' : 'text-[#0b1315]'}`}>ELEFRIENDS</span>
                            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest leading-none mt-1">Sri Lanka Safari</span>
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-8">
                        {['home', 'destinations', 'tours', 'about', 'contact'].map((item) => (
                            <Link
                                key={item}
                                href={item === 'home' ? '/' : `/${item}`}
                                className={`${shouldBeWhite ? 'text-white hover:text-emerald-400' : 'text-[#0b1315] hover:text-emerald-500'} text-xs font-bold uppercase transition-colors duration-300`}
                            >
                                {item === 'tours' ? 'Packages' : item}
                            </Link>
                        ))}
                    </div>

                    {/* Book Now Button */}
                    <div className="hidden lg:block">
                        <Link href="/tours" className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold uppercase py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                            Book Now
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className={`lg:hidden p-2 transition-colors ${shouldBeWhite ? 'text-white' : 'text-[#0b1315]'}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>
        </header>

    );
}
