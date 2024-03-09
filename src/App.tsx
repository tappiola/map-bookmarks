import React from "react";
import { SavedLocation } from "./types";
import ClickableMap from "./ClickableMap";
import { useLocalStorage } from "primereact/hooks";
import Location from "./Location";

function App() {
  const [savedLocations, setSavedLocations] = useLocalStorage<SavedLocation[]>(
    [],
    "savedLocations",
  );

  return (
    <main className="h-screen flex flex-grow-1 overflow-y-auto">
      <section className="w-full md:w-30rem overflow-y-auto p-4">
        <h1>Saved locations</h1>
        {!!savedLocations.length || (
          <p className="text-gray-500">Select a location on the map to save</p>
        )}
        {savedLocations.map((location) => (
          <Location
            key={location.id}
            location={location}
            setSavedLocations={setSavedLocations}
          />
        ))}
      </section>
      <ClickableMap
        savedLocations={savedLocations}
        setSavedLocations={setSavedLocations}
      />
    </main>
  );
}

export default App;
