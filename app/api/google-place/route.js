import { NextResponse } from "next/server";

const BASE_URL = "https://maps.googleapis.com/maps/api/place";
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const radius = searchParams.get("radius");
        const lat = searchParams.get("lat");
        const lng = searchParams.get("lng");

        const url = `${BASE_URL}/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${category}&key=${GOOGLE_API_KEY}`;
        
        console.log('Request URL:', url);

        const res = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        console.log('API Response:', data);

        return NextResponse.json({ product: data });
    } catch (error) {
        console.error('Error fetching Google Places:', error);
        return NextResponse.json({ error: 'Failed to fetch Google Places' }, { status: 500 });
    }
}