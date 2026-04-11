import { NextResponse } from 'next/server';
import { helaPayService } from '@/lib/services/helaPayService';

export async function POST(req: Request) {
    try {
        const { reference, qrReference } = await req.json();

        if (!reference) {
            return NextResponse.json({ error: 'Missing reference' }, { status: 400 });
        }

        const data = await helaPayService.checkPaymentStatus(reference, qrReference);
        
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('HelaPay Status Check Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
