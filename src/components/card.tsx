// src/components/LocationCard.tsx
import React from 'react';

interface LocationCardProps {
  location: any;
  onDelete: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, onDelete }) => {
  const [longitude, latitude] = location.center;
  const Name = location.place_name.split(',')[0];

  return (
    <div className="border p-4 rounded-md shadow-md mb-2 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{Name}</h3>
        <p>Latitude: {latitude.toFixed(4)}</p>
        <p>Longitude: {longitude.toFixed(4)}</p>
      </div>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default LocationCard;
