import { useEffect, useRef, useMemo } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function Map({ address }) {
  const mapRef = useRef(null);
  // const geocoder = useMemo(() => new window.google.maps.Geocoder(), []);
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      version: "weekly",
      libraries: ['places'],
    });
    
    loader.load().then(() => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          const map = new window.google.maps.Map(mapRef.current, {
            center: results[0].geometry.location,
            zoom: 8,
          });

          const marker = new window.google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
          });

        } else {
          console.error(
            `Geocode was not successful for the following reason: ${status}`
          );
        }
      });
    });
  }, [address]);
  return <div style={{ height: "400px" }} ref={mapRef} />;
}
export default Map;
