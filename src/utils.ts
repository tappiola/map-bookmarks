import { UserLocation } from "./types";
import { LngLatLike } from "mapbox-gl";

export const getCoordinates = (item: UserLocation) =>
  [item.longitude, item.latitude] as LngLatLike;

export const normalizeName = (name: string = "") => {
  const string = name.replaceAll("_", " ");

  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const transformLocation = (location: { id: string; text: string }[]) =>
  location.reduce<{
    [key: string]: string;
  }>((prev, { id, text }) => ({ ...prev, [id.split(".")[0]]: text }), {});
