import React, { useEffect, useState, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { MapPin, Calendar, X, Navigation } from 'lucide-react';

interface Station {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  total_slots: number;
  distance?: number;
}

interface Booking {
  id: string;
  station_id: string;
  start_time: string;
  end_time: string;
  status: string;
  stations: Station;
}

export default function Dashboard() {
  const { user } = useAuth();
  const mapRef = useRef<HTMLDivElement>(null);
  const [stations, setStations] = useState<Station[]>([]);
  const [nearbyStations, setNearbyStations] = useState<Station[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [view, setView] = useState<'map' | 'bookings'>('map');
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          updateNearbyStations(location);
        },
        () => {
          // Default to center of Maharashtra if location access denied
          setUserLocation({ lat: 19.7515, lng: 75.7139 });
          toast.error('Location access denied. Showing all stations.');
        }
      );
    }

    loadMap();
    loadBookings();
  }, []);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const updateNearbyStations = async (location: { lat: number; lng: number }) => {
    const { data: stationsData } = await supabase.from('stations').select('*');
    
    if (stationsData) {
      const stationsWithDistance = stationsData.map((station: Station) => ({
        ...station,
        distance: calculateDistance(
          location.lat,
          location.lng,
          station.latitude,
          station.longitude
        )
      }));

      // Sort by distance and get nearest 5 stations
      const nearest = [...stationsWithDistance]
        .sort((a, b) => (a.distance || 0) - (b.distance || 0))
        .slice(0, 5);

      setNearbyStations(nearest);
    }
  };

  const getDirections = async (station: Station) => {
    if (!userLocation) {
      toast.error('Please enable location access');
      return;
    }

    const loader = new Loader({
      apiKey: 'AIzaSyBWfqmSrIGDySE6fZ3j6b7AnL2zee0PRlc',
      version: 'weekly',
    });

    const google = await loader.load();
    const { DirectionsService } = await google.maps.importLibrary("routes") as google.maps.RoutesLibrary;

    if (!directionsRenderer) {
      const renderer = new google.maps.DirectionsRenderer({
        map: mapInstance,
        suppressMarkers: false,
      });
      setDirectionsRenderer(renderer);
    } else {
      directionsRenderer.setMap(mapInstance);
    }

    const directionsService = new DirectionsService();

    const request = {
      origin: userLocation,
      destination: { lat: station.latitude, lng: station.longitude },
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK && result) {
        directionsRenderer?.setDirections(result);
        
        // Open in Google Maps
        const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${station.latitude},${station.longitude}`;
        window.open(url, '_blank');
      } else {
        toast.error('Could not calculate directions');
      }
    });
  };

  const loadMap = async () => {
    const loader = new Loader({
      apiKey: 'AIzaSyBWfqmSrIGDySE6fZ3j6b7AnL2zee0PRlc',
      version: 'weekly',
    });

    const google = await loader.load();
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

    if (mapRef.current) {
      const map = new Map(mapRef.current, {
        center: userLocation || { lat: 19.7515, lng: 75.7139 }, // Center of Maharashtra
        zoom: userLocation ? 12 : 7,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      });

      setMapInstance(map);

      // Load stations and add markers
      const { data: stationsData } = await supabase
        .from('stations')
        .select('*');

      if (stationsData) {
        setStations(stationsData);
        stationsData.forEach((station: Station) => {
          const marker = new google.maps.Marker({
            position: { lat: station.latitude, lng: station.longitude },
            map,
            title: station.name,
            icon: {
              url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
            }
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div class="p-2">
                <h3 class="font-semibold">${station.name}</h3>
                <p class="text-sm">${station.address}</p>
                <p class="text-sm mt-1">Available slots: ${station.total_slots}</p>
              </div>
            `
          });

          marker.addListener('click', () => {
            setSelectedStation(station);
            infoWindow.open(map, marker);
          });
        });
      }

      // Add user location marker if available
      if (userLocation) {
        new google.maps.Marker({
          position: userLocation,
          map,
          title: 'Your Location',
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }
        });
      }
    }
  };

  const loadBookings = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, stations(*)')
      .eq('user_id', user?.id)
      .order('start_time', { ascending: false });

    if (error) {
      toast.error('Error loading bookings');
    } else {
      setBookings(data || []);
    }
  };

  const handleBooking = async () => {
    if (!selectedStation || !bookingDate || !bookingTime) {
      toast.error('Please select a station and booking time');
      return;
    }

    setLoading(true);
    const startTime = new Date(`${bookingDate}T${bookingTime}`);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour slot

    try {
      const { error } = await supabase
        .from('bookings')
        .insert({
          user_id: user?.id,
          station_id: selectedStation.id,
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
          status: 'confirmed',
        });

      if (error) throw error;

      toast.success('Booking confirmed!');
      loadBookings();
      setSelectedStation(null);
      setBookingDate('');
      setBookingTime('');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    setCancellingId(bookingId);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId);

      if (error) throw error;
      toast.success('Booking cancelled successfully');
      loadBookings();
    } catch (error: any) {
      toast.error('Error cancelling booking');
    } finally {
      setCancellingId(null);
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* View Toggle */}
        <div className="mb-6 flex justify-center space-x-4">
          <button
            onClick={() => setView('map')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              view === 'map'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <MapPin className="h-5 w-5" />
            <span>Find Stations</span>
          </button>
          <button
            onClick={() => setView('bookings')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              view === 'bookings'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Calendar className="h-5 w-5" />
            <span>My Bookings</span>
          </button>
        </div>

        {view === 'map' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Find Charging Stations</h2>
              <div ref={mapRef} className="w-full h-[500px] rounded-lg"></div>
            </div>

            {/* Nearby Stations and Booking Form */}
            <div className="space-y-6">
              {/* Nearby Stations */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Nearby Stations</h3>
                <div className="space-y-4">
                  {nearbyStations.map((station) => (
                    <div
                      key={station.id}
                      className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{station.name}</p>
                          <p className="text-sm text-gray-600">{station.address}</p>
                          <p className="text-sm text-green-600 mt-1">
                            {station.distance?.toFixed(1)} km away
                          </p>
                        </div>
                        <button
                          onClick={() => getDirections(station)}
                          className="text-green-600 hover:text-green-700 p-2"
                          title="Get Directions"
                        >
                          <Navigation className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Form */}
              {selectedStation && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Book a Charging Slot</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">{selectedStation.name}</p>
                      <p className="text-gray-600">{selectedStation.address}</p>
                      <p className="text-sm text-green-600 mt-1">
                        {selectedStation.total_slots} charging slots available
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Time</label>
                        <input
                          type="time"
                          value={bookingTime}
                          onChange={(e) => setBookingTime(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleBooking}
                      disabled={loading}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                      {loading ? 'Booking...' : 'Book Slot'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Your Bookings</h2>
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{booking.stations.name}</p>
                      <p className="text-sm text-gray-600">{booking.stations.address}</p>
                      <div className="mt-2 space-y-1 text-sm">
                        <p>
                          <span className="text-gray-500">Start:</span>{' '}
                          {formatDateTime(booking.start_time)}
                        </p>
                        <p>
                          <span className="text-gray-500">End:</span>{' '}
                          {formatDateTime(booking.end_time)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`capitalize px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          disabled={cancellingId === booking.id}
                          className="text-red-600 hover:text-red-700 focus:outline-none"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {bookings.length === 0 && (
                <p className="text-gray-500 text-center py-8">No bookings yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}