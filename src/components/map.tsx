"use client";
import React, { useEffect, useRef } from "react";
import Map, { Layer, Marker, NavigationControl, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface Location {
  center: [number, number];
}

interface Route {
  coordinates: [[number, number], [number, number]][];
  color: string;
}

function getRandomColor() {
  const predefinedColors = [
    "#FF5733", // Red-Orange
    "#33FF57", // Green
    "#3357FF", // Blue
    "#FF33A8", // Pink
    "#FFC300", // Yellow
    "#33FFF6", // Cyan
    "#8E44AD", // Purple
    "#E74C3C", // Red
    "#2ECC71", // Green
    "#3498DB", // Light Blue
  ];

  const randomIndex = Math.floor(Math.random() * predefinedColors.length);
  return predefinedColors[randomIndex];
}

export default function MyMap({
  selectedLocations,
  routes,
}: {
  selectedLocations: Location[];
  routes: Route[];
}) {
  const MAPBOX_TOKEN =
    "pk.eyJ1IjoiYWdyaW0wMzEyIiwiYSI6ImNscW01eDYweDAyNWwya213cGR2Z2JyZmkifQ.VhMNA0js_M-_c9P3bMmqrw"; // Replace with your Mapbox access token

  const mapRef = useRef<any>(null);
  useEffect(() => {
    console.log("Selected locations:", selectedLocations.length, mapRef);
    if (selectedLocations.length > 0) {
      const lastLocation = selectedLocations[selectedLocations.length - 1];
      console.log("LAST LOCATION-------------><><><><><><>-------------------------",lastLocation);
      if (lastLocation && lastLocation.center && lastLocation.center.length === 2) {
        const [longitude, latitude] = lastLocation.center;
        mapRef.current.flyTo({
          center: [longitude, latitude],
          zoom: 10,
          essential: true,
        });
      }
    }
  }, [selectedLocations]);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        latitude: 31.3069,
        longitude: 75.5793,
        zoom: 10,
      }}
      style={{ width: "100%", height: "90%" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <NavigationControl position="top-right" />
      {/* Plot the routes on the map */}

      {routes.map((route: any, index: number) => (
        <Source
          key={index}
          id={`route-${index}`}
          type="geojson"
          data={{
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: route,
            },
          }}
        >
          <Layer
            {...{
              id: `route-${index}`,
              type: "line",
              source: `route-${index}`,
              layout: {
                "line-join": "round",
                "line-cap": "round",
              },
              paint: {
                "line-color": getRandomColor(),
                "line-width": 5,
              },
            }}
          />
        </Source>
      ))}

      {selectedLocations.length > 0 &&
        selectedLocations.map(
          (location: any, index: any) =>
            location.center &&
            location.center.length === 2 && (
              <Marker
                key={index}
                latitude={location.center[1]}
                longitude={location.center[0]}
                color={location.isDepot ? "#2563eb" : "#16a34a"}
                />
            )
        )}
    </Map>
  );
}



