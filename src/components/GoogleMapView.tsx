/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState, useRef, useCallback } from "react"
import toast, { Toaster } from "react-hot-toast"

declare global {
   interface Window {
      google: any
   }
}

export default function GoogleMapView() {
   const router = useRouter();
   const containerStyle = {
      width: "60%",
      height: "80vh",
   }

   const [center, setCenter] = useState({ lat: 0, lng: 0 })
   const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 })
   const mapRef = useRef<google.maps.Map | null>(null)
   const [isInitialLoad, setIsInitialLoad] = useState(true)
   const [getLocation, setGetLocation] = useState(false)


   const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
         const newPosition = { lat: position.coords.latitude, lng: position.coords.longitude }
         setCenter(newPosition)
         setMarkerPosition(newPosition)
      })
      toast.success("Location fetched successfully");
   }

   const onLoad = useCallback((map: google.maps.Map) => {
      mapRef.current = map
   }, [])

   const onCenterChanged = () => {
      if (mapRef.current && !isInitialLoad) {
         const newCenter = mapRef.current.getCenter()
         if (newCenter) {
            setMarkerPosition({ lat: newCenter.lat(), lng: newCenter.lng() })
         }
      }
   }

   const onDragEnd = () => {
      setIsInitialLoad(false)
   }

   const handleGetLocationClick = () => {
      getUserLocation();
      setGetLocation(true);
   }
   const handleSaveLocationClick = async () => {
      const response = await axios.patch("/api/users/consumer/location", { lat: markerPosition.lat, lng: markerPosition.lng });
      if (response.data.success) {
         toast.success("Location saved successfully");
         router.push("/consumer/profile");
      }
   }

   return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-3">
         <Toaster position="top-right" reverseOrder={false} />
         <div>
            <div className="flex gap-5">
               <button
                  className="bg-neutral-950 text-neutral-400 border border-neutral-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                  onClick={handleGetLocationClick}

               >
                  <span className="bg-neutral-400 shadow-neutral-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                  Get my location
               </button>

               <button
                  className="bg-neutral-950 text-neutral-400 border border-neutral-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                  onClick={handleSaveLocationClick}

               >
                  <span className="bg-neutral-400 shadow-neutral-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                  Save location
               </button>

            </div>
         </div>
         {getLocation &&
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
               <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={15}
                  onLoad={onLoad}
                  onCenterChanged={onCenterChanged}
                  onDragEnd={onDragEnd}
               >
                  <Marker position={markerPosition} />
               </GoogleMap>
            </LoadScript>
         }
      </div>
   )
}

