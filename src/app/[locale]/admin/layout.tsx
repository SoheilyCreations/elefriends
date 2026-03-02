'use client';

import Sidebar from '@/components/admin/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex bg-[#0b1315] min-h-screen font-sans selection:bg-emerald-500/20">
            {/* Sidebar */}
            <Sidebar />

            <main className="flex-1 bg-white flex flex-col min-h-screen relative overflow-hidden">
                {/* Visual accents for Admin Content area */}
                <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-50 blur-[150px] opacity-20 pointer-events-none -mr-20 -mt-20 shrink-0" />

                <div className="flex-1 p-8 md:p-12 lg:p-16 relative z-10 max-w-7xl mx-auto w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
