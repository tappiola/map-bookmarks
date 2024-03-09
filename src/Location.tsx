import { getCoordinates, normalizeName } from "./utils";
import { Button } from "primereact/button";
import React, { Dispatch, SetStateAction } from "react";
import { useMap } from "react-map-gl";
import { SavedLocation } from "./types";
import GeoIcon from "./GeoIcon";
import { Badge } from "primereact/badge";

const Location = ({
  location,
  setSavedLocations,
}: {
  location: SavedLocation;
  setSavedLocations: Dispatch<SetStateAction<SavedLocation[]>>;
}) => {
  const { map } = useMap();

  const { id, name, placeType, latitude, longitude, ...other } = location;

  const title = Object.values(other)
    .filter((value) => value)
    .join(", ");

  return (
    <div
      className="border-bottom-1 py-3 border-300 cursor-pointer"
      onClick={() =>
        map?.flyTo({
          center: getCoordinates(location),
          zoom: 17,
        })
      }
    >
      <div className="flex align-items-baseline justify-content-between">
        {(name || placeType) && (
          <p className="font-bold">{normalizeName(name || placeType)}</p>
        )}
        {placeType && (
          <Badge className="flex-shrink-0" value={normalizeName(placeType)} />
        )}
      </div>
      <p className="text-sm">{title}</p>
      <div className="flex align-items-center gap-2">
        <GeoIcon />
        <p className="text-gray-500 text-xs">
          {latitude?.toFixed(4)}, {longitude?.toFixed(4)}
        </p>
        <Button
          className="ml-auto font-bold"
          size="small"
          text
          onClick={(e) => {
            e.stopPropagation();
            setSavedLocations((savedLocations) =>
              savedLocations.filter(({ id }) => id !== location.id),
            );
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Location;
