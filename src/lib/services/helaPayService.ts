import { Booking } from '@/types';

const BASE_URL = process.env.HELAPAY_BASE_URL || 'https://helapos.lk/merchant-api';
const APP_ID = process.env.HELAPAY_APP_ID || '';
const APP_SECRET = process.env.HELAPAY_APP_SECRET || '';
const BUSINESS_ID = process.env.HELAPAY_BUSINESS_ID || '';

export const helaPayService = {
    /**
     * Generates the Authorization Code (Base64 of AppID:AppSecret)
     */
    getAuthCode() {
        return Buffer.from(`${APP_ID}:${APP_SECRET}`).toString('base64');
    },

    /**
     * Retrieves an Access Token from HelaPay
     */
    async getAccessToken() {
        const authCode = this.getAuthCode();
        
        const response = await fetch(`${BASE_URL}/merchant/api/v1/getToken`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${authCode}`
            },
            body: JSON.stringify({ grant_type: 'client_credentials' })
        });

        const data = await response.json();
        
        if (data.code !== 200 || !data.accessToken) {
            throw new Error(data.message || 'Failed to get HelaPay access token');
        }

        return data.accessToken;
    },

    /**
     * Generates a Dynamic QR Code
     */
    async generateQR(amount: number, reference: string) {
        const token = await this.getAccessToken();

        const response = await fetch(`${BASE_URL}/merchant/api/helapos/qr/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                b: BUSINESS_ID,
                r: reference,
                am: amount
            })
        });

        const data = await response.json();

        if (data.statusCode !== "200" || !data.qr_data) {
            throw new Error(data.statusMessage || 'Failed to generate HelaPay QR');
        }

        return {
            qrData: data.qr_data,
            qrReference: data.qr_reference
        };
    },

    /**
     * Checks the status of a payment
     */
    async checkPaymentStatus(reference: string, qrReference?: string) {
        const token = await this.getAccessToken();

        const response = await fetch(`${BASE_URL}/merchant/api/helapos/sales/getSaleStatus`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                reference,
                qr_reference: qrReference
            })
        });

        const data = await response.json();

        // payment_status: 2 = Success, -1 = Failed, 0 = Pending
        if (data.statusCode === "200" && data.sale) {
            return {
                status: data.sale.payment_status,
                isSuccess: data.sale.payment_status === 2,
                amount: data.sale.amount,
                timestamp: data.sale.timestamp
            };
        }

        return {
            status: 0,
            isSuccess: false
        };
    }
};
