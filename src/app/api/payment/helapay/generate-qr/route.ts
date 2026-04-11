import { NextResponse } from 'next/server';
import { helaPayService } from '@/lib/services/helaPayService';

export async function POST(req: Request) {
    try {
        const { amount, reference } = await req.json();

        if (!amount || !reference) {
            return NextResponse.json({ error: 'Missing amount or reference' }, { status: 400 });
        }

        const data = await helaPayService.generateQR(amount, reference);
        
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('HelaPay QR Generation Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
