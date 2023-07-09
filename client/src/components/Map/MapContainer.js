// import React, { useRef, useEffect, useState } from 'react';
// import maplibregl from 'maplibre-gl';
// import 'maplibre-gl/dist/maplibre-gl.css';
// import './map.css';


// import React, { useRef, useEffect, useState } from 'react';
// import maplibregl from 'maplibre-gl';
// import 'maplibre-gl/dist/maplibre-gl.css';
// import './map.css';

// const MapContainer = ({ address }) =>{
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng] = useState(139.753);
//   const [lat] = useState(35.6844);
//   const [zoom] = useState(14);
//   const [API_KEY] = useState('YOUR_MAPTILER_API_KEY_HERE');

//   useEffect(() => {
//     if (map.current) return; // stops map from intializing more than once

//     map.current = new maplibregl.Map({
//       container: mapContainer.current,
//       style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
//       center: [lng, lat],
//       zoom: zoom
//     });

//   }, [API_KEY, lng, lat, zoom]);

//   return (
//     <div className="map-wrap">
//       <div ref={mapContainer} className="map" />
//     </div>
//   );
// }

// import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';

// const MapContainer = ({ address }) => {
//     console.log(process.env.NEXT_PUBLIC_MAPBOX_API_KEY);
//   const [viewport, setViewport] = useState({
//     width: '100%',
//     height: 400,
//     latitude: 0,
//     longitude: 0,
//     zoom: 14,
//   });

//   useEffect(() => {
//     const geocodeAddress = async () => {
//       try {
//         const response = await fetch(
//           `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//             address
//           )}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`
//         );
//         const data = await response.json();
//         const [longitude, latitude] = data.features[0].center;
//         setViewport((prevViewport) => ({
//           ...prevViewport,
//           latitude,
//           longitude,
//         }));
//       } catch (error) {
//         console.error('Error geocoding address:', error);
//       }
//     };

//     geocodeAddress();
//   }, [address]);

//   return (
//     <ReactMapboxGl
//       {...viewport}
//       mapStyle="mapbox://styles/mapbox/streets-v11" // You can change the map style here
//       mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
//       onViewportChange={(newViewport) => setViewport(newViewport)}
//     >
//       <Marker latitude={viewport.latitude} longitude={viewport.longitude}>
//         <div>
//           <img src="/marker.svg" alt="Marker" /> {/* Replace with your marker icon */}
//           <span>{address}</span> {/* Display the address */}
//         </div>
//       </Marker>
//     </ReactMapboxGl>
//   );
// };

// MapContainer.js
// import ReactMapGL, { Marker } from 'react-map-gl';

// const MapContainer = ({ address }) => {
//   const [viewport, setViewport] = useState({
//     width: '100%',
//     height: 400,
//     latitude: 37.7749,
//     longitude: -122.4194,
//     zoom: 14,
//   });

//   console.log(process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN)

//   return (
//     <ReactMapGL
//       {...viewport}
//       mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
//       onViewportChange={(newViewport) => setViewport(newViewport)}
//     >
//       <Marker
//         latitude={37.7749}
//         longitude={-122.4194}
//         offsetLeft={-20}
//         offsetTop={-10}
//       >
//         <div>Address Marker</div>
//       </Marker>
//     </ReactMapGL>
//   );
// };

// MapContainer.js
// import React from 'react';
// import ReactMapGL, { Marker } from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// const MapContainer = ({ address }) => {
//   const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

//   const [viewport, setViewport] = React.useState({
//     width: '100%',
//     height: 400,
//     latitude: 37.7749,
//     longitude: -122.4194,
//     zoom: 14,
//   });

//   const handleViewportChange = (newViewport) => {
//     setViewport(newViewport);
//   };

//   return (
//     <ReactMapGL
//       {...viewport}
//       mapboxAccessToken={MAPBOX_TOKEN}
//       onViewportChange={handleViewportChange}
//     >
//       <Marker
//         latitude={37.7749}
//         longitude={-122.4194}
//         offsetLeft={-20}
//         offsetTop={-10}
//       >
//         <div>Address Marker</div>
//       </Marker>
//     </ReactMapGL>
//   );
// };


import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const MapContainer = ()=> {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}


export default MapContainer;
