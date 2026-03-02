import { supabase } from '../supabase/client';
import { Booking } from '@/types';

export const bookingService = {
    async getAllBookings() {
        const { data, error } = await supabase
            .from('bookings')
            .select('*, tours(title)')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Booking[];
    },

    async getBookingById(id: string) {
        const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data as Booking;
    },

    async createBooking(booking: Omit<Booking, 'id' | 'created_at'>) {
        const { data, error } = await supabase
            .from('bookings')
            .insert([booking])
            .select()
            .single();

        if (error) throw error;
        return data as Booking;
    },

    async updateBookingStatus(id: string, status: Booking['status']) {
        const { data, error } = await supabase
            .from('bookings')
            .update({ status })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data as Booking;
    },

    async updateBooking(id: string, updates: Partial<Booking>) {
        const { data, error } = await supabase
            .from('bookings')
            .update(updates)
            .eq('id', id)
            .select('*, tours(title)')
            .single();

        if (error) throw error;
        return data as Booking;
    },

    async updatePaymentStatus(id: string, payment_status: Booking['payment_status']) {
        const { data, error } = await supabase
            .from('bookings')
            .update({ payment_status })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data as Booking;
    },

    async deleteBooking(id: string) {
        const { error } = await supabase
            .from('bookings')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    }
};
