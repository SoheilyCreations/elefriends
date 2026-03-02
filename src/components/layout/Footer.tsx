import { Leaf, MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#0b1315] text-white pt-20 pb-8 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Column 1: Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="bg-emerald-500 p-2 rounded-xl">
                                <Leaf className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-black text-white leading-none tracking-tight">ELEFRIENDS</span>
                                <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest leading-none mt-1">Sri Lanka Safari</span>
                            </div>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed pr-4">
                            Discover the untamed wildlife of Sri Lanka. We provide ethical, immersive, and expert-guided wildlife safaris that connect you with nature's most majestic creatures.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 transition-colors text-white">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 transition-colors text-white">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 transition-colors text-white">
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">About Our Mission</Link></li>
                            <li><Link href="/destinations" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">National Parks</Link></li>
                            <li><Link href="/tours" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">Safari Packages</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">Get In Touch</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Destinations */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Destinations</h4>
                        <ul className="space-y-4">
                            <li><Link href="/destinations/minneriya" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">Minneriya Park</Link></li>
                            <li><Link href="/destinations/kaudulla" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">Kaudulla Park</Link></li>
                            <li><Link href="/destinations/hurulu" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">Eco Hurulu Park</Link></li>
                            <li><Link href="/destinations/habarana" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">Village Tours</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Contact</h4>
                        <ul className="space-y-5">
                            <li className="flex gap-4 items-start text-gray-400 text-sm group">
                                <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                <span>Main Road, Habarana, North Central Province, Sri Lanka</span>
                            </li>
                            <li className="flex gap-4 items-center text-gray-400 text-sm group">
                                <Phone className="w-5 h-5 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" />
                                <span>+94 112 345 678</span>
                            </li>
                            <li className="flex gap-4 items-center text-gray-400 text-sm group">
                                <Mail className="w-5 h-5 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" />
                                <span>info@elefriends.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} ELEFRIENDS SRI LANKA. All Rights Reserved.</p>
                    <div className="flex gap-6 font-medium">
                        <Link href="/privacy" className="hover:text-white transition-colors">PRIVACY</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">TERMS</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
