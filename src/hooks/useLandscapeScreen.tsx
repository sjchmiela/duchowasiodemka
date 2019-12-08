import React from "react";
import MediaQuery, { useMediaQuery } from "react-responsive";

const query = { minDeviceWidth: 800 };

export default function useLandscapeScreen() {
  return useMediaQuery(query);
}

export const LandscapeScreenQuery = props => <MediaQuery {...query} {...props} />;
export const PortraitScreenQuery = props => <MediaQuery maxDeviceWidth={query.minDeviceWidth} {...props} />;
