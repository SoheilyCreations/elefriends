import { supabase } from '../supabase/client';
import { Tour } from '@/types';

export const tourService = {
    async getAllTours() {
        const { data, error } = await supabase
            .from('tours')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Tour[];
    },

    async getToursByDestination(destinationId: string) {
        const { data, error } = await supabase
            .from('tours')
            .select('*')
            .eq('destination_id', destinationId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Tour[];
    },

    async getTourById(id: string) {
        const { data, error } = await supabase
            .from('tours')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data as Tour;
    },

    async createTour(tour: Omit<Tour, 'id' | 'created_at'>) {
        const { data, error } = await supabase
            .from('tours')
            .insert([tour])
            .select()
            .single();

        if (error) throw error;
        return data as Tour;
    },

    async updateTour(id: string, updates: Partial<Tour>) {
        const { data, error } = await supabase
            .from('tours')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data as Tour;
    },

    async deleteTour(id: string) {
        const { error } = await supabase
            .from('tours')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    },

    async uploadImage(file: File) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `tours/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('tour-images')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
            .from('tour-images')
            .getPublicUrl(filePath);

        return data.publicUrl;
    }
};
