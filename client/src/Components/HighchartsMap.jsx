import React from "react";
import Globe from "react-globe.gl";

const GlobeComponent = () => {
  // Updated arcs data with more connections
  const arcsData = [
    {
      startLat: -5.9873,
      startLng: 144.4957,
      endLat: -46.2927,
      endLng: -175.9176,
      color: ["#b1d80d", "#539cee"],
    },
    {
      startLat: -18.7036,
      startLng: 103.4692,
      endLat: 6.458,
      endLng: 126.3388,
      color: ["#65bfb1", "#0af820"],
    },
    {
      startLat: 62.3969,
      startLng: 172.0277,
      endLat: 26.8784,
      endLng: -129.2189,
      color: ["#152f21", "#e1fabf"],
    },
    {
      startLat: 36.0692,
      startLng: 85.7902,
      endLat: -45.9997,
      endLng: -121.6746,
      color: ["#6506c9", "#f80786"],
    },
    
    {
      startLat: 76.8362,
      startLng: -7.7652,
      endLat: -86.3895,
      endLng: -25.6254,
      color: ["#6ee6ff", "#64e58e"],
    },
    {
      startLat: 42.3651,
      startLng: 118.6006,
      endLat: -34.6374,
      endLng: -47.7213,
      color: ["#da8939", "#edd046"],
    },
    {
      startLat: 12.8064,
      startLng: -156.9217,
      endLat: 52.6591,
      endLng: 78.4441,
      color: ["#ef3fff", "#e8c542"],
    },
    {
      startLat: 66.8006,
      startLng: -27.6384,
      endLat: -30.318,
      endLng: -113.9274,
      color: ["#a44bd8", "#94cc73"],
    },
    {
      startLat: -87.2059,
      startLng: -137.1996,
      endLat: -59.3915,
      endLng: 20.4043,
      color: ["#ad6704", "#a68fdf"],
    },
    {
      startLat: -81.9166,
      startLng: 141.5499,
      endLat: -37.9537,
      endLng: 59.5797,
      color: ["#80efbd", "#d7c3b3"],
    },
    {
      startLat: -5.3389,
      startLng: 55.2017,
      endLat: 58.2221,
      endLng: -132.5145,
      color: ["#81baa8", "#552b70"],
    },
    
  ];
  

  

  return (
    <div style={{ width: "100%", height: "100%", maxWidth: "600px", margin: "0 auto", borderRadius:"10px" }}>
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
