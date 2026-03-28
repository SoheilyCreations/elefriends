import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'ELEFRIENDS Safari',
    description: 'Premium Safari Tour Bookings in Sri Lanka',
};

export default async function RootLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={`${inter.className} min-h-screen flex flex-col antialiased bg-[#f0f2f5]`}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <SmoothScrollProvider>
                        {children}
                    </SmoothScrollProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
