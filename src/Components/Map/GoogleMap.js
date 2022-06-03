import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import "./styles.css";
const containerStyle = {
  width: "800px",
  height: "600px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function Map() {
  return (
    <div className="container">
      <LoadScript googleMapsApiKey="">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default React.memo(Map);
