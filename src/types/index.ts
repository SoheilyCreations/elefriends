export interface Destination {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    images?: string[];
    slug: string;
    display_order?: number;
    insight_window_value?: string;
    insight_window_desc?: string;
    insight_climate_value?: string;
    insight_climate_desc?: string;
    insight_logistics_value?: string;
    insight_logistics_desc?: string;
    insight_geography_value?: string;
    insight_geography_desc?: string;
    created_at: string;
}

export interface Tour {
    id: string;
    destination_id?: string;
    title: string;
    description: string;
    price: number;
    duration: string;
    max_guests: number;
    location: string;
    highlights: string[];
    itinerary: { day: number; title: string; activities: string[] }[];
    images: string[];
    is_active: boolean;
    created_at: string;
}

export interface Booking {
    id: string;
    tour_id: string;
    guest_name: string;
    guest_email: string;
    guest_phone: string;
    travel_date: string;
    pax: number;
    total_price: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    payment_status: 'unpaid' | 'paid' | 'refunded';
    notes?: string;
    created_at: string;
}

export interface Review {
    id: string;
    tour_id: string;
    user_name: string;
    rating: number;
    comment: string;
    created_at: string;
}
