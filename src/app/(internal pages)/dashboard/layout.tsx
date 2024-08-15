"use client";
import getRoutes from '@/api/getRoutes';
import LocationCard from '@/components/card';
import MyMap from '@/components/map';
import AutocompleteSearchBox from '@/components/searchBar';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SearchAndMapLayout = () => {

    const [selectedLocations, setSelectedLocations] = useState<any[]>([]);
    const [numVehicles, setNumVehicles] = useState<number>(0);
    const [Myroutes, setMyRoutes] = useState<any[]>([]);
    const router = useRouter();

    const handleSelect = (location:any) => {
        console.log('Selected location:', location);
        setSelectedLocations((prevLocations) => {
            const updatedLocations = [...prevLocations, location];
            console.log('Updated locations:', updatedLocations); // This will show the correct updated array
            return updatedLocations;
        });
    };

    const handleDelete = (index:number) => {
        setSelectedLocations((prevLocations) => {
            const updatedLocations = prevLocations.filter((_, i) => i !== index);
            console.log('Updated locations:', updatedLocations); // This will show the correct updated array
            return updatedLocations;
        });
    };

    const handleSubmission = async () => {
      const data = {
        num_locations: selectedLocations.length-1,
        num_vehicles: numVehicles,
        locations: selectedLocations.slice(0, -1).map((location) => location.center),
        depot: selectedLocations[selectedLocations.length - 1].center
      };
      const response = await getRoutes({data});
      if(response.status === 200){
        console.log('HOF:', response.data.hof);
        console.log("SELECTED LOCATIONS",selectedLocations);
        const hof = response.data.hof;
        let routes = [];
        for(let lo=0;lo<numVehicles;lo++){
          let prev = selectedLocations[selectedLocations.length - 1].center;
          let route = [];
          let i = lo;
          while(i < hof.length){
            route.push([prev,selectedLocations[hof[i]].center]);
            prev = selectedLocations[hof[i]].center;
            i += numVehicles;
          }
          route.push([prev,selectedLocations[selectedLocations.length - 1].center]);
          routes.push(route);
        }
        console.log("ROUTES",routes);
        setMyRoutes(routes);
      }else if(response.status === 401){
        router.push('/login');
      }
    };

    const handleNumVehiclesChange = (event:any) => {
        setNumVehicles(parseInt(event.target.value));
    }

  return (
    <div className="grid grid-cols-3 h-screen">
      {/* Search Component (2/3 of the space) */}
      <div className="col-span-1 p-4">
        <div className="border rounded-md p-4">
            {/* Input field for number of vehicles */}
            <div className="mt-2 mb-2">
              <label htmlFor="num-vehicles" className="block text-sm font-medium text-gray-300">
                Number of Transport Vehicles
              </label>
              <input
                id="num-vehicles"
                type="number"
                value={numVehicles}
                onChange={handleNumVehiclesChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              />
            </div>
            <AutocompleteSearchBox onSelect={handleSelect} />
            <button onClick={handleSubmission} className='bg-blue-600 rounded-md self-center p-4'>Submit</button>
            <h2 className='mt-3'>Note: Add Depot Location at the last</h2>
        </div>
        
        <div className="mt-4">
            {selectedLocations.length > 0 && (
              <div className="overflow-y-auto max-h-[calc(100vh-10rem)]">
                {selectedLocations.map((location, index) => (
                  <LocationCard
                    key={index}
                    location={location}
                    onDelete={() => handleDelete(index)}
                  />
                ))}
              </div>
            )}
          </div>
      </div>

      {/* Map Component (1/3 of the space) */}
      <div className="col-span-2 p-4">
        <div className="border rounded-md h-full">
          {/* Map Placeholder */}
          <div className="h-full w-full bg-gray-300 flex items-center justify-center">
            <MyMap selectedLocations={selectedLocations} routes={Myroutes}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndMapLayout;
