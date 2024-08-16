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

import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const AutocompleteSearchBox = ({
  onSelect,
}: {
  onSelect: (location: any) => void;
}) => {
  const geocoderContainerRef = useRef<HTMLDivElement | null>(null);
  const mapboxToken =
    "pk.eyJ1IjoiYWdyaW0wMzEyIiwiYSI6ImNscW01eDYweDAyNWwya213cGR2Z2JyZmkifQ.VhMNA0js_M-_c9P3bMmqrw"; // Replace with your Mapbox access token

  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxToken,
      placeholder: "Search for locations...",
      marker: false, // Disable default marker
    });

    if (geocoderContainerRef.current) {
      geocoder.addTo(geocoderContainerRef.current);
    }

    geocoder.on("result", (event) => {
      const { result } = event;
      if (result && onSelect) {
        onSelect(result);
      }
    });

    return () => {
      geocoder.off("result", () => {});
      geocoder.onRemove();
    };
  }, [onSelect, mapboxToken]);

  return (
    <div className="relative w-full">
      <div
        ref={geocoderContainerRef}
        className="autocomplete-search-box w-full z-10 self-center  mb-2"
      />
      <style jsx global>{`
        .mapboxgl-ctrl-geocoder {
          width: 100%;
          max-width: 100%;
          font-size: 15px;
          line-height: 20px;
          background-color: white;
          box-shadow: none;
          position: relative;
          z-index: 1;
        }
        .mapboxgl-ctrl-geocoder--input {
          height: 36px;
          padding: 6px 35px 6px 32px !important;
          border-radius: 4px;
          border: 1px solid #ccc;
          background-color: white;
          position: relative;
          z-index: 2;
        }
        .mapboxgl-ctrl-geocoder--input:focus {
          outline: none;
          border-color: #4299e1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
        }
        .mapboxgl-ctrl-geocoder .suggestions {
          background-color: white;
          border: 1px solid #ccc;
          border-top: none;
          top: 100%;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: absolute;
          z-index: 3;
          width: 100%;
        }
        .mapboxgl-ctrl-geocoder .suggestions > li > a {
          padding: 6px 12px;
          font-size: 14px;
        }
        .mapboxgl-ctrl-geocoder .suggestions > .active > a,
        .mapboxgl-ctrl-geocoder .suggestions > li > a:hover {
          background-color: #f0f0f0;
        }
        .mapboxgl-ctrl-geocoder--icon-search {
          top: 8px;
          left: 8px;
          z-index: 3;
        }
        .mapboxgl-ctrl-geocoder--button {
          background-color: transparent;
          z-index: 3;
        }
      `}</style>
    </div>
  );
};

export default AutocompleteSearchBox;
