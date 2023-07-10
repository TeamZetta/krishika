import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const MapContainer = ({ address }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(87.855);
  const [lat, setLat] = useState(22.9868);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    // Create a marker for the given address
    // new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);

    // Create a marker for the address
    if (address) {
      axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          address
        )}.json?access_token=${mapboxgl.accessToken}`
      )        
        .then((response) => {
          console.log('r',response.data)
          if (!response.data.features || response.data.features.length === 0) {
            console.log('Error geocoding address:', response.data.message);
            return;
          }

          const [lng, lat] = response.data.features[0].center;

          // new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
          map.current.setCenter([lng, lat]);

          // console.log(map.current.getCenter().lng.toFixed(), map.current.getCenter().lat)
        })
        .catch((error) => {
          console.log('Error geocoding address:', error);
        });
    }
  }, [address]);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div className="title text-center mb-4">
        Explore Nearby Mandis
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default MapContainer;
