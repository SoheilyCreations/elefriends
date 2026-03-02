import { supabase } from '../supabase/client';
import { Destination } from '@/types';

export const destinationService = {
    async getAllDestinations() {
        const { data, error } = await supabase
            .from('destinations')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) throw error;
        return data as Destination[];
    },

    async getDestinationBySlug(slug: string) {
        const { data, error } = await supabase
            .from('destinations')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) throw error;
        return data as Destination;
    },

    async createDestination(destination: Omit<Destination, 'id' | 'created_at'>) {
        const { data, error } = await supabase
            .from('destinations')
            .insert([destination])
            .select()
            .single();

        if (error) throw error;
        return data as Destination;
    },

    async updateDestination(id: string, updates: Partial<Destination>) {
        const { data, error } = await supabase
            .from('destinations')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data as Destination;
    },

    async uploadImage(file: File) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `destinations/${fileName}`;

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
