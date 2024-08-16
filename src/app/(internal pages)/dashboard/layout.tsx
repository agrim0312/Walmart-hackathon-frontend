"use client";
import getRoutes from "@/api/getRoutes";
import LocationCard from "@/components/card";
import MyMap from "@/components/map";
import AutocompleteSearchBox from "@/components/locationSearchBar";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import getDirections from "@/api/getDirections";
import Spinner from "@/components/ui/spinner";
import toast, { Toaster } from "react-hot-toast";

interface Location {
  center: [number, number];
  place_name: string;
}

const SearchAndMapLayout = () => {
  const [destinations, setDestinations] = useState<Location[]>([]);
  const [depotLocation, setDepotLocation] = useState<Location | null>(null);
  const [numVehicles, setNumVehicles] = useState<number>(0);
  const [routes, setRoutes] = useState<any[]>([]);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSelectDepot = (location: Location) => {
    setDepotLocation(location);
  };

  const handleSelectDestination = (location: Location) => {
    setDestinations((prev) => [...prev, location]);
  };

  const handleDeleteDestination = (index: number) => {
    setDestinations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = (newLocation: Location) => {
    if (editingLocation === depotLocation) {
      setDepotLocation(newLocation);
    } else {
      setDestinations((prev) =>
        prev.map((loc) => (loc === editingLocation ? newLocation : loc))
      );
    }
    setIsEditDialogOpen(false);
  };

  const fetchRouteForVehicle = async (vehicleIndex: number, hof: number[], locations: [number, number][], depot: [number, number]) => {
    const segments = [];
    let prev = depot;
    let i = vehicleIndex;
    while (i < hof.length) {
        const start = prev;
        const end = locations[hof[i]];
        const segment = await getDirections([start, end]);  // Use getRoute to fetch each segment
        segments.push(...segment);
        prev = end;
        i += numVehicles;
    }
    const lastSegment = await getDirections([prev, depot]);  // Fetch route back to the depot
    segments.push(...lastSegment);
    return segments;
};

  const handleSubmission = async () => {
    if (!depotLocation) return;

    setIsLoading(true);
    const data = {
      num_locations: destinations.length,
      num_vehicles: numVehicles,
      locations: destinations.map((loc) => loc.center),
      depot: depotLocation.center,
    };

    const response = await getRoutes({ data });
    if (response.status === 200) {
      const hof = response.data.hof;
      const fetchedRoutes = await Promise.all(
        hof.map((_:any, index:number) => fetchRouteForVehicle(index, hof, data.locations, data.depot))
      );
      toast.success("Routes plotted successfully");
      setRoutes(fetchedRoutes);

    } else if (response.status === 401) {
      router.push("/login");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="grid grid-cols-3 h-screen gap-4 p-4 bg-gray-100">
      <div className="col-span-1 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Route Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="num-vehicles" className="text-sm font-medium">
                  Number of Transport Vehicles
                </label>
                <Input
                  id="num-vehicles"
                  type="number"
                  value={numVehicles}
                  onChange={(e) => setNumVehicles(parseInt(e.target.value))}
                />
              </div>
              {!depotLocation && (
                <div className="text-sm font-medium">
                  Depot Location
                  <AutocompleteSearchBox onSelect={handleSelectDepot} />
                </div>
              )}
              {depotLocation && (
                <div className="text-sm font-medium">
                  Add Destination
                  <AutocompleteSearchBox onSelect={handleSelectDestination} />
                </div>
              )}
              <Button onClick={handleSubmission} className="w-full">
              {isLoading ? <Spinner size="sm" /> : "Generate Routes"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="max-h-[370px] overflow-y-auto">
          <CardHeader>
            <CardTitle>Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {depotLocation && (
                <div>
                  <h3 className="font-medium">Depot Location</h3>
                  <LocationCard
                    location={depotLocation}
                    onDelete={() => setDepotLocation(null)}
                    onEdit={() => handleEditLocation(depotLocation)}
                    isDepot
                  />
                </div>
              )}
              <Separator />
              <div className="space-y-2  ">
                <h3 className="font-medium">
                  Destinations ({destinations.length})
                </h3>
                {destinations.map((location, index) => (
                  <LocationCard
                    key={index}
                    location={location}
                    onDelete={() => handleDeleteDestination(index)}
                    onEdit={() => handleEditLocation(location)}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Route Map</CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-5rem)]">
            <MyMap
              selectedLocations={[
                ...(depotLocation ? [depotLocation] : []),
                ...destinations,
              ]}
              routes={routes}
            />
          </CardContent>
        </Card>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Location</DialogTitle>
          </DialogHeader>
          <AutocompleteSearchBox
            onSelect={(location) => {
              handleSaveEdit(location);
              setIsEditDialogOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
};

export default SearchAndMapLayout;
