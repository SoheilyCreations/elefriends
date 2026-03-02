export interface Destination {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    slug: string;
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
