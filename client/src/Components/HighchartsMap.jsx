import React from "react";
import Globe from "react-globe.gl";

const GlobeComponent = () => {
  // Updated arcs data with more connections
  const arcsData = [
    {
      startLat: 37.7749,
      startLng: -122.4194, // San Francisco
      endLat: 40.7128,
      endLng: -74.006, // New York
      color: ["#ff0000", "#0000ff"],
    },
    {
      startLat: 51.5074,
      startLng: -0.1278, // London
      endLat: 48.8566,
      endLng: 2.3522, // Paris
      color: ["#00ff00", "#ff00ff"],
    },
    {
      startLat: 35.6895,
      startLng: 139.6917, 
      endLat: -33.8688,
      endLng: 151.2093, 
      color: ["#ffaa00", "#aaff00"],
    },
    {
      startLat: -22.9068,
      startLng: -43.1729, 
      endLat: 34.0522,
      endLng: -118.2437,
      color: ["#00ffff", "#ff7700"],
    },
    {
      startLat: 40.7128,
      startLng: -74.006, 
      endLat: 51.5074,
      endLng: -0.1278, 
      color: ["#ffff00", "#00ffff"],
    },
  ];

  return (
    <div style={{ width: "100%", height: "100%", maxWidth: "600px", margin: "0 auto" }}>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        atmosphereColor="rgba(255, 255, 255, 0.7)"
        atmosphereAltitude={0.3}
        arcsData={arcsData}
        arcColor={"color"}
        arcDashLength={0.5}
        arcDashGap={0.2}
        arcDashInitialGap={() => Math.random()}
        arcDashAnimateTime={4000}
        arcStroke={1.5}
        arcsTransitionDuration={1000}
        markersData={arcsData.map((arc) => ({
          lat: arc.startLat,
          lng: arc.startLng,
        }))}
        markerColor={() => "rgba(255, 0, 0, 0.8)"}
        markerRadius={0.2}
        width={600} 
        height={400} 
      />
    </div>
  );
};

export default GlobeComponent;
