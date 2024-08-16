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

  const handleSubmission = async () => {
    if (!depotLocation) return;

    const data = {
      num_locations: destinations.length,
      num_vehicles: numVehicles,
      locations: destinations.map((loc) => loc.center),
      depot: depotLocation.center,
    };

    const response = await getRoutes({ data });
    if (response.status === 200) {
      const hof = response.data.hof;
      let newRoutes = [];
      for (let lo = 0; lo < numVehicles; lo++) {
        let prev = depotLocation.center;
        let route = [];
        let i = lo;
        while (i < hof.length) {
          route.push([prev, destinations[hof[i]].center]);
          prev = destinations[hof[i]].center;
          i += numVehicles;
        }
        route.push([prev, depotLocation.center]);
        newRoutes.push(route);
      }
      setRoutes(newRoutes);
    } else if (response.status === 401) {
      router.push("/login");
    }
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
                Generate Routes
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
    </div>
  );
};

export default SearchAndMapLayout;
