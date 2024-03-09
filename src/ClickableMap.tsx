import * as React from "react";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import Map, { MapRef, Marker, useMap } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import { SavedLocation, UserLocation } from "./types";
import { Toast } from "primereact/toast";
import { v4 as uuidv4 } from "uuid";
import "mapbox-gl/dist/mapbox-gl.css";
import "./ClickableMap.css";
import LocationPopup from "./LocationPopup";
import { transformLocation } from "./utils";

const MAPBOX_GL_TOKEN =
  "pk.eyJ1IjoidGFwcGlvbGEiLCJhIjoiY2t6eHhuM2N6MDYyMTJ2cDcxcDVsem8zNiJ9.OByK2fsCvb8XsvT2OYUEjA";
const MAP_CENTER = { longitude: -0.1278, latitude: 51.5074 };

const ClickableMap = ({
  savedLocations,
  setSavedLocations,
}: {
  savedLocations: SavedLocation[];
  setSavedLocations: Dispatch<SetStateAction<SavedLocation[]>>;
}) => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const toastRef = useRef<Toast>(null);
  const { map: mapRef } = useMap();
  const map = mapRef as MapRef;

  const saveUserLocation = useCallback(
    async (location: UserLocation) => {
      setUserLocation(location);

      const { longitude, latitude } = location;

      // using api to get additional location details based on coordinates
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_GL_TOKEN}`,
      );

      if (response.ok) {
        const { features } = await response.json();
        const updatedLocation = transformLocation(
          features as { id: string; text: string }[],
        );

        setUserLocation((userLocation) => ({
          ...userLocation,
          ...updatedLocation,
          latitude,
          longitude,
        }));
      } else {
        toastRef.current!.show({
          severity: "error",
          summary: "Failed to get user location",
          life: 2000,
        });
      }
    },
    [setUserLocation],
  );

  const onMapClick = (e: mapboxgl.MapLayerMouseEvent) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["poi-label", "transit-label", "landuse", "national-park"],
    });

    const {
      lngLat: { lng: longitude, lat: latitude },
    } = e;

    const getAdditionalFields = (features: mapboxgl.MapboxGeoJSONFeature[]) => {
      if (features && features.length) {
        const [{ properties }] = features;
        const { name, type: placeType } = properties as {
          name: string;
          type: string;
        };

        return { name, placeType };
      } else {
        return {};
      }
    };

    saveUserLocation({
      longitude,
      latitude,
      ...getAdditionalFields(features),
    });
  };

  return (
    <>
      <Map
        id="map"
        mapboxAccessToken={MAPBOX_GL_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        initialViewState={{
          ...MAP_CENTER,
          zoom: 11,
        }}
        onClick={onMapClick}
      >
        {savedLocations.map(({ longitude, latitude, ...other }) => (
          <Marker
            key={other.id}
            longitude={longitude}
            latitude={latitude}
            color="cadetblue"
          />
        ))}
        {userLocation && (
          <LocationPopup
            userLocation={userLocation}
            onLocationAdd={() => {
              setSavedLocations([
                { id: uuidv4(), ...userLocation } as SavedLocation,
                ...savedLocations,
              ]);
              setUserLocation(null);
            }}
          />
        )}
      </Map>
      <Toast ref={toastRef} position="bottom-right" />
    </>
  );
};

export default ClickableMap;
