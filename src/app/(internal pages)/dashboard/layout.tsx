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
import Navbar from "@/components/Navbar";

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
    if (
      depotLocation &&
      location.center[0] === depotLocation.center[0] &&
      location.center[1] === depotLocation.center[1]
    ) {
      toast.error("Depot location cannot be added as a destination");
      return;
    }

    const isDuplicate = destinations.some(
      (dest) =>
        dest.center[0] === location.center[0] &&
        dest.center[1] === location.center[1]
    );

    if (isDuplicate) {
      toast.error("This location is already added as a destination");
      return;
    }

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
      // Check if new location matches any destination
      const isDuplicateDestination = destinations.some(
        (dest) =>
          dest.center[0] === newLocation.center[0] &&
          dest.center[1] === newLocation.center[1]
      );

      if (isDuplicateDestination) {
        toast.error("Depot location cannot be the same as a destination");
        return;
      }

      setDepotLocation(newLocation);
    } else {
      // Check if new location matches depot or any other destination
      if (
        depotLocation &&
        newLocation.center[0] === depotLocation.center[0] &&
        newLocation.center[1] === depotLocation.center[1]
      ) {
        toast.error("Destination cannot be the same as depot location");
        return;
      }

      const isDuplicateDestination = destinations.some(
        (dest) =>
          dest !== editingLocation &&
          dest.center[0] === newLocation.center[0] &&
          dest.center[1] === newLocation.center[1]
      );

      if (isDuplicateDestination) {
        toast.error("This location is already added as a destination");
        return;
      }

      setDestinations((prev) =>
        prev.map((loc) => (loc === editingLocation ? newLocation : loc))
      );
    }
    setIsEditDialogOpen(false);
  };

  const fetchRouteForVehicle = async (
    vehicleIndex: number,
    hof: number[],
    locations: [number, number][],
    depot: [number, number]
  ) => {
    const segments = [];
    let prev = depot;
    let i = vehicleIndex;
    while (i < hof.length) {
      const start = prev;
      const end = locations[hof[i]];
      const segment = await getDirections([start, end]); // Use getRoute to fetch each segment
      segments.push(...segment);
      prev = end;
      i += numVehicles;
    }
    const lastSegment = await getDirections([prev, depot]); // Fetch route back to the depot
    segments.push(...lastSegment);
    return segments;
  };

  const handleSubmission = async () => {
    // Check if depot location is set
    if (!depotLocation) {
      toast.error("Please set a depot location");
      return;
    }

    // Check if there are any destinations
    if (destinations.length === 0) {
      toast.error("Please add at least one destination");
      return;
    }

    // Check if number of vehicles is set and valid
    if (numVehicles <= 0) {
      toast.error("Please set a valid number of vehicles (greater than 0)");
      return;
    }

    // Check if number of vehicles is not greater than number of destinations
    if (numVehicles > destinations.length) {
      toast.error(
        "Number of vehicles cannot be greater than number of destinations"
      );
      return;
    }

    setIsLoading(true);
    const data = {
      num_locations: destinations.length,
      num_vehicles: numVehicles,
      locations: destinations.map((loc) => loc.center),
      depot: depotLocation.center,
    };

    // Check for duplicate locations
    const allLocations = [depotLocation, ...destinations];
    const uniqueLocations = new Set(
      allLocations.map((loc) => `${loc.center[0]},${loc.center[1]}`)
    );
    if (uniqueLocations.size !== allLocations.length) {
      toast.error(
        "There are duplicate locations. Please ensure all locations are unique."
      );
      return;
    }

    try {
      const response = await getRoutes({ data });
      if (response.status === 200) {
        const hof = response.data.hof;
        const fetchedRoutes = await Promise.all(
          hof.map((_: any, index: number) =>
            fetchRouteForVehicle(index, hof, data.locations, data.depot)
          )
        );
        toast.success("Routes plotted successfully");
        setRoutes(fetchedRoutes);
      } else if (response.status === 401) {
        toast.error("Authentication failed. Please log in again.");
        router.push("/login");
      } else {
        toast.error("An error occurred while generating routes");
      }
    } catch (error) {
      console.error("Error generating routes:", error);
      toast.error("An error occurred while generating routes");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
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
                  <div className="text-sm  flex flex-col gap-1 font-medium">
                    Depot Location
                    <AutocompleteSearchBox onSelect={handleSelectDepot} />
                  </div>
                )}
                {depotLocation && (
                  <div className="text-sm flex flex-col gap-1 font-medium">
                    Add Destination
                    <AutocompleteSearchBox onSelect={handleSelectDestination} />
                  </div>
                )}
                <Button onClick={handleSubmission} className="w-full">
                  {isLoading ? <Spinner size="md" /> : "Generate Routes"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="max-h-[400px] no-scrollbar border overflow-y-auto">
            <CardHeader>
              <CardTitle>Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 no-scrollbar">
                {depotLocation && (
                  <div>
                    <h3 className="font-medium mb-1">Depot Location</h3>
                    <LocationCard
                      location={depotLocation}
                      onDelete={() => setDepotLocation(null)}
                      onEdit={() => handleEditLocation(depotLocation)}
                      isDepot
                    />
                  </div>
                )}
                <div className="space-y-2 no-scrollbar ">
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
                  ...(depotLocation
                    ? [{ ...depotLocation, isDepot: true }]
                    : []),
                  ...destinations.map((dest) => ({ ...dest, isDepot: false })),
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
        <Toaster />
    </div>
  );
};

export default SearchAndMapLayout;
