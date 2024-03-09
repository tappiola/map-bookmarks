import GeoIcon from "./GeoIcon";
import { Button } from "primereact/button";
import { UserLocation } from "./types";
import { Popup } from "react-map-gl";
import * as React from "react";
import { normalizeName } from "./utils";

const LocationPopup = ({
  userLocation,
  onLocationAdd,
}: {
  userLocation: UserLocation;
  onLocationAdd: () => void;
}) => {
  const { name, placeType, latitude, longitude, ...other } = userLocation;

  const title = Object.values(other)
    .filter((value) => value)
    .join(", ");

  return (
    <Popup
      longitude={userLocation.longitude}
      latitude={userLocation.latitude}
      anchor="bottom"
      key={`${userLocation.latitude}_${userLocation.longitude}`}
    >
      <div>
        <h3> {[name, normalizeName(placeType)].filter((v) => v).join(", ")}</h3>
        <p className="text-gray-900">{title}</p>
        <div className="flex align-items-center gap-2">
          <GeoIcon />
          <p className="text-gray-500 text-xs">
            {userLocation.latitude?.toFixed(4)},{" "}
            {userLocation.longitude?.toFixed(4)}
          </p>
        </div>
        <Button size="small" onClick={onLocationAdd}>
          Add to list
        </Button>
      </div>
    </Popup>
  );
};

export default LocationPopup;
