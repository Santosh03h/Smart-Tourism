import { useState, useEffect } from 'react';

export const useGeolocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: 28.6139, lng: 77.2090 }, // Demo default: Delhi
    address: 'Connaught Place, New Delhi',
    isLive: false,
    error: null,
  });

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setLocation(prev => ({
        ...prev,
        loaded: true,
        isLive: false,
        error: 'Geolocation is not supported by your browser. Using DEMO location.'
      }));
      return;
    }

    const onSuccess = (position) => {
      setLocation({
        loaded: true,
        coordinates: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        address: `${position.coords.latitude.toFixed(4)}° N, ${position.coords.longitude.toFixed(4)}° E`,
        isLive: true,
        error: null,
      });
    };

    const onError = (error) => {
      setLocation({
        loaded: true,
        coordinates: { lat: 28.6139, lng: 77.2090 },
        address: 'Connaught Place, New Delhi (Demo Location)',
        isLive: false,
        error: 'Location access denied or unavailable. Showing DEMO location.',
      });
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    });
  }, []);

  return location;
};
