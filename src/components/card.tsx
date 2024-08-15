// src/components/LocationCard.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';

interface LocationCardProps {
  location: any;
  onDelete: () => void;
  onEdit: () => void;
  isDepot?: boolean;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, onDelete, onEdit, isDepot = false }) => {
  const [longitude, latitude] = location.center;
  const Name = location.place_name.split(',')[0];

  return (
    <div className="border p-4 rounded-md shadow-md mb-2 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{isDepot ? 'Depot: ' : ''}{Name}</h3>
        <p>Latitude: {latitude.toFixed(4)}</p>
        <p>Longitude: {longitude.toFixed(4)}</p>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button variant="destructive" size="sm" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default LocationCard;