// import React, { useRef, useEffect } from 'react';
// import mapboxgl from 'mapbox-gl';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

// const AutocompleteSearchBox = ({ onSelect }:{
//     onSelect: (location: any) => void;
// }) => {
//   const geocoderContainerRef = useRef(null);
//   const mapboxToken = 'pk.eyJ1IjoiYWdyaW0wMzEyIiwiYSI6ImNscW01eDYweDAyNWwya213cGR2Z2JyZmkifQ.VhMNA0js_M-_c9P3bMmqrw'; // Replace with your Mapbox access token

//   useEffect(() => {
//     const geocoder = new MapboxGeocoder({
//       accessToken: mapboxToken,
//       placeholder: 'Search for locations...',
//       marker: false, // Disable default marker
//     });
  
//     if (geocoderContainerRef.current) {
//       geocoder.addTo(geocoderContainerRef.current);
//     }
  
//     geocoder.on('result', (event) => {
//       const { result } = event;
//       if (onSelect) {
//         onSelect(result);
//       }
//     });
  
//     return () => {
//       geocoder.off('result', (event) => {
//         // handle the event here
//         console.log('Event:', event);
//       });
//       geocoder.onRemove();
//     };
//   }, [onSelect]);

//   return <div ref={geocoderContainerRef} className="autocomplete-search-box" />;
// };

// export default AutocompleteSearchBox;


import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const AutocompleteSearchBox = ({ onSelect }: { onSelect: (location: any) => void }) => {
  const geocoderContainerRef = useRef<HTMLDivElement | null>(null);
  const mapboxToken = 'pk.eyJ1IjoiYWdyaW0wMzEyIiwiYSI6ImNscW01eDYweDAyNWwya213cGR2Z2JyZmkifQ.VhMNA0js_M-_c9P3bMmqrw'; // Replace with your Mapbox access token

  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxToken,
      placeholder: 'Search for locations...',
      marker: false, // Disable default marker
    });

    if (geocoderContainerRef.current) {
      geocoder.addTo(geocoderContainerRef.current);
    }

    geocoder.on('result', (event) => {
      const { result } = event;
      if (result && onSelect) {
        onSelect(result);
      }
    });

    return () => {
      geocoder.off('result', () => {});
      geocoder.onRemove();
    };
  }, [onSelect, mapboxToken]);

  return <div ref={geocoderContainerRef} className="autocomplete-search-box self-center mb-2" />;
};

export default AutocompleteSearchBox;
