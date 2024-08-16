// src/components/LocationCard.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, MapPin } from "lucide-react";

export default function LocationCard({
  location,
  onDelete,
  onEdit,
  isDepot = false,
}: {
  location: any;
  onDelete: () => void;
  onEdit: () => void;
  isDepot?: boolean;
}) {
  const [longitude, latitude] = location.center;
  const name = location.place_name.split(",")[0];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 mb-2 flex items-center justify-between transition-all hover:shadow-md">
      <div className="flex items-center space-x-3">
        <div
          className={`p-2 rounded-full ${
            isDepot
              ? "bg-blue-100 text-blue-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          <MapPin className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {isDepot ? "Depot: " : ""}
            {name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {latitude.toFixed(4)}, {longitude.toFixed(4)}
          </p>
        </div>
      </div>
      <div className="flex space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <Edit2 className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
