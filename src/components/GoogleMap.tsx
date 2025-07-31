import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapProps {
  apiKey: string;
  center: { lat: number; lng: number };
  zoom?: number;
  className?: string;
}

const GoogleMap = ({ apiKey, center, zoom = 15, className = "h-96 w-full" }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: apiKey,
      version: 'weekly',
      libraries: ['places']
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: center,
          zoom: zoom,
          styles: [
            {
              featureType: 'poi.medical',
              elementType: 'labels',
              stylers: [{ visibility: 'on' }]
            }
          ]
        });

        // Add marker for Kaler Scan Centre
        new google.maps.Marker({
          position: center,
          map: map,
          title: 'Kaler Scan Centre',
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#173781" stroke="#ffffff" stroke-width="2"/>
                <text x="20" y="25" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="12" font-weight="bold">KSC</text>
              </svg>
            `),
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(20, 20)
          }
        });

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; max-width: 200px;">
              <h3 style="margin: 0 0 5px 0; color: #173781; font-weight: bold;">Kaler Scan Centre</h3>
              <p style="margin: 0 0 5px 0; font-size: 14px;">Near City Hospital</p>
              <p style="margin: 0 0 5px 0; font-size: 14px;">Salaichan Road, Shahkot-144702</p>
              <p style="margin: 0; font-size: 14px;">Jalandhar, Punjab, India</p>
            </div>
          `
        });

        // Show info window on marker click
        map.addListener('click', () => {
          infoWindow.open(map, new google.maps.Marker({
            position: center,
            map: map
          }));
        });
      }
    }).catch((error) => {
      console.error('Error loading Google Maps:', error);
    });
  }, [apiKey, center, zoom]);

  return (
    <div 
      ref={mapRef} 
      className={className}
      style={{ borderRadius: '8px' }}
    />
  );
};

export default GoogleMap; 