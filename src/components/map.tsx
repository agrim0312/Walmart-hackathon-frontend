"use client";
import React, { useEffect, useRef } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Location {
  center: [number, number];
}

interface MyMapProps {
  selectedLocations: Location[];
}

const MyMap :React.FC<MyMapProps> = ( {selectedLocations}) => {
  const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWdyaW0wMzEyIiwiYSI6ImNscW01eDYweDAyNWwya213cGR2Z2JyZmkifQ.VhMNA0js_M-_c9P3bMmqrw'; // Replace with your Mapbox access token

  const mapRef = useRef<any>(null);

  useEffect(() => {
    console.log('Selected locations:', selectedLocations.length, mapRef);
    if (selectedLocations.length > 0) {
      const lastLocation = selectedLocations[selectedLocations.length - 1];
      console.log("LAST LOCATION-------------><><><><><><>-------------------------",lastLocation);
      if (lastLocation && lastLocation.center && lastLocation.center.length === 2) {
        const [longitude, latitude] = lastLocation.center;
        mapRef.current.flyTo({
          center: [longitude, latitude],
          zoom: 14,
          essential: true,
        });
      }
    }
  }, [selectedLocations]);

  return (
    <Map
    ref={mapRef}
      initialViewState={{
        latitude: 37.7749,
        longitude: -122.4194,
        zoom: 10
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <NavigationControl position="top-right" />
      {selectedLocations.length > 0 && selectedLocations.map((location:any, index:any) => (
        location.center && location.center.length === 2 && (
          <Marker
            key={index}
            latitude={location.center[1]}
            longitude={location.center[0]}
            color="red"
          />
        )
      ))}
    </Map>
  );
};

export default MyMap;
