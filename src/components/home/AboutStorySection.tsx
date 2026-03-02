'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ElephantIcon } from '@/components/icons/ElephantIcon';

export default function AboutStorySection() {
    return (
        <section className="py-24 bg-white relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* Visual Side */}
                    <div className="relative group">
                        <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl z-20">
                            <Image
                                src="/img/img8.jpg"
                                alt="Elephant in wild"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                        </div>

                        {/* Decorative floating badge */}
                        <div className="absolute -bottom-8 -right-8 bg-emerald-500 text-white p-10 rounded-[2.5rem] shadow-2xl z-30 shadow-emerald-500/30 transform group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500">
                            <div className="text-5xl font-black mb-1">1,000+</div>
                            <div className="text-xs font-black uppercase tracking-widest leading-tight opacity-80">Elephants Recorded<br />in the Sanctuary</div>
                            <ElephantIcon className="w-12 h-12 opacity-20 absolute top-4 right-4" />
                        </div>

                        {/* Background color shape */}
                        <div className="absolute top-10 left-[-20%] w-[80%] aspect-square bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none z-10" />
                    </div>

                    {/* Text Side */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-emerald-500 font-bold tracking-[0.3em] uppercase text-xs mb-4">The Ethical Choice</h2>
                            <h3 className="text-5xl md:text-6xl font-black text-[#0b1315] uppercase tracking-tighter leading-[0.9] mb-10">
                                More Than Just <br />
                                A <span className="text-emerald-500 italic">Safari Tour</span>
                            </h3>
                            <p className="text-gray-500 font-medium leading-relaxed max-w-lg text-lg">
                                At Elefriends Sri Lanka, we believe in wildlife tourism that puts animals first. Our expert trackers understand the complex behavior of elephants, ensuring every encounter is respectful and safe.
                            </p>
                            <p className="text-gray-400 font-medium leading-relaxed max-w-lg mt-6">
                                We specialize in the "Great Gathering"—the largest seasonal meeting of Asian elephants in the world. Witness these magnificent creatures socialize, play, and survive in their natural habitat.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 pt-8">
                            <div className="border-l-4 border-emerald-500/20 pl-6 group">
                                <h4 className="text-[#0b1315] font-black uppercase text-sm mb-2 group-hover:text-emerald-500 transition-colors">Expert Trackers</h4>
                                <p className="text-gray-400 text-xs font-medium uppercase leading-relaxed">Lifelong local guides from the Habarana region.</p>
                            </div>
                            <div className="border-l-4 border-emerald-500/20 pl-6 group">
                                <h4 className="text-[#0b1315] font-black uppercase text-sm mb-2 group-hover:text-emerald-500 transition-colors">Sustainable</h4>
                                <p className="text-gray-400 text-xs font-medium uppercase leading-relaxed">Reduced noise pollution & zero plastic mandate.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
